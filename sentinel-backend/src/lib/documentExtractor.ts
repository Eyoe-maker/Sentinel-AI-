import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { analyzeImage, sendMessageForJSON, isClaudeConfigured } from './claude';
import { processDocument as tesseractProcess } from './ocr';

// Enhanced extracted data structure
export interface EnhancedExtractedData {
  rawText: string;
  // A1 Certificate fields
  workerName?: string;
  workerDateOfBirth?: string;
  workerNationality?: string;
  certificateId?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingInstitution?: string;
  // Company fields
  companyName?: string;
  companyAddress?: string;
  vatNumber?: string;
  country?: string;
  // VAT Registration fields
  registrationNumber?: string;
  registrationDate?: string;
  taxAuthority?: string;
  // Metadata
  documentType?: 'A1_CERTIFICATE' | 'VAT_REGISTRATION' | 'POSTED_WORKER_DECLARATION' | 'INVOICE' | 'CONTRACT' | 'UNKNOWN';
  confidence?: number;
  extractionMethod: 'claude' | 'tesseract';
  warnings?: string[];
}

const DOCUMENT_EXTRACTION_PROMPT = `You are an expert document analyzer specializing in EU compliance documents.
Analyze the provided document and extract structured information.

DOCUMENT TYPES TO RECOGNIZE:
- A1 Certificate: EU social security certificate for posted workers
- VAT Registration: Company VAT registration certificate
- Posted Worker Declaration: Declaration form for posting workers abroad
- Invoice: Commercial invoice
- Contract: Business contract

Extract ALL relevant fields you can identify. For dates, use ISO format (YYYY-MM-DD).
For VAT numbers, preserve the country prefix (e.g., FR12345678901).

Respond with a JSON object containing:
{
  "documentType": "A1_CERTIFICATE" | "VAT_REGISTRATION" | "POSTED_WORKER_DECLARATION" | "INVOICE" | "CONTRACT" | "UNKNOWN",
  "confidence": 0.0-1.0,
  "workerName": "string or null",
  "workerDateOfBirth": "YYYY-MM-DD or null",
  "workerNationality": "string or null",
  "certificateId": "string or null",
  "issueDate": "YYYY-MM-DD or null",
  "expiryDate": "YYYY-MM-DD or null",
  "issuingInstitution": "string or null",
  "companyName": "string or null",
  "companyAddress": "string or null",
  "vatNumber": "string or null",
  "country": "ISO 3166-1 alpha-2 code or null",
  "registrationNumber": "string or null",
  "registrationDate": "YYYY-MM-DD or null",
  "taxAuthority": "string or null",
  "warnings": ["array of any data quality issues noticed"]
}`;

interface ClaudeExtractionResult {
  documentType: 'A1_CERTIFICATE' | 'VAT_REGISTRATION' | 'POSTED_WORKER_DECLARATION' | 'INVOICE' | 'CONTRACT' | 'UNKNOWN';
  confidence: number;
  workerName?: string | null;
  workerDateOfBirth?: string | null;
  workerNationality?: string | null;
  certificateId?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  issuingInstitution?: string | null;
  companyName?: string | null;
  companyAddress?: string | null;
  vatNumber?: string | null;
  country?: string | null;
  registrationNumber?: string | null;
  registrationDate?: string | null;
  taxAuthority?: string | null;
  warnings?: string[];
}

