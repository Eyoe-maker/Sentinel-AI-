import { Router } from 'express';
import { db, transactions, NewTransaction } from '../db';
import { eq, or, isNull, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { getUserId } from '../middleware/auth';

const router = Router();

// GET /api/transactions - List transactions for current user
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);

    // If authenticated, show user's transactions + demo data (null userId)
    // If not authenticated, show only demo data
    const allTransactions = await db
      .select()
      .from(transactions)
      .where(
        userId
          ? or(eq(transactions.userId, userId), isNull(transactions.userId))
          : isNull(transactions.userId)
      );

    res.json(allTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST /api/transactions - Create new transaction
router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { date, amount, customerCountry, isB2B, isCrossBorder, vatRate, description } = req.body;

    // Validation
    if (!date || !amount || !customerCountry || isB2B === undefined || isCrossBorder === undefined || !vatRate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTransaction: NewTransaction = {
      id: randomUUID(),
      userId: userId || null,
      date: new Date(date),
      amount: parseFloat(amount),
      customerCountry,
      isB2B: Boolean(isB2B),
      isCrossBorder: Boolean(isCrossBorder),
      vatRate: parseFloat(vatRate),
      description: description || null,
      createdAt: new Date(),
    };

    await db.insert(transactions).values(newTransaction);

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    // Only allow deleting own transactions (not demo data)
    if (userId) {
      await db.delete(transactions).where(
        and(eq(transactions.id, id), eq(transactions.userId, userId))
      );
    } else {
      // If not authenticated, only allow deleting demo data
      await db.delete(transactions).where(
        and(eq(transactions.id, id), isNull(transactions.userId))
      );
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

export default router;
