import { describe, it, expect } from 'vitest';
import { calculateVATStatus, EU_VAT_THRESHOLDS } from './vatEngine';
import { Transaction } from '../db/schema';

// Helper to create test transactions
function createTransaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: 'test-' + Math.random().toString(36).substr(2, 9),
    userId: null,
    date: new Date(),
    amount: 1000,
    customerCountry: 'FR',
    isB2B: false,
    isCrossBorder: true,
    vatRate: 20,
    description: null,
    createdAt: new Date(),
    ...overrides,
  };
}

describe('VAT Engine', () => {
  describe('EU_VAT_THRESHOLDS', () => {
    it('should have correct OSS trigger threshold', () => {
      expect(EU_VAT_THRESHOLDS.OSS_TRIGGER).toBe(10_000);
    });

    it('should have correct SME exemption cap', () => {
      expect(EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP).toBe(100_000);
    });

    it('should have correct warning percentage', () => {
      expect(EU_VAT_THRESHOLDS.WARNING_PERCENTAGE).toBe(0.725);
    });
  });

  describe('calculateVATStatus', () => {
    it('should return safe status for empty transactions', () => {
      const result = calculateVATStatus([]);

      expect(result.totalCrossBorderB2C).toBe(0);
      expect(result.totalEUTurnover).toBe(0);
      expect(result.ossThresholdPercentage).toBe(0);
      expect(result.smeThresholdPercentage).toBe(0);
      expect(result.ossStatus).toBe('safe');
      expect(result.smeStatus).toBe('safe');
      expect(result.requiresOSSRegistration).toBe(false);
      expect(result.requiresSMEReview).toBe(false);
    });

    it('should correctly calculate cross-border B2C totals', () => {
      const transactions = [
        createTransaction({ amount: 2000, isCrossBorder: true, isB2B: false }),
        createTransaction({ amount: 3000, isCrossBorder: true, isB2B: false }),
        createTransaction({ amount: 5000, isCrossBorder: true, isB2B: true }), // B2B - excluded
        createTransaction({ amount: 1000, isCrossBorder: false, isB2B: false }), // Domestic - excluded
      ];

      const result = calculateVATStatus(transactions);

      expect(result.totalCrossBorderB2C).toBe(5000); // 2000 + 3000
      expect(result.totalEUTurnover).toBe(11000); // All transactions
    });

    it('should return safe status below 72.5% threshold', () => {
      const transactions = [
        createTransaction({ amount: 5000, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossThresholdPercentage).toBe(50);
      expect(result.ossStatus).toBe('safe');
    });

    it('should return warning status at 72.5% threshold', () => {
      const transactions = [
        createTransaction({ amount: 7250, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossThresholdPercentage).toBe(72.5);
      expect(result.ossStatus).toBe('warning');
    });

    it('should return warning status between 72.5% and 100%', () => {
      const transactions = [
        createTransaction({ amount: 8500, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossThresholdPercentage).toBe(85);
      expect(result.ossStatus).toBe('warning');
    });

    it('should return exceeded status at 100% threshold', () => {
      const transactions = [
        createTransaction({ amount: 10000, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossThresholdPercentage).toBe(100);
      expect(result.ossStatus).toBe('exceeded');
      expect(result.requiresOSSRegistration).toBe(true);
    });

    it('should return exceeded status above 100% threshold', () => {
      const transactions = [
        createTransaction({ amount: 15000, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossThresholdPercentage).toBe(150);
      expect(result.ossStatus).toBe('exceeded');
      expect(result.requiresOSSRegistration).toBe(true);
    });

    it('should calculate remaining capacity correctly', () => {
      const transactions = [
        createTransaction({ amount: 7500, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossRemainingCapacity).toBe(2500); // 10000 - 7500
    });

    it('should return 0 remaining capacity when exceeded', () => {
      const transactions = [
        createTransaction({ amount: 12000, isCrossBorder: true, isB2B: false }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.ossRemainingCapacity).toBe(0);
    });

    it('should calculate SME threshold independently', () => {
      const transactions = [
        createTransaction({ amount: 80000, isCrossBorder: false, isB2B: false }), // Domestic
      ];

      const result = calculateVATStatus(transactions);

      expect(result.totalCrossBorderB2C).toBe(0);
      expect(result.ossStatus).toBe('safe');
      expect(result.totalEUTurnover).toBe(80000);
      expect(result.smeThresholdPercentage).toBe(80);
      expect(result.smeStatus).toBe('warning');
    });

    it('should handle real-world scenario: approaching OSS limit', () => {
      // Scenario: Business has made several cross-border B2C sales
      const transactions = [
        createTransaction({ amount: 2450, customerCountry: 'FR', isCrossBorder: true, isB2B: false }),
        createTransaction({ amount: 3200, customerCountry: 'DE', isCrossBorder: true, isB2B: false }),
        createTransaction({ amount: 1800, customerCountry: 'NL', isCrossBorder: true, isB2B: false }),
        createTransaction({ amount: 5500, customerCountry: 'IT', isCrossBorder: true, isB2B: true }), // B2B
      ];

      const result = calculateVATStatus(transactions);

      expect(result.totalCrossBorderB2C).toBe(7450); // B2C only
      expect(result.ossThresholdPercentage).toBe(74.5);
      expect(result.ossStatus).toBe('warning');
      expect(result.ossRemainingCapacity).toBe(2550);
    });

    it('should handle decimal amounts correctly', () => {
      const transactions = [
        createTransaction({ amount: 1234.56 }),
        createTransaction({ amount: 7890.12 }),
      ];

      const result = calculateVATStatus(transactions);

      expect(result.totalCrossBorderB2C).toBeCloseTo(9124.68, 2);
    });
  });
});