async function extractFromImage(imagePath: string): Promise<EnhancedExtractedData> {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const ext = path.extname(imagePath).toLowerCase();

  const mediaType = ext === '.png' ? 'image/png' :
    ext === '.webp' ? 'image/webp' :
      ext === '.gif' ? 'image/gif' : 'image/jpeg';

  const result = await analyzeImage(
    base64Image,
    mediaType,
    DOCUMENT_EXTRACTION_PROMPT,
    'Please analyze this compliance document and extract all relevant information. Return the data as JSON.'
  );

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to analyze image');
  }

  // Parse JSON from Claude's response
  let jsonStr = result.data.trim();
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7);
  }
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3);
  }
  jsonStr = jsonStr.trim();

  const parsed: ClaudeExtractionResult = JSON.parse(jsonStr);

  return {
    rawText: '[Image analyzed with Claude Vision]',
    extractionMethod: 'claude',
    documentType: parsed.documentType,
    confidence: parsed.confidence,
    workerName: parsed.workerName || undefined,
    workerDateOfBirth: parsed.workerDateOfBirth || undefined,
    workerNationality: parsed.workerNationality || undefined,
    certificateId: parsed.certificateId || undefined,
    issueDate: parsed.issueDate || undefined,
    expiryDate: parsed.expiryDate || undefined,
    issuingInstitution: parsed.issuingInstitution || undefined,
    companyName: parsed.companyName || undefined,
    companyAddress: parsed.companyAddress || undefined,
    vatNumber: parsed.vatNumber || undefined,
    country: parsed.country || undefined,
    registrationNumber: parsed.registrationNumber || undefined,
    registrationDate: parsed.registrationDate || undefined,
    taxAuthority: parsed.taxAuthority || undefined,
    warnings: parsed.warnings,
  };
}

async function extractFromPDF(pdfPath: string): Promise<EnhancedExtractedData> {
  // First extract text from PDF
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(dataBuffer);
  const rawText = pdfData.text;

  // Use Claude to intelligently parse the extracted text
  const result = await sendMessageForJSON<ClaudeExtractionResult>(
    DOCUMENT_EXTRACTION_PROMPT,
    `Here is the text extracted from a PDF compliance document. Please analyze it and extract all relevant information.\n\n---\n${rawText.substring(0, 15000)}\n---`
  );

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to analyze PDF');
  }

  return {
    rawText: rawText.substring(0, 5000),
    extractionMethod: 'claude',
    documentType: result.data.documentType,
    confidence: result.data.confidence,
    workerName: result.data.workerName || undefined,
    workerDateOfBirth: result.data.workerDateOfBirth || undefined,
    workerNationality: result.data.workerNationality || undefined,
    certificateId: result.data.certificateId || undefined,
    issueDate: result.data.issueDate || undefined,
    expiryDate: result.data.expiryDate || undefined,
    issuingInstitution: result.data.issuingInstitution || undefined,
    companyName: result.data.companyName || undefined,
    companyAddress: result.data.companyAddress || undefined,
    vatNumber: result.data.vatNumber || undefined,
    country: result.data.country || undefined,
    registrationNumber: result.data.registrationNumber || undefined,
    registrationDate: result.data.registrationDate || undefined,
    taxAuthority: result.data.taxAuthority || undefined,
    warnings: result.data.warnings,
  };
}

export async function extractWithClaude(
  filePath: string
): Promise<EnhancedExtractedData> {
  const ext = path.extname(filePath).toLowerCase();

  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
    return extractFromImage(filePath);
  } else if (ext === '.pdf') {
    return extractFromPDF(filePath);
  }

  throw new Error(`Unsupported file type: ${ext}`);
}

// Main processing function with fallback
export async function processDocumentEnhanced(
  filePath: string
): Promise<EnhancedExtractedData> {
  // Try Claude first if configured
  if (isClaudeConfigured() && process.env.ENABLE_CLAUDE_OCR !== 'false') {
    try {
      console.log(`Processing with Claude: ${filePath}`);
      return await extractWithClaude(filePath);
    } catch (error) {
      console.error('Claude extraction failed, falling back to Tesseract:', error);
    }
  }

  // Fallback to Tesseract
  console.log(`Processing with Tesseract (fallback): ${filePath}`);
  const tesseractResult = await tesseractProcess(filePath);

  return {
    ...tesseractResult,
    documentType: 'UNKNOWN',
    extractionMethod: 'tesseract',
    warnings: ['Extracted using OCR fallback - manual review recommended'],
  };
}
