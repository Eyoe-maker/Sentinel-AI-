# 🚀 Sentinel Production Launch Checklist

## Current Status: ✅ Frontend Complete | 🚧 Backend Required

---

## ✅ **What's Already Done**

### Frontend (100% Complete)
- [x] React + Vite + TypeScript setup
- [x] React Router DOM navigation (all routes functional)
- [x] Stripe-inspired UI/UX design
- [x] Tailwind CSS + responsive design
- [x] Framer Motion animations
- [x] Dashboard with threshold monitoring
- [x] Threshold Sentinel page
- [x] Documents vault UI
- [x] Reports/audit trail UI
- [x] Landing page with WebGL gradient
- [x] Deterministic VAT engine (vatEngine.ts)
- [x] Mock data for demonstration

---

## 🚧 **What's Missing for Production**

### 1. **Backend API** (Critical - Required)

#### Database
- [ ] Set up PostgreSQL database (or start with SQLite)
- [ ] Create database schema with Drizzle ORM:
  - `transactions` table (id, date, amount, country, isB2B, etc.)
  - `documents` table (id, name, category, country, status, storageUrl, etc.)
  - `audit_logs` table (id, date, portal, action, status, screenshots, etc.)
  - `users` table (authentication)
- [ ] Set up database migrations

#### API Endpoints
- [ ] `POST /api/transactions` - Add new transaction
- [ ] `GET /api/transactions` - List all transactions
- [ ] `DELETE /api/transactions/:id` - Remove transaction
- [ ] `GET /api/vat-status` - Calculate current VAT status (uses vatEngine.ts)
- [ ] `POST /api/documents/upload` - Upload document to storage
- [ ] `GET /api/documents` - List all documents
- [ ] `POST /api/documents/:id/ocr` - Run OCR extraction
- [ ] `GET /api/reports` - Get automation audit logs
- [ ] `POST /api/automate/sipsi` - Run SIPSI portal automation
- [ ] `POST /api/automate/oss` - Run OSS portal automation

**Backend Stack Recommendation:**
```bash
# In sentinel-backend/
npm install express cors dotenv
npm install drizzle-orm better-sqlite3  # Or: pg for PostgreSQL
npm install -D typescript @types/node @types/express tsx
```

---

### 2. **Authentication** (Critical - Required)

- [ ] User registration/login system
- [ ] Session management or JWT tokens
- [ ] Password hashing (bcrypt)
- [ ] Protected API routes
- [ ] OAuth integration (optional: Google, Microsoft)

**Recommended Services:**
- **Clerk** (easiest): Drop-in authentication for React
- **Auth0**: Enterprise-grade auth
- **Supabase Auth**: If using Supabase for database
- **Custom**: Express + Passport.js + JWT

**Implementation:**
```bash
# Using Clerk (recommended for speed)
npm install @clerk/clerk-react
```

---

### 3. **Document Storage** (Required for Document Vault)

- [ ] Set up cloud storage for uploaded documents
- [ ] Configure upload API endpoint
- [ ] Implement file size/type validation
- [ ] Secure file access (signed URLs)

**Options:**
1. **Replit Object Storage** (if deploying to Replit)
2. **AWS S3** (most popular, scalable)
3. **Supabase Storage** (if using Supabase)
4. **Cloudinary** (good for images/PDFs)
5. **UploadThing** (developer-friendly)

**Example with S3:**
```bash
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
```

---

### 4. **OCR Service** (Required for Document Vault)

- [ ] Integrate OCR API for document extraction
- [ ] Extract: Worker names, certificate IDs, expiry dates
- [ ] Store extracted data in database

**Options:**
1. **Tesseract.js** (free, runs in browser or Node.js)
2. **Google Cloud Vision API** (best accuracy)
3. **AWS Textract** (good for complex documents)
4. **Azure Form Recognizer** (specialized for forms)

**Example with Tesseract.js:**
```bash
npm install tesseract.js
```

---

### 5. **Playwright Automation** (Core Feature - Browser Automation)

- [ ] Set up Playwright-Stealth worker
- [ ] Implement SIPSI portal automation (France)
- [ ] Implement OSS portal automation (EU)
- [ ] Screenshot capture pipeline
- [ ] Store automation logs in database
- [ ] "Click-to-Sign" approval workflow

**Installation:**
```bash
npm install playwright playwright-extra puppeteer-extra-plugin-stealth
npx playwright install chromium
```

**Challenges:**
- Bot detection (need residential proxies)
- Portal structure changes (need maintenance)
- Legal compliance (ensure user consent)

