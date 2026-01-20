import { Router } from 'express';
import { db, transactions } from '../db';
import { eq, or, isNull } from 'drizzle-orm';
import { calculateVATStatus } from '../lib/vatEngine';
import { getUserId } from '../middleware/auth';

const router = Router();

// GET /api/vat/status - Calculate current VAT status
router.get('/status', async (req, res) => {
  try {
    const userId = getUserId(req);

    // Fetch transactions for current user (or demo data if not authenticated)
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        userId
          ? or(eq(transactions.userId, userId), isNull(transactions.userId))
          : isNull(transactions.userId)
      );

    // Calculate VAT status using deterministic engine
    const vatStatus = calculateVATStatus(userTransactions);

    res.json(vatStatus);
  } catch (error) {
    console.error('Error calculating VAT status:', error);
    res.status(500).json({ error: 'Failed to calculate VAT status' });
  }
});

export default router;
