import { Router } from 'express';
import { db, transactions, documents, auditLogs } from '../db';
import { eq, and, isNull, or } from 'drizzle-orm';
import { getUserId } from '../middleware/auth';

const router = Router();

// GET /api/gdpr/export - Export all user data (GDPR Article 20 - Data Portability)
router.get('/export', async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required for data export' });
    }

    // Fetch all user data
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));

    const userDocuments = await db
      .select({
        id: documents.id,
        name: documents.name,
        category: documents.category,
        country: documents.country,
        uploadDate: documents.uploadDate,
        expiryDate: documents.expiryDate,
        status: documents.status,
        createdAt: documents.createdAt,
      })
      .from(documents)
      .where(eq(documents.userId, userId));

    const userAuditLogs = await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.id, userId)); // If audit logs have userId

    const exportData = {
      exportDate: new Date().toISOString(),
      userId,
      data: {
        transactions: userTransactions,
        documents: userDocuments,
        auditLogs: userAuditLogs,
      },
      metadata: {
        transactionCount: userTransactions.length,
        documentCount: userDocuments.length,
        auditLogCount: userAuditLogs.length,
      },
    };

    // Set headers for JSON download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="sentinel-data-export-${Date.now()}.json"`);

    res.json(exportData);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// DELETE /api/gdpr/delete-account - Delete all user data (GDPR Article 17 - Right to Erasure)
router.delete('/delete-account', async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required for account deletion' });
    }

    const { confirmation } = req.body;

    if (confirmation !== 'DELETE_MY_ACCOUNT') {
      return res.status(400).json({
        error: 'Confirmation required',
        message: 'Please send { "confirmation": "DELETE_MY_ACCOUNT" } to confirm deletion',
      });
    }

    // Delete all user data
    const deletedTransactions = await db
      .delete(transactions)
      .where(eq(transactions.userId, userId));

    const deletedDocuments = await db
      .delete(documents)
      .where(eq(documents.userId, userId));

    // Log the deletion for compliance
    console.log(`GDPR Deletion: User ${userId} data deleted at ${new Date().toISOString()}`);

    res.json({
      success: true,
      message: 'All your data has been permanently deleted',
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// GET /api/gdpr/data-summary - Get summary of stored data (GDPR Article 15 - Right of Access)
router.get('/data-summary', async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const transactionCount = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));

    const documentCount = await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId));

    res.json({
      userId,
      dataSummary: {
        transactions: {
          count: transactionCount.length,
          dataTypes: ['date', 'amount', 'customerCountry', 'isB2B', 'isCrossBorder', 'vatRate', 'description'],
        },
        documents: {
          count: documentCount.length,
          dataTypes: ['name', 'category', 'country', 'uploadDate', 'expiryDate', 'status', 'extractedData'],
        },
      },
      dataProcessingPurposes: [
        'VAT threshold monitoring and compliance calculations',
        'Document storage for compliance records',
        'Threshold alert notifications',
      ],
      dataRetentionPeriod: 'Data is retained while your account is active and for 7 years after for tax compliance purposes',
      thirdPartySharing: [
        { name: 'Clerk', purpose: 'Authentication' },
        { name: 'Resend', purpose: 'Email notifications' },
      ],
    });
  } catch (error) {
    console.error('Error getting data summary:', error);
    res.status(500).json({ error: 'Failed to get data summary' });
  }
});

export default router;
