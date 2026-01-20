/**
 * API Client for Sentinel Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  customerCountry: string;
  isB2B: boolean;
  isCrossBorder: boolean;
  vatRate: number;
  description?: string;
  createdAt: Date;
}

export interface VATStatus {
  totalCrossBorderB2C: number;
  totalEUTurnover: number;
  ossThresholdPercentage: number;
  smeThresholdPercentage: number;
  ossStatus: 'safe' | 'warning' | 'exceeded';
  smeStatus: 'safe' | 'warning' | 'exceeded';
  ossRemainingCapacity: number;
  smeRemainingCapacity: number;
  requiresOSSRegistration: boolean;
  requiresSMEReview: boolean;
}

// Fetch all transactions
export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  const data = await response.json();
  return data.map((t: any) => ({
    ...t,
    date: new Date(t.date),
    createdAt: new Date(t.createdAt),
  }));
}

// Create new transaction
export async function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error('Failed to create transaction');
  }

  const data = await response.json();
  return {
    ...data,
    date: new Date(data.date),
    createdAt: new Date(data.createdAt),
  };
}

// Delete transaction
export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }
}

// Get VAT status
export async function fetchVATStatus(): Promise<VATStatus> {
  const response = await fetch(`${API_BASE_URL}/vat/status`);
  if (!response.ok) {
    throw new Error('Failed to fetch VAT status');
  }
  return response.json();
}

// Document types
export interface Document {
  id: string;
  userId?: string;
  name: string;
  category: string;
  country: string;
  uploadDate: Date;
  expiryDate?: Date | null;
  status: 'pending' | 'verified' | 'expired';
  storageUrl?: string;
  extractedData?: string | null;
  createdAt: Date;
}

// Fetch all documents
export async function fetchDocuments(): Promise<Document[]> {
  const response = await fetch(`${API_BASE_URL}/documents`);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  const data = await response.json();
  return data.map((d: any) => ({
    ...d,
    uploadDate: new Date(d.uploadDate),
    expiryDate: d.expiryDate ? new Date(d.expiryDate) : null,
    createdAt: new Date(d.createdAt),
  }));
}

// Upload document
export async function uploadDocument(
  file: File,
  metadata: { name: string; category: string; country: string; expiryDate?: string }
): Promise<Document> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', metadata.name);
  formData.append('category', metadata.category);
  formData.append('country', metadata.country);
  if (metadata.expiryDate) {
    formData.append('expiryDate', metadata.expiryDate);
  }

  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  const data = await response.json();
  return {
    ...data,
    uploadDate: new Date(data.uploadDate),
    expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
    createdAt: new Date(data.createdAt),
  };
}

// Update document
export async function updateDocument(
  id: string,
  updates: { status?: string; extractedData?: any }
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update document');
  }
}

// Delete document
export async function deleteDocument(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
}

// OCR extracted data type
export interface ExtractedData {
  rawText: string;
  workerName?: string;
  certificateId?: string;
  issueDate?: string;
  expiryDate?: string;
  vatNumber?: string;
  companyName?: string;
  country?: string;
}

// Process document with OCR
export async function processDocumentOCR(id: string): Promise<ExtractedData> {
  const response = await fetch(`${API_BASE_URL}/documents/${id}/ocr`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to process document');
  }

  const data = await response.json();
  return data.extractedData;
}
