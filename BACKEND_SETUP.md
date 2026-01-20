# 🔧 Sentinel Backend Setup Guide

This guide will help you create the Express.js backend for Sentinel when you're ready to move beyond the frontend prototype.

## 📋 Prerequisites

- Node.js v20+
- PostgreSQL (or start with SQLite)
- Playwright browser dependencies

## 🚀 Quick Setup

### 1. Create Backend Directory

```bash
cd "c:\Users\Mon PC\OpinionFlow"
mkdir sentinel-backend
cd sentinel-backend
```

### 2. Initialize Node.js Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
# Core dependencies
npm install express cors dotenv

# Database (start with SQLite, migrate to PostgreSQL later)
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3

# Playwright for browser automation
npm install playwright-extra puppeteer-extra-plugin-stealth

# TypeScript
npm install -D typescript @types/node @types/express tsx

# Development
npm install -D nodemon
```

### 4. Create TypeScript Config

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 5. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "drizzle-kit generate:sqlite",
    "db:push": "drizzle-kit push:sqlite"
  }
}
```

## 📁 Directory Structure

```
sentinel-backend/
├── src/
│   ├── index.ts                 # Express server entry
│   ├── db/
│   │   ├── schema.ts            # Drizzle schema
│   │   ├── client.ts            # Database connection
│   │   └── migrations/          # SQL migrations
│   ├── routes/
│   │   ├── transactions.ts      # Transaction CRUD
│   │   ├── documents.ts         # Document upload/OCR
│   │   └── automation.ts        # Playwright automation
│   ├── workers/
│   │   └── browser.ts           # Playwright stealth worker
│   ├── lib/
│   │   ├── ocr.ts              # Tesseract.js OCR
│   │   ├── storage.ts          # Replit Object Storage
│   │   └── mcp.ts              # MCP server stubs
│   └── types/
│       └── index.ts            # TypeScript types
├── .env                         # Environment variables
├── package.json
└── tsconfig.json
```

## 📝 Example Code Templates

