import { Router } from 'express';
import { db, transactions } from '../db';
import { eq, or, isNull } from 'drizzle-orm';
import { calculateVATStatus, EU_VAT_THRESHOLDS } from '../lib/vatEngine';
import { sendThresholdAlert } from '../lib/email';
import { getUserId } from '../middleware/auth';

const router = Router();

// POST /api/notifications/check-thresholds - Check and send threshold alerts
router.post('/check-thresholds', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Get user's transactions
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        userId
          ? or(eq(transactions.userId, userId), isNull(transactions.userId))
          : isNull(transactions.userId)
      );

    // Calculate VAT status
    const vatStatus = calculateVATStatus(userTransactions);

    const alerts: string[] = [];

    // Check OSS threshold
    if (vatStatus.ossStatus === 'warning' || vatStatus.ossStatus === 'exceeded') {
      const sent = await sendThresholdAlert({
        recipientEmail: email,
        recipientName: name,
        thresholdType: 'OSS',
        currentAmount: vatStatus.totalCrossBorderB2C,
        thresholdAmount: EU_VAT_THRESHOLDS.OSS_TRIGGER,
        percentage: vatStatus.ossThresholdPercentage,
        status: vatStatus.ossStatus === 'warning' ? 'warning' : 'exceeded',
      });

      if (sent) {
        alerts.push(`OSS ${vatStatus.ossStatus} alert sent`);
      } else {
        alerts.push(`OSS ${vatStatus.ossStatus} alert (email not configured)`);
      }
    }

    // Check SME threshold
    if (vatStatus.smeStatus === 'warning' || vatStatus.smeStatus === 'exceeded') {
      const sent = await sendThresholdAlert({
        recipientEmail: email,
        recipientName: name,
        thresholdType: 'SME',
        currentAmount: vatStatus.totalEUTurnover,
        thresholdAmount: EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP,
        percentage: vatStatus.smeThresholdPercentage,
        status: vatStatus.smeStatus === 'warning' ? 'warning' : 'exceeded',
      });

      if (sent) {
        alerts.push(`SME ${vatStatus.smeStatus} alert sent`);
      } else {
        alerts.push(`SME ${vatStatus.smeStatus} alert (email not configured)`);
      }
    }

    res.json({
      vatStatus,
      alerts: alerts.length > 0 ? alerts : ['All thresholds within safe limits'],
    });
  } catch (error) {
    console.error('Error checking thresholds:', error);
    res.status(500).json({ error: 'Failed to check thresholds' });
  }
});

// POST /api/notifications/test - Send a test email
router.post('/test', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const sent = await sendThresholdAlert({
      recipientEmail: email,
      recipientName: name,
      thresholdType: 'OSS',
      currentAmount: 7500,
      thresholdAmount: 10000,
      percentage: 75,
      status: 'warning',
    });

    res.json({
      success: sent,
      message: sent ? 'Test email sent successfully' : 'Email not configured (check RESEND_API_KEY)',
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

export default router;
