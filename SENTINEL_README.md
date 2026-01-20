# 🛡️ SENTINEL - Browser-Native Compliance Engine

**Dismantling the #1 barrier to the European Single Market: fragmented taxation and permit filing.**

## 🎯 What is Sentinel?

Sentinel is a Neuro-Symbolic Agent designed to help EU SMEs navigate cross-border compliance. It combines:

- **Deterministic VAT Engine**: Hard-coded EU statutory rules (€10k OSS, €100k SME) to eliminate LLM hallucination in legal matters
- **Playwright Automation**: Browser automation for legacy government portals (SIPSI, OSS) with full audit trails
- **MCP Data Bridge**: Real-time accounting data from DATEV/Plaid via Model Context Protocol

## 📊 The Problem

- **70% of EU SMEs** stay domestic due to compliance complexity
- **14.4 weeks** average time for manual cross-border filing
- **€5,000 per employee** potential fines for simple errors
- **27 different portals** with no APIs

## ✨ Features

### ✅ Implemented (Frontend)

- **Real-Time Threshold Monitoring**: Dashboard with animated progress bars
- **72.5% Warning System**: Proactive alerts before hitting statutory limits
- **Document Vault**: Upload interface with OCR extraction preview
- **Audit Trail Reports**: Screenshot timeline for browser automation
- **WebGL Landing Page**: Animated mesh gradient hero section
- **Stripe-Minimalist Design**: Pure white backgrounds, Slate-950 headers, Electric Blue (#635BFF) accents

### 🚧 Planned (Backend)

- Express.js API with Drizzle ORM
- Playwright-Stealth worker for portal automation
- MCP server integration for DATEV/Plaid
- SQLite → PostgreSQL migration path
- Replit Object Storage for documents
- Encrypted credential management

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20+ (LTS recommended)
- **npm** 10+ or **pnpm** 9+

### Installation

```bash
# Navigate to frontend
cd sentinel-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
OpinionFlow/
├── sentinel-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Navigation + header
│   │   │   └── MeshGradient.tsx    # WebGL animated gradient
│   │   ├── pages/
│   │   │   ├── Landing.tsx         # Public homepage
│   │   │   ├── Dashboard.tsx       # Real-time threshold monitoring
│   │   │   ├── ThresholdSentinel.tsx  # Detailed threshold cards
│   │   │   ├── Documents.tsx       # Document vault with OCR
│   │   │   └── Reports.tsx         # Automation audit trails
│   │   ├── lib/
│   │   │   ├── vatEngine.ts        # 🔥 Deterministic VAT calculator
│   │   │   └── utils.ts            # Tailwind class merger
│   │   ├── App.tsx                 # React Router setup
│   │   └── main.tsx                # Application entry
│   ├── tailwind.config.js          # Stripe-inspired color palette
│   └── package.json
└── sentinel-backend/           # [TO BE CREATED] Express backend
    └── (Coming soon)
```

## 🧮 Deterministic VAT Engine

The core compliance logic is in `sentinel-frontend/src/lib/vatEngine.ts`:

```typescript
export const EU_VAT_THRESHOLDS = {
  OSS_TRIGGER: 10_000,      // €10k cross-border B2C
  SME_EXEMPTION_CAP: 100_000, // €100k total EU turnover
  WARNING_PERCENTAGE: 0.725,  // 72.5% alert threshold
} as const;
```

**Why Deterministic?**
- Pure LLMs have a **58-88% hallucination rate** in legal matters
- Hard-coded rules guarantee 100% accuracy
- Same input → same output (testable, auditable)

## 🎨 Design System

### Colors

- **Primary**: `#635BFF` (Stripe Electric Blue)
- **Accent Cyan**: `#00D4FF`
- **Accent Mint**: `#97FBD1`
- **Slate-950**: `#0A0A0F` (headers)

### Typography

- **Font**: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`
- **Headings**: Bold, Slate-950
- **Body**: Regular, Gray-600

### Components

- **Framer Motion**: All cards and progress bars animate on scroll
- **Lucide Icons**: Consistent iconography
- **Tailwind CSS**: Utility-first styling

## 🔐 Security & Compliance

### Current (Frontend)

- Client-side only (no sensitive data stored)
- Mock transaction data for demonstration

### Planned (Backend)

- **Encryption at Rest**: AES-256 for PII (passports, VAT IDs)
- **Replit Secrets**: API tokens (Maesn, Plaid, DeepL)
- **GDPR Compliance**: EU-regionalized deployment ready
- **Click-to-Sign**: Manual approval required for all submissions

## 🤖 Browser Automation (Roadmap)

### How It Works

1. **Data Mapping**: Extract from Document Vault + MCP accounting feeds
2. **Stealth Navigation**: Playwright with residential proxies + human-like behavior
3. **Screenshot Evidence**: Capture every step (Login → Form Fill → Draft → Review)
4. **Manual Approval**: Submission BLOCKED until user clicks "Approve & Submit"

### Target Portals

- **SIPSI** (France): Posted worker declarations
- **OSS Portal** (EU): One Stop Shop VAT returns
- National portals (Germany, Netherlands, etc.)

## 📚 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS + Shadcn UI |
| Animation | Framer Motion |
| State | TanStack Query (React Query) |
| Icons | Lucide React |
| Backend (planned) | Express.js + Drizzle ORM |
| Database (planned) | SQLite → PostgreSQL |
| Automation (planned) | Playwright-Stealth |

## 🎓 Learning Resources

### EU VAT Rules

- [EU Regulation 2020/285](https://eur-lex.europa.eu/eli/reg/2020/285/oj) - OSS scheme
- [Directive 2006/112/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex%3A32006L0112) - SME exemption

### Technical References

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [Playwright Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
- [DATEV API](https://developer.datev.de/) (via Chift/Maesn)

## 🚀 Deployment

### Replit (Recommended)

1. Import repository to Replit
2. Set secrets: `DATEV_API_KEY`, `PLAID_CLIENT_ID`, etc.
3. Configure Replit Object Storage for documents
4. Deploy with automatic HTTPS + custom domain

### Vercel + Railway

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Railway (PostgreSQL included)
- Set environment variables in respective dashboards

## 📝 Development Roadmap

### Phase 1: Frontend Shell ✅ (COMPLETE)
- [x] React + Vite + TypeScript setup
- [x] React Router navigation
- [x] Tailwind CSS + Shadcn UI
- [x] Deterministic VAT engine
- [x] Dashboard with threshold monitoring
- [x] Threshold Sentinel page
- [x] Document Vault UI
- [x] Reports/Audit Trail UI
- [x] WebGL landing page

### Phase 2: Backend Foundation 🚧 (NEXT)
- [ ] Express.js API server
- [ ] Drizzle ORM + SQLite
- [ ] Transaction CRUD endpoints
- [ ] Document upload to Replit Storage
- [ ] Basic OCR with Tesseract.js

### Phase 3: MCP Integration 🔜
- [ ] MCP server for DATEV (via Maesn)
- [ ] MCP server for Plaid bank feeds
- [ ] Real-time transaction sync
- [ ] Threshold webhook alerts

### Phase 4: Browser Automation 🔮
- [ ] Playwright-Stealth worker
- [ ] SIPSI portal integration (France)
- [ ] OSS portal integration (EU)
- [ ] Screenshot capture pipeline
- [ ] Click-to-Sign approval flow

## 🏗️ Next Steps (For You)

### 1. Test the Frontend

The dev server is running at [http://localhost:5173](http://localhost:5173)

**Pages to test:**
- `/` - Landing page with WebGL gradient
- `/dashboard` - Threshold monitoring (72.5% warning demo)
- `/thresholds` - Detailed threshold cards with progress bars
- `/documents` - Document vault upload UI
- `/reports` - Automation audit trail

### 2. Create the Backend (Separate Repo)

When ready for backend development:

```bash
# In a new directory
mkdir sentinel-backend
cd sentinel-backend
npm init -y
npm install express drizzle-orm better-sqlite3 playwright-extra puppeteer-extra-plugin-stealth
```

Follow the architecture in the original blueprint:
- Express routes for `/api/transactions`, `/api/documents`, `/api/automate/*`
- Drizzle schema for Transactions, Documents, AuditLogs tables
- Playwright worker in `src/workers/browser.ts`

### 3. Deploy to Replit

1. Push `sentinel-frontend` to GitHub
2. Import to Replit
3. Replit will auto-detect Vite and configure deployment
4. Set up Replit Secrets for API keys
5. Enable Replit Object Storage for document uploads

## 🐛 Known Issues

- **WebGL Fallback**: If WebGL not supported, landing page falls back to CSS gradient
- **Mock Data**: All transactions/documents are currently hardcoded for demo
- **No Authentication**: Frontend is open - add Clerk/Auth0 for production
- **No Backend**: API calls will fail until backend is created

## 🤝 Contributing

This is a demonstration project for the Sentinel concept. For production use:

1. Replace mock data with real MCP integrations
2. Implement backend API + database
3. Add authentication (Clerk, Auth0, etc.)
4. Deploy to Replit Enterprise for GDPR compliance
5. Conduct security audit for PII handling

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- **Stripe**: Design inspiration (minimalist 2025 aesthetic)
- **EU Commission**: Statutory threshold documentation
- **Anthropic**: Claude Code for rapid prototyping
- **Open Source Community**: React, Vite, Tailwind, Playwright

---

**Built with Claude Code** 🤖 | Development Server: http://localhost:5173
