import Tesseract from 'tesseract.js';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';

interface ExtractedData {
  rawText: string;
  workerName?: string;
  certificateId?: string;
  issueDate?: string;
  expiryDate?: string;
  vatNumber?: string;
  companyName?: string;
  country?: string;
}

// Pattern matchers for different document types
const PATTERNS = {
  // A1 Certificate patterns
  workerName: [
    /(?:Name|Worker|Employee|Person)[\s:]*([A-Z][a-zA-ZÀ-ÿ\s\-']+)/i,
    /(?:Mr\.|Ms\.|Mrs\.)\s*([A-Z][a-zA-ZÀ-ÿ\s\-']+)/i,
  ],
  certificateId: [
    /(?:Certificate|Cert|ID|Number|No|Ref)[\s.:]*([A-Z0-9\-\/]+)/i,
    /A1[\s\-]?([A-Z]{2}[\s\-]?\d{4}[\s\-]?\d+)/i,
  ],
  vatNumber: [
    /(?:VAT|TVA|MwSt|BTW|IVA)[\s.:]*([A-Z]{2}\s?\d{8,12})/i,
    /(?:Registration|Reg)[\s.:]*([A-Z]{2}\s?\d{8,12})/i,
  ],
  companyName: [
    /(?:Company|Employer|Business|Organization)[\s:]*([A-Za-z0-9À-ÿ\s\-&.,]+(?:Ltd|GmbH|SAS|SARL|BV|NV|AG|SA)?)/i,
  ],
  dates: [
    /(\d{1,2}[\/.]\d{1,2}[\/.]\d{2,4})/g,
    /(\d{4}[\-\/]\d{2}[\-\/]\d{2})/g,
  ],
  country: [
    /(?:Country|État|Land|Pays)[\s:]*([A-Za-zÀ-ÿ\s]+)/i,
  ],
};

function extractField(text: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return undefined;
}

function extractDates(text: string): string[] {
  const dates: string[] = [];
  for (const pattern of PATTERNS.dates) {
    const matches = text.match(pattern);
    if (matches) {
      dates.push(...matches);
    }
  }
  return [...new Set(dates)]; // Remove duplicates
}

function parseExtractedText(text: string): ExtractedData {
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const dates = extractDates(cleanedText);

  return {
    rawText: cleanedText.substring(0, 5000), // Limit raw text length
    workerName: extractField(cleanedText, PATTERNS.workerName),
    certificateId: extractField(cleanedText, PATTERNS.certificateId),
    vatNumber: extractField(cleanedText, PATTERNS.vatNumber),
    companyName: extractField(cleanedText, PATTERNS.companyName),
    country: extractField(cleanedText, PATTERNS.country),
    issueDate: dates[0],
    expiryDate: dates[1],
  };
}

export async function extractTextFromImage(imagePath: string): Promise<ExtractedData> {
  console.log(`OCR: Processing image ${imagePath}`);

  try {
    const result = await Tesseract.recognize(imagePath, 'eng+fra+deu', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`OCR progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const text = result.data.text;
    console.log(`OCR: Extracted ${text.length} characters`);

    return parseExtractedText(text);
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to extract text from image');
  }
}

export async function extractTextFromPDF(pdfPath: string): Promise<ExtractedData> {
  console.log(`OCR: Processing PDF ${pdfPath}`);

  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    console.log(`OCR: Extracted ${data.text.length} characters from ${data.numpages} pages`);

    return parseExtractedText(data.text);
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function processDocument(filePath: string): Promise<ExtractedData> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    return extractTextFromPDF(filePath);
  } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return extractTextFromImage(filePath);
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }
}
