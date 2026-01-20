# Sentinel Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Clerk account (for authentication)
- Resend account (for email notifications)
- Domain name (for production)

## Quick Start (Development)

```bash
# Start backend
cd sentinel-backend
npm install
npm run dev

# In another terminal, start frontend
cd sentinel-frontend
npm install
npm run dev
```

## Production Deployment with Docker

### 1. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your credentials
nano .env
```

Required variables:
- `CLERK_SECRET_KEY` - From Clerk Dashboard
- `RESEND_API_KEY` - From Resend Dashboard
- `EMAIL_FROM` - Your verified sender email

### 2. Build and Start Services

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Access the Application

- Frontend: http://localhost
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## Cloud Deployment Options

### Option A: Railway.app (Recommended for simplicity)

1. Push code to GitHub
2. Create new project on Railway
3. Add backend service from GitHub
4. Add PostgreSQL database
5. Add frontend service from GitHub
6. Set environment variables
7. Deploy

### Option B: Vercel + Railway

1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Configure environment variables on both

### Option C: AWS/GCP/Azure

1. Use Docker images with container services
2. Set up managed database (RDS/Cloud SQL)
3. Configure load balancer and SSL

## Database Migration for Production

When moving to PostgreSQL:

1. Update `drizzle.config.ts`:
```typescript
export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

2. Install PostgreSQL driver:
```bash
npm install pg
npm uninstall better-sqlite3
```

3. Run migrations:
```bash
npm run db:push
```

## SSL/HTTPS Setup

For production, configure HTTPS:

1. Use a reverse proxy (nginx, Traefik)
2. Obtain SSL certificate (Let's Encrypt)
3. Configure SSL termination

Example with Let's Encrypt:
```bash
certbot --nginx -d yourdomain.com
```

## Monitoring & Logging

Recommended tools:
- **Logs**: Papertrail, Logtail, or Datadog
- **Monitoring**: UptimeRobot, Pingdom
- **APM**: Sentry for error tracking

## Backup Strategy

1. **Database**: Daily automated backups
2. **Uploads**: Sync to cloud storage (S3, GCS)
3. **Configuration**: Version control

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Regular dependency updates

## Scaling

For high traffic:

1. **Horizontal scaling**: Add more backend instances
2. **Load balancing**: Use nginx or cloud load balancer
3. **Caching**: Add Redis for session/data caching
4. **CDN**: Use Cloudflare or similar for static assets

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Verify all environment variables are set
- Check port 3001 is available

### Frontend build fails
- Clear node_modules and reinstall
- Check Node.js version (requires 18+)

### Auth not working
- Verify Clerk keys match environment
- Check Clerk dashboard for errors

### Emails not sending
- Verify Resend API key
- Check sender domain is verified
