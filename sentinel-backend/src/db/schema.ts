import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Transactions table - stores all EU transactions for VAT calculation
export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id'), // Clerk user ID for multi-tenancy (null for demo/legacy data)
  date: integer('date', { mode: 'timestamp' }).notNull(),
  amount: real('amount').notNull(), // In euros
  customerCountry: text('customer_country').notNull(), // ISO 3166-1 alpha-2
  isB2B: integer('is_b2b', { mode: 'boolean' }).notNull(),
  isCrossBorder: integer('is_cross_border', { mode: 'boolean' }).notNull(),
  vatRate: real('vat_rate').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

// Documents table - for Document Vault
export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  userId: text('user_id'), // Clerk user ID for multi-tenancy
  name: text('name').notNull(),
  category: text('category').notNull(), // 'A1 Certificate' | 'Posted Worker Declaration' | etc.
  country: text('country').notNull(),
  uploadDate: integer('upload_date', { mode: 'timestamp' }).notNull(),
  expiryDate: integer('expiry_date', { mode: 'timestamp' }),
  status: text('status').notNull(), // 'verified' | 'pending' | 'expired'
  storageUrl: text('storage_url'),
  extractedData: text('extracted_data'), // JSON string with OCR results
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

// Audit Logs table - for browser automation tracking
export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  portal: text('portal').notNull(), // 'SIPSI' | 'OSS' | etc.
  action: text('action').notNull(),
  status: text('status').notNull(), // 'success' | 'pending' | 'failed'
  screenshots: text('screenshots'), // JSON array of screenshot URLs
  duration: integer('duration').notNull(), // in milliseconds
  metadata: text('metadata'), // JSON string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

// Type exports for TypeScript
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