### 1. `src/index.ts` - Express Server

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionsRouter from './routes/transactions';
import documentsRouter from './routes/documents';
import automationRouter from './routes/automation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/api/transactions', transactionsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/automate', automationRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🛡️  Sentinel Backend running on http://localhost:${PORT}`);
});
```

### 2. `src/db/schema.ts` - Drizzle Schema

```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  amount: real('amount').notNull(),
  customerCountry: text('customer_country').notNull(),
  isB2B: integer('is_b2b', { mode: 'boolean' }).notNull(),
  isCrossBorder: integer('is_cross_border', { mode: 'boolean' }).notNull(),
  vatRate: real('vat_rate').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'A1 Certificate' | 'Posted Worker Declaration' | etc.
  country: text('country').notNull(),
  uploadDate: integer('upload_date', { mode: 'timestamp' }).notNull(),
  expiryDate: integer('expiry_date', { mode: 'timestamp' }),
  status: text('status').notNull(), // 'verified' | 'pending' | 'expired'
  storageUrl: text('storage_url').notNull(), // Replit Object Storage URL
  extractedData: text('extracted_data'), // JSON string
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  portal: text('portal').notNull(),
  action: text('action').notNull(),
  status: text('status').notNull(), // 'success' | 'pending' | 'failed'
  screenshots: text('screenshots'), // JSON array of screenshot URLs
  duration: integer('duration').notNull(), // in milliseconds
  metadata: text('metadata'), // JSON string
});
```

### 3. `src/db/client.ts` - Database Connection

```typescript
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('sentinel.db');
export const db = drizzle(sqlite, { schema });
```

### 4. `src/routes/transactions.ts` - Transaction API

```typescript
import { Router } from 'express';
import { db } from '../db/client';
import { transactions } from '../db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const allTransactions = await db.select().from(transactions);
    res.json(allTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST create transaction
router.post('/', async (req, res) => {
  try {
    const newTransaction = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date(),
    };

    await db.insert(transactions).values(newTransaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    await db.delete(transactions).where(eq(transactions.id, req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

export default router;
```

### 5. `src/workers/browser.ts` - Playwright Automation

```typescript
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Add stealth plugin to avoid bot detection
chromium.use(StealthPlugin());

export interface AutomationResult {
  success: boolean;
  screenshots: string[];
  duration: number;
  error?: string;
}

export async function automateSIPSI(data: {
  workerName: string;
  certificateId: string;
  country: string;
}): Promise<AutomationResult> {
  const startTime = Date.now();
  const screenshots: string[] = [];

  try {
    const browser = await chromium.launch({
      headless: false, // Set to true in production
    });

    const context = await browser.newContext({
      // Use residential proxy to avoid detection
      // proxy: { server: process.env.PROXY_URL },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    });

    const page = await context.newPage();

    // Step 1: Navigate to SIPSI portal
    await page.goto('https://www.sipsi.travail.gouv.fr/');
    screenshots.push(await page.screenshot({ path: 'step1-navigation.png' }));

    // Step 2: Fill in form fields
    // NOTE: This is a STUB - actual implementation requires portal analysis
    // await page.fill('#workerName', data.workerName);
    // await page.fill('#certificateId', data.certificateId);

    // Step 3: Create draft (DO NOT SUBMIT)
    // await page.click('#saveDraft');
    screenshots.push(await page.screenshot({ path: 'step2-draft.png' }));

    await browser.close();

    return {
      success: true,
      screenshots,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      screenshots,
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### 6. `.env` - Environment Variables

```env
# Server
PORT=3001
FRONTEND_URL=http://localhost:5173

# Database (when migrating to PostgreSQL)
# DATABASE_URL=postgresql://user:password@localhost:5432/sentinel

# Replit Object Storage
REPLIT_STORAGE_URL=https://storage.replit.com
REPLIT_STORAGE_KEY=your-storage-key

# MCP Integrations
DATEV_API_KEY=your-datev-key
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret

# Playwright
PROXY_URL=http://your-residential-proxy.com:8080

# OCR
TESSERACT_LANG=eng+fra+deu
```

## 🔗 Connecting Frontend to Backend

Update `sentinel-frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function fetchTransactions() {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  return response.json();
}

export async function createTransaction(data: any) {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}
```

## 🚢 Deployment to Replit

### 1. Prepare for Replit

Create `replit.toml`:

```toml
run = "npm run dev"
entrypoint = "src/index.ts"

[env]
NODE_ENV = "production"

[nix]
channel = "stable-23_05"

[deployment]
run = ["npm", "start"]
deploymentTarget = "cloudrun"
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Sentinel backend"
git remote add origin https://github.com/yourusername/sentinel-backend.git
git push -u origin main
```

### 3. Import to Replit

1. Go to [Replit](https://replit.com)
2. Click "Import from GitHub"
3. Select your repository
4. Replit will auto-configure deployment

### 4. Set Secrets in Replit

- Navigate to "Tools" > "Secrets"
- Add all `.env` variables
- Replit injects these as environment variables

## 📊 Migration to PostgreSQL

When ready to scale beyond SQLite:

```bash
# Install PostgreSQL driver
npm install pg
npm install -D @types/pg

# Update schema imports
# Replace: drizzle-orm/better-sqlite3
# With: drizzle-orm/node-postgres
```

Update `src/db/client.ts`:

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
```

## 🎯 Next Steps

1. **Start with Transaction API**: Get basic CRUD working
2. **Add Document Upload**: Implement Replit Object Storage
3. **Integrate OCR**: Use Tesseract.js for A1 certificate extraction
4. **Build MCP Stubs**: Create placeholder MCP servers
5. **Implement Playwright**: Start with Wikipedia test, then move to SIPSI

## 🐛 Troubleshooting

### Playwright Browser Not Found

```bash
npx playwright install chromium
```

### CORS Errors

Make sure `FRONTEND_URL` in `.env` matches your Vite dev server URL.

### SQLite Database Locked

Close any DB browser tools. SQLite allows only one writer at a time.

## 📚 Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Playwright Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
- [Replit Object Storage](https://docs.replit.com/hosting/storing-data/object-storage)
- [MCP Specification](https://modelcontextprotocol.io/)

---

**Ready to build?** Start with the transaction API and work your way up to browser automation!
