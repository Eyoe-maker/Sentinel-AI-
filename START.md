# 🚀 Quick Start Guide

## For Windows Users

### Option 1: Using Git Bash (Current Terminal)

```bash
cd sentinel-frontend
export PATH="/c/Program Files/nodejs:$PATH"
npm run dev
```

### Option 2: Using Command Prompt (CMD)

```cmd
cd sentinel-frontend
npm run dev
```

### Option 3: Using PowerShell

```powershell
cd sentinel-frontend
npm run dev
```

## What You'll See

```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Opening in Browser

1. **Automatically**: Ctrl+Click on `http://localhost:5173/`
2. **Manually**: Open your browser and visit `http://localhost:5173`

## Available Pages

- **http://localhost:5173/** - Landing page with WebGL gradient
- **http://localhost:5173/dashboard** - Compliance dashboard
- **http://localhost:5173/thresholds** - Threshold sentinel
- **http://localhost:5173/documents** - Document vault
- **http://localhost:5173/reports** - Audit trail

## Stopping the Server

Press **Ctrl+C** in the terminal

## Troubleshooting

### "npm: command not found"

Node.js is not in your PATH. Run:
```bash
export PATH="/c/Program Files/nodejs:$PATH"
```

### Port 5173 Already in Use

Another Vite server is running. Either:
1. Stop it with Ctrl+C
2. Or Vite will automatically use port 5174

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ **Test all pages** - Navigate through the application
2. ✅ **Check responsiveness** - Resize browser window
3. ✅ **Review documentation** - See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
4. 🚧 **Build backend** - Follow [BACKEND_SETUP.md](BACKEND_SETUP.md)

---

**Current Status**: ✅ Frontend Complete | Development Server Ready
**Your URL**: http://localhost:5173
