import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ThresholdAlertData {
  recipientEmail: string;
  recipientName: string;
  thresholdType: 'OSS' | 'SME';
  currentAmount: number;
  thresholdAmount: number;
  percentage: number;
  status: 'warning' | 'exceeded';
}

export async function sendThresholdAlert(data: ThresholdAlertData): Promise<boolean> {
  if (!resend) {
    console.log('Email: Resend not configured, skipping email');
    console.log('Would send:', data);
    return false;
  }

  const statusEmoji = data.status === 'warning' ? '⚠️' : '🚨';
  const statusText = data.status === 'warning' ? 'Warning' : 'Threshold Exceeded';
  const thresholdName = data.thresholdType === 'OSS'
    ? 'OSS Registration Threshold (€10,000)'
    : 'SME VAT Exemption Cap (€100,000)';

  const subject = `${statusEmoji} Sentinel Alert: ${data.thresholdType} ${statusText}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #635BFF 0%, #5046e5 100%); padding: 30px; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 12px 12px; }
    .alert-box { background: ${data.status === 'warning' ? '#FFF8E6' : '#FCE8EB'}; border-left: 4px solid ${data.status === 'warning' ? '#FFB020' : '#ED5F74'}; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .metric { display: inline-block; background: white; padding: 15px 20px; margin: 10px 5px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .metric-value { font-size: 28px; font-weight: bold; color: #635BFF; }
    .metric-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; margin: 20px 0; overflow: hidden; }
    .progress-fill { height: 100%; background: ${data.status === 'warning' ? '#FFB020' : '#ED5F74'}; border-radius: 4px; }
    .cta { display: inline-block; background: #635BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ Sentinel Compliance Alert</h1>
    </div>
    <div class="content">
      <p>Hello ${data.recipientName},</p>

      <div class="alert-box">
        <strong>${statusEmoji} ${statusText}: ${thresholdName}</strong>
        <p style="margin: 10px 0 0 0;">
          ${data.status === 'warning'
            ? `You have reached ${data.percentage.toFixed(1)}% of your ${data.thresholdType} threshold. Please review your compliance status.`
            : `You have exceeded your ${data.thresholdType} threshold. Immediate action may be required.`
          }
        </p>
      </div>

      <div style="text-align: center;">
        <div class="metric">
          <div class="metric-value">€${data.currentAmount.toLocaleString()}</div>
          <div class="metric-label">Current Amount</div>
        </div>
        <div class="metric">
          <div class="metric-value">€${data.thresholdAmount.toLocaleString()}</div>
          <div class="metric-label">Threshold</div>
        </div>
        <div class="metric">
          <div class="metric-value">${data.percentage.toFixed(1)}%</div>
          <div class="metric-label">Utilized</div>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width: ${Math.min(data.percentage, 100)}%"></div>
      </div>

      <h3>What this means:</h3>
      ${data.thresholdType === 'OSS' ? `
        <ul>
          <li>Your cross-border B2C sales to EU consumers are approaching the €10,000 OSS registration threshold</li>
          <li>Once exceeded, you'll need to register for the One-Stop Shop (OSS) scheme</li>
          <li>You may need to charge VAT at destination country rates</li>
        </ul>
      ` : `
        <ul>
          <li>Your total EU-wide turnover is approaching the €100,000 SME VAT exemption cap</li>
          <li>Once exceeded, you may lose SME VAT exemption status in certain EU countries</li>
          <li>You may need to register for VAT in additional member states</li>
        </ul>
      `}

      <div style="text-align: center;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/dashboard" class="cta">
          View Dashboard
        </a>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated alert from Sentinel Compliance Engine.</p>
      <p>© ${new Date().getFullYear()} Sentinel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sentinel <alerts@sentinel.app>',
      to: data.recipientEmail,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Email send error:', error);
      return false;
    }

    console.log('Email sent successfully:', emailData?.id);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  if (!resend) {
    console.log('Email: Resend not configured, skipping welcome email');
    return false;
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sentinel <welcome@sentinel.app>',
      to: email,
      subject: 'Welcome to Sentinel - EU Compliance Made Simple',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #635BFF 0%, #5046e5 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; }
    .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 12px 12px; }
    .cta { display: inline-block; background: #635BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ Welcome to Sentinel</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>Thank you for joining Sentinel! We're excited to help you navigate EU cross-border compliance with ease.</p>
      <p>With Sentinel, you can:</p>
      <ul>
        <li>Monitor VAT thresholds in real-time</li>
        <li>Upload and manage compliance documents</li>
        <li>Get automated alerts before hitting regulatory limits</li>
        <li>Generate compliance reports</li>
      </ul>
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/dashboard" class="cta">
          Go to Dashboard
        </a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Welcome email error:', error);
    return false;
  }
}
