# Sentinel AI - EU VAT Compliance Engine

Sentinel is an intelligent VAT compliance platform designed for EU e-commerce businesses. It automatically tracks cross-border sales, monitors regulatory thresholds, and provides AI-powered compliance guidance.

## The Problem

EU e-commerce sellers face complex VAT obligations:
- **OSS Threshold (€10,000)**: Once exceeded, you must register for One-Stop-Shop and collect VAT in each customer's country
- **SME Exemption (€100,000)**: Larger sellers lose small business exemptions
- **Documentation Requirements**: Every cross-border B2C sale needs proper records
- **Penalties**: Non-compliance can result in fines up to 20% of unpaid VAT

Most small sellers discover these obligations too late, often during a tax audit.

## The Solution

Sentinel monitors your sales in real-time and alerts you before you hit critical thresholds:

### Core Features

**Threshold Monitoring**
- Visual dashboard showing progress toward €10k OSS and €100k SME limits
- Automatic alerts at 70%, 85%, and 95% of thresholds
- Country-by-country breakdown of B2C sales

**Transaction Management**
- Add, edit, and delete sales transactions
- Automatic B2B vs B2C classification
- Cross-border transaction detection
- Bulk import support

**Document Storage**
- Upload invoices, receipts, and compliance documents
- OCR extraction automatically reads document data
- Organized by transaction and country

**AI Compliance Advisor**
- Ask questions about EU VAT rules in plain language
- Get personalized guidance based on your sales data
- Powered by Claude AI

**Email Notifications**
- Threshold warning emails
- Weekly compliance summaries
- Registration deadline reminders

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Clerk for authentication

**Backend**
- Node.js + Express
- SQLite with Drizzle ORM
- Tesseract.js for OCR
- Resend for emails

**AI**
- Anthropic Claude API for compliance advice

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Eyoe-maker/Sentinel-AI-.git
cd Sentinel-AI-
```

### 2. Set up the backend
```bash
cd sentinel-backend
npm install

# Create environment file
cp ../.env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

### 3. Set up the frontend
```bash
cd sentinel-frontend
npm install

# Create environment file with your Clerk publishable key
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key" > .env

# Start development server
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

## Environment Variables

### Backend (.env)
```
CLERK_SECRET_KEY=sk_test_...      # From Clerk Dashboard
RESEND_API_KEY=re_...             # From Resend Dashboard
EMAIL_FROM=alerts@yourdomain.com  # Verified sender email
ANTHROPIC_API_KEY=sk-ant-...      # For AI advisor (optional)
```

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...  # From Clerk Dashboard
VITE_API_URL=http://localhost:3001      # Backend URL
```

## Project Structure

```
├── sentinel-backend/
│   ├── src/
│   │   ├── db/           # Database schema and connection
│   │   ├── lib/          # Core logic (VAT engine, OCR, email)
│   │   ├── middleware/   # Auth middleware
│   │   ├── routes/       # API endpoints
│   │   └── index.ts      # Server entry point
│   └── uploads/          # Document storage
│
├── sentinel-frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utilities and API client
│   │   └── pages/        # Route pages
│   └── public/           # Static assets
│
├── docker-compose.yml    # Production deployment
└── DEPLOYMENT.md         # Deployment guide
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List all transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/vat/status` | Get current VAT status |
| POST | `/api/documents/upload` | Upload document |
| GET | `/api/gdpr/export` | Export user data (GDPR) |
| DELETE | `/api/gdpr/delete-account` | Delete account (GDPR) |

## VAT Calculation Logic

The VAT engine uses deterministic rules based on EU regulations:

```typescript
// OSS Threshold: €10,000 total B2C cross-border sales
if (totalB2CCrossBorder > 10000) {
  status = 'exceeded';
  // Must register for OSS
}

// Warning levels
if (percentage >= 70) status = 'warning';
if (percentage >= 85) status = 'critical';
```

See [sentinel-backend/src/lib/vatEngine.ts](sentinel-backend/src/lib/vatEngine.ts) for full implementation.

## Deployment

### Docker (Recommended)
```bash
docker-compose up -d --build
```

### Manual
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to:
- Railway
- Vercel + Railway
- AWS/GCP/Azure

## GDPR Compliance

Sentinel includes built-in GDPR features:
- **Data Export**: Download all your data as JSON
- **Account Deletion**: Permanently delete all data
- **Privacy Policy**: Clear explanation of data usage

## Disclaimer

Sentinel is a monitoring and guidance tool. It is **not a substitute for professional tax advice**. Always consult with a qualified tax professional for compliance decisions.

## License

ISC License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with Claude AI assistance.
