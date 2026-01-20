import { db, transactions, NewTransaction } from './db';
import { randomUUID } from 'crypto';

// Seed database with mock transactions
async function seed() {
  console.log('🌱 Seeding database...');

  const mockTransactions: NewTransaction[] = [
    {
      id: randomUUID(),
      date: new Date('2025-01-05'),
      amount: 2450,
      customerCountry: 'FR',
      isB2B: false,
      isCrossBorder: true,
      vatRate: 20,
      description: 'Cross-border B2C sale to France',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      date: new Date('2025-01-08'),
      amount: 3200,
      customerCountry: 'DE',
      isB2B: false,
      isCrossBorder: true,
      vatRate: 19,
      description: 'Cross-border B2C sale to Germany',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      date: new Date('2025-01-12'),
      amount: 1800,
      customerCountry: 'NL',
      isB2B: false,
      isCrossBorder: true,
      vatRate: 21,
      description: 'Cross-border B2C sale to Netherlands',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      date: new Date('2025-01-15'),
      amount: 5500,
      customerCountry: 'IT',
      isB2B: true,
      isCrossBorder: true,
      vatRate: 22,
      description: 'B2B sale to Italy (does not count toward OSS)',
      createdAt: new Date(),
    },
  ];

  // Insert transactions
  for (const transaction of mockTransactions) {
    await db.insert(transactions).values(transaction);
  }

  console.log(`✅ Seeded ${mockTransactions.length} transactions`);
  console.log('');
  console.log('Summary:');
  console.log(`  Cross-border B2C: €${2450 + 3200 + 1800} (${((2450 + 3200 + 1800) / 10000 * 100).toFixed(1)}% of OSS limit)`);
  console.log(`  Total turnover: €${2450 + 3200 + 1800 + 5500} (${((2450 + 3200 + 1800 + 5500) / 100000 * 100).toFixed(1)}% of SME cap)`);
  console.log('');
}

seed()
  .then(() => {
    console.log('✅ Seed complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
