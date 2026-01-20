import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db, documents, NewDocument } from '../db';
import { eq, or, isNull, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { getUserId } from '../middleware/auth';
import { processDocument } from '../lib/ocr';

const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = randomUUID();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, and WebP are allowed.'));
    }
  },
});

// GET /api/documents - List all documents
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);

    const allDocuments = await db
      .select()
      .from(documents)
      .where(
        userId
          ? or(eq(documents.userId, userId), isNull(documents.userId))
          : isNull(documents.userId)
      );

    res.json(allDocuments);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// POST /api/documents - Upload new document
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const userId = getUserId(req);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name, category, country, expiryDate } = req.body;

    if (!name || !category || !country) {
      // Clean up uploaded file
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: 'Missing required fields: name, category, country' });
    }

    const newDocument: NewDocument = {
      id: randomUUID(),
      userId: userId || null,
      name,
      category,
      country,
      uploadDate: new Date(),
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      status: 'pending',
      storageUrl: `/uploads/${file.filename}`,
      extractedData: null,
      createdAt: new Date(),
    };

    await db.insert(documents).values(newDocument);

    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// PATCH /api/documents/:id - Update document status
router.patch('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { status, extractedData } = req.body;

    const updateData: Partial<NewDocument> = {};
    if (status) updateData.status = status;
    if (extractedData) updateData.extractedData = JSON.stringify(extractedData);

    if (userId) {
      await db
        .update(documents)
        .set(updateData)
        .where(and(eq(documents.id, id), eq(documents.userId, userId)));
    } else {
      await db
        .update(documents)
        .set(updateData)
        .where(and(eq(documents.id, id), isNull(documents.userId)));
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// POST /api/documents/:id/ocr - Extract text from document using OCR
router.post('/:id/ocr', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    // Get document
    const [doc] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id));

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    if (!doc.storageUrl) {
      return res.status(400).json({ error: 'Document has no associated file' });
    }

    // Process the document with OCR
    const filePath = path.join(process.cwd(), doc.storageUrl);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    console.log(`Starting OCR for document ${id}`);
    const extractedData = await processDocument(filePath);

    // Update document with extracted data
    await db
      .update(documents)
      .set({
        extractedData: JSON.stringify(extractedData),
        status: 'verified',
      })
      .where(eq(documents.id, id));

    console.log(`OCR completed for document ${id}`);
    res.json({
      success: true,
      extractedData,
    });
  } catch (error) {
    console.error('Error processing OCR:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

// DELETE /api/documents/:id - Delete document
router.delete('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    // Get document first to delete file
    const [doc] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id));

    if (doc && doc.storageUrl) {
      const filePath = path.join(process.cwd(), doc.storageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    if (userId) {
      await db.delete(documents).where(
        and(eq(documents.id, id), eq(documents.userId, userId))
      );
    } else {
      await db.delete(documents).where(
        and(eq(documents.id, id), isNull(documents.userId))
      );
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
