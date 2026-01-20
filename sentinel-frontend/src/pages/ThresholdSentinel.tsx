import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, Info } from 'lucide-react';
import { calculateVATStatus, generateMockTransactions, EU_VAT_THRESHOLDS } from '../lib/vatEngine';
import type { VATStatus } from '../lib/vatEngine';
import { cn } from '../lib/utils';

export default function ThresholdSentinel() {
  const [vatStatus, setVatStatus] = useState<VATStatus | null>(null);

  useEffect(() => {
    const transactions = generateMockTransactions();
    const status = calculateVATStatus(transactions);
    setVatStatus(status);
  }, []);

  if (!vatStatus) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center space-x-3">
        <Target className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Threshold Sentinel</h1>
          <p className="mt-1 text-gray-600">Monitor EU VAT thresholds in real-time</p>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-900">
          <p className="font-medium">How it works:</p>
          <p className="mt-1">
            Sentinel tracks your transactions against statutory EU thresholds. When you reach{' '}
            <span className="font-semibold">72.5%</span> of any limit, you'll receive an{' '}
            <span className="font-semibold">"Attention Required"</span> alert.
          </p>
        </div>
      </div>

      {/* Threshold cards */}
      <div className="space-y-6">
        {/* OSS Threshold Card */}
        <ThresholdCard
          title="OSS Registration Threshold"
          description="One Stop Shop - Cross-border B2C sales to EU consumers"
          limit={EU_VAT_THRESHOLDS.OSS_TRIGGER}
          current={vatStatus.totalCrossBorderB2C}
          percentage={vatStatus.ossThresholdPercentage}
          status={vatStatus.ossStatus}
          remaining={vatStatus.ossRemainingCapacity}
          consequence="If exceeded: You must register for OSS and file quarterly returns"
          regulation="EU Regulation 2020/285, Article 3"
        />

        {/* SME Exemption Card */}
        <ThresholdCard
          title="SME VAT Exemption Cap"
          description="Total annual EU-wide turnover for small business exemption"
          limit={EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP}
          current={vatStatus.totalEUTurnover}
          percentage={vatStatus.smeThresholdPercentage}
          status={vatStatus.smeStatus}
          remaining={vatStatus.smeRemainingCapacity}
          consequence="If exceeded: Loss of SME exemption benefits, standard VAT applies"
          regulation="EU Directive 2006/112/EC, Article 287"
        />
      </div>

      {/* Warning threshold explanation */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900">72.5% Warning Threshold</h3>
            <p className="text-sm text-amber-800 mt-2">
              This warning threshold is set at <span className="font-semibold">72.5%</span> to give you sufficient time to:
            </p>
            <ul className="text-sm text-amber-800 mt-2 space-y-1 ml-4 list-disc">
              <li>Prepare necessary documentation for registration</li>
              <li>Adjust business operations if needed</li>
              <li>Consult with tax advisors</li>
              <li>Plan for compliance requirements</li>
            </ul>
            <p className="text-sm text-amber-800 mt-2">
              This is <span className="font-semibold">not a legal requirement</span> - it's a proactive alert
              to help you stay ahead of compliance obligations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThresholdCard({
  title,
  description,
  limit,
  current,
  percentage,
  status,
  remaining,
  consequence,
  regulation,
}: {
  title: string;
  description: string;
  limit: number;
  current: number;
  percentage: number;
  status: 'safe' | 'warning' | 'exceeded';
  remaining: number;
  consequence: string;
  regulation: string;
}) {
  const statusConfig = {
    safe: {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      barColor: 'bg-green-500',
      label: 'On Track',
    },
    warning: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      barColor: 'bg-amber-500',
      label: 'Attention Required',
    },
    exceeded: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      barColor: 'bg-red-500',
      label: 'Action Required',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('border rounded-lg p-6', config.borderColor)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className={cn('px-4 py-2 rounded-full text-sm font-semibold', config.bgColor, config.color)}>
          {config.label}
        </div>
      </div>

      {/* Progress visualization */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-slate-950">€{current.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Current amount</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{percentage.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">of limit</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={cn('h-full rounded-full', config.barColor)}
            />
          </div>
          {/* 72.5% marker */}
          <div
            className="absolute top-0 h-4 w-0.5 bg-amber-400"
            style={{ left: '72.5%' }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-amber-600 whitespace-nowrap">
              72.5% Alert
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>€0</span>
          <span className="font-medium">€{limit.toLocaleString()} Limit</span>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">Remaining Capacity</p>
          <p className="text-lg font-semibold text-slate-950 mt-1">€{remaining.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">Statutory Limit</p>
          <p className="text-lg font-semibold text-slate-950 mt-1">€{limit.toLocaleString()}</p>
        </div>
      </div>

      {/* Legal info */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">Consequence</p>
          <p className="text-sm text-gray-700 mt-1">{consequence}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">Legal Basis</p>
          <p className="text-sm text-gray-700 mt-1">{regulation}</p>
        </div>
      </div>
    </motion.div>
  );
}