---

### 6. **MCP Integration** (Advanced - Real-time Data)

- [ ] MCP server for DATEV accounting data (via Maesn/Chift)
- [ ] MCP server for Plaid bank feeds
- [ ] Real-time transaction sync
- [ ] Webhook handling for threshold alerts

**What is MCP?**
Model Context Protocol - allows AI agents to access real-time data from external systems.

**Resources:**
- [MCP Specification](https://modelcontextprotocol.io/)
- DATEV API access (requires partnership)
- Plaid API (easy to set up)

---

### 7. **Email Notifications** (Important)

- [ ] Send alerts when threshold reaches 72.5%
- [ ] Send alerts when threshold is exceeded
- [ ] Weekly compliance summary emails
- [ ] Failed automation notifications

**Options:**
- **Resend** (modern, developer-friendly)
- **SendGrid** (enterprise)
- **Postmark** (transactional)
- **AWS SES** (cheap, reliable)

**Example with Resend:**
```bash
npm install resend
```

---

### 8. **Environment Configuration** (Critical)

Create `.env` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sentinel
# or for SQLite: DATABASE_URL=file:./sentinel.db

# Authentication (if using Clerk)
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Storage (if using AWS S3)
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_S3_BUCKET=sentinel-documents
AWS_REGION=eu-west-1

# Email (if using Resend)
RESEND_API_KEY=re_xxxxx

# MCP/APIs (future)
DATEV_API_KEY=xxxxx
PLAID_CLIENT_ID=xxxxx
PLAID_SECRET=xxxxx

# Playwright
PROXY_URL=http://residential-proxy.com:8080

# App Config
NODE_ENV=production
FRONTEND_URL=https://sentinel.yourdomain.com
API_URL=https://api.sentinel.yourdomain.com
```

---

### 9. **Deployment** (Required)

#### Option A: Replit (Easiest - Your Choice)
- [ ] Push frontend to Replit
- [ ] Push backend to separate Replit project
- [ ] Set environment variables in Replit Secrets
- [ ] Configure Replit Object Storage
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic on Replit)

**Pros:** All-in-one, easy setup, EU hosting available
**Cons:** More expensive at scale

#### Option B: Vercel + Railway (Popular)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Set up PostgreSQL on Railway
- [ ] Configure environment variables
- [ ] Set up custom domains
- [ ] Configure CORS between frontend/backend

**Pros:** Free tiers, excellent performance
**Cons:** Need to manage two platforms

#### Option C: AWS/GCP (Enterprise)
- [ ] Deploy frontend to S3 + CloudFront (or Vercel)
- [ ] Deploy backend to EC2/ECS/Lambda
- [ ] Set up RDS PostgreSQL
- [ ] Configure VPC, security groups
- [ ] Set up load balancer
- [ ] Configure auto-scaling

**Pros:** Full control, scales infinitely
**Cons:** Complex setup, higher maintenance

---

### 10. **Legal & Compliance** (Critical for EU)

- [ ] Privacy Policy (GDPR-compliant)
- [ ] Terms of Service
- [ ] Cookie consent banner
- [ ] Data Processing Agreement (DPA)
- [ ] User consent for browser automation
- [ ] Encryption at rest for PII (passports, VAT IDs)
- [ ] Right to delete (GDPR Article 17)
- [ ] Data export functionality

**GDPR Requirements:**
- User data encrypted (AES-256)
- EU-hosted infrastructure (if serving EU customers)
- Audit logs for data access
- Data retention policies

---

### 11. **Testing** (Important)

- [ ] Unit tests for vatEngine.ts
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Load testing for threshold calculations
- [ ] Security testing (SQL injection, XSS, etc.)

**Tools:**
- **Vitest** (unit tests)
- **Playwright** (E2E tests)
- **k6** (load testing)

---

### 12. **Monitoring & Analytics** (Post-Launch)

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics / Posthog)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Database query performance (pg_stat_statements)
- [ ] User analytics (PostHog / Plausible)

---

### 13. **Documentation** (Important)

- [ ] User guide (how to use Sentinel)
- [ ] API documentation (if exposing APIs)
- [ ] Setup instructions for self-hosting
- [ ] Compliance workflow guide
- [ ] Troubleshooting FAQ

---

## 📊 **Minimum Viable Product (MVP) Scope**

To launch a working MVP, you need **at minimum**:

### Must Have (MVP)
1. ✅ Frontend (already done)
2. 🚧 Backend API with database
3. 🚧 Authentication (Clerk recommended)
4. 🚧 Transaction CRUD (add/view/delete)
5. 🚧 VAT status calculation (connect vatEngine.ts to real data)
6. 🚧 Basic deployment (Replit or Vercel+Railway)

### Can Wait (Post-MVP)
- Document upload (add later)
- OCR extraction (add later)
- Playwright automation (add later)
- MCP integration (add later)
- Email notifications (add later)

---

## 🛠️ **Quick Start: Backend in 1 Hour**

```bash
# 1. Create backend project
mkdir sentinel-backend
cd sentinel-backend
npm init -y

# 2. Install dependencies
npm install express cors dotenv drizzle-orm better-sqlite3
npm install -D typescript @types/node @types/express tsx drizzle-kit

# 3. Create basic structure
mkdir src
touch src/index.ts src/db.ts .env

# 4. Run
npm run dev
```

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for full backend tutorial.

---

## ⏱️ **Estimated Timeline**

| Task | Time | Priority |
|------|------|----------|
| Backend API + Database | 1-2 days | Critical |
| Authentication (Clerk) | 2-4 hours | Critical |
| Connect frontend to backend | 4 hours | Critical |
| Deployment setup | 4 hours | Critical |
| Document upload + storage | 1 day | Medium |
| OCR integration | 1 day | Medium |
| Playwright automation | 2-3 days | Low (complex) |
| MCP integration | 3-5 days | Low (advanced) |
| Testing + bug fixes | 2 days | High |
| Legal docs | 1 day | High |

**MVP Timeline:** 1 week (with backend focus)
**Full Launch:** 2-3 weeks

---

## 💰 **Estimated Costs (Monthly)**

### Option 1: Hobby/Startup (< 100 users)
- **Replit**: $20-40/month (frontend + backend)
- **Database**: Included in Replit or $5 (Supabase free tier)
- **Storage**: $5 (Cloudinary free tier or S3)
- **Email**: Free (Resend free tier: 3k emails/month)
- **Auth**: Free (Clerk free tier: 5k users)
- **Total**: $25-50/month

### Option 2: Growing (100-1000 users)
- **Vercel**: Free (frontend)
- **Railway**: $20/month (backend + Postgres)
- **S3**: $10/month
- **Resend**: $20/month
- **Clerk**: $25/month
- **Sentry**: Free tier
- **Total**: $75/month

### Option 3: Scale (1000+ users)
- **Vercel Pro**: $20/month
- **Railway**: $50/month
- **AWS RDS**: $30/month
- **S3**: $20/month
- **SendGrid**: $20/month
- **Clerk**: $100/month
- **Total**: $240/month

---

## 🎯 **Next Steps (Priority Order)**

1. **Build Backend** (Follow [BACKEND_SETUP.md](BACKEND_SETUP.md))
   - Express server
   - SQLite database
   - Transaction API endpoints

2. **Add Authentication**
   - Install Clerk
   - Protect routes
   - Add login/signup UI

3. **Connect Frontend to Backend**
   - Replace mock data with API calls
   - Update vatEngine to use real transactions
   - Add loading states

4. **Deploy MVP**
   - Deploy to Replit (easiest)
   - Test live app
   - Share with beta users

5. **Iterate**
   - Add document upload
   - Add OCR
   - Build Playwright automation

---

## ❓ **Questions to Answer Before Launch**

1. **Target Market**: Who are your first users?
   - EU SMEs doing cross-border sales?
   - Specific countries (France, Germany, etc.)?

2. **Pricing Model**:
   - Free tier?
   - Subscription ($20-50/month)?
   - Per-transaction pricing?

3. **Automation Scope**:
   - Which portals to support first (SIPSI, OSS)?
   - Manual review required before submission?

4. **Compliance**:
   - Will you handle user credentials (risky)?
   - Or just prepare documents for users to submit manually?

5. **Support**:
   - Email support only?
   - Live chat?
   - Documentation site?

---

## 📞 **Need Help?**

Based on your answers above, I can:
1. Build the backend for you (Express + Drizzle + SQLite)
2. Integrate authentication (Clerk setup)
3. Connect frontend to backend APIs
4. Deploy to Replit
5. Create documentation

**Ready to start?** Let me know which component to build first! 🚀

---

**Current Status:**
- ✅ Frontend: Production-ready
- 🚧 Backend: Not started (critical path)
- 🚧 Deployment: Not configured
- 🚧 Data: Using mock data only

**Blocker:** Need backend API to make app functional beyond demo.
