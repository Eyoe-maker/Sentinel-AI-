/**
 * SENTINEL VAT ENGINE (Backend Version)
 * Deterministic EU SME VAT Scheme Calculator
 */

import { Transaction } from '../db/schema';

// EU VAT Thresholds (2025)
export const EU_VAT_THRESHOLDS = {
  OSS_TRIGGER: 10_000, // €10,000
  SME_EXEMPTION_CAP: 100_000, // €100,000
  WARNING_PERCENTAGE: 0.725, // 72.5%
} as const;

export interface VATStatus {
  totalCrossBorderB2C: number;
  totalEUTurnover: number;
  ossThresholdPercentage: number;
  smeThresholdPercentage: number;
  ossStatus: 'safe' | 'warning' | 'exceeded';
  smeStatus: 'safe' | 'warning' | 'exceeded';
  ossRemainingCapacity: number;
  smeRemainingCapacity: number;
  requiresOSSRegistration: boolean;
  requiresSMEReview: boolean;
}

/**
 * Calculate VAT status from transactions
 */
export function calculateVATStatus(transactions: Transaction[]): VATStatus {
  // Calculate totals
  const totalCrossBorderB2C = transactions
    .filter(t => t.isCrossBorder && !t.isB2B)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalEUTurnover = transactions
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate percentages
  const ossThresholdPercentage = (totalCrossBorderB2C / EU_VAT_THRESHOLDS.OSS_TRIGGER) * 100;
  const smeThresholdPercentage = (totalEUTurnover / EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP) * 100;

  // Determine status
  const ossStatus = getThresholdStatus(ossThresholdPercentage);
  const smeStatus = getThresholdStatus(smeThresholdPercentage);

  // Calculate remaining capacity
  const ossRemainingCapacity = Math.max(0, EU_VAT_THRESHOLDS.OSS_TRIGGER - totalCrossBorderB2C);
  const smeRemainingCapacity = Math.max(0, EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP - totalEUTurnover);

  // Determine required actions
  const requiresOSSRegistration = ossThresholdPercentage >= 100;
  const requiresSMEReview = smeThresholdPercentage >= 100;

  return {
    totalCrossBorderB2C,
    totalEUTurnover,
    ossThresholdPercentage,
    smeThresholdPercentage,
    ossStatus,
    smeStatus,
    ossRemainingCapacity,
    smeRemainingCapacity,
    requiresOSSRegistration,
    requiresSMEReview,
  };
}

function getThresholdStatus(percentage: number): 'safe' | 'warning' | 'exceeded' {
  if (percentage >= 100) return 'exceeded';
  if (percentage >= EU_VAT_THRESHOLDS.WARNING_PERCENTAGE * 100) return 'warning';
  return 'safe';
}
