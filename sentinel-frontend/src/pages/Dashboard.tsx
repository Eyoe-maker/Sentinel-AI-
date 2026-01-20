import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  Euro,
  Activity,
} from 'lucide-react';
import { EU_VAT_THRESHOLDS } from '../lib/vatEngine';
import { fetchVATStatus, type VATStatus } from '../lib/api';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const [vatStatus, setVatStatus] = useState<VATStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch real VAT status from backend API
    fetchVATStatus()
      .then(status => setVatStatus(status))
      .catch(err => {
        console.error('Failed to fetch VAT status:', err);
        setError('Failed to load data. Make sure the backend is running.');
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!vatStatus) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Dashboard</h1>
        <p className="text-lg text-gray-600">Monitor your EU compliance status</p>
      </div>

      {/* Warning Alert if needed */}
      {vatStatus.ossThresholdPercentage > 72.5 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-warning-light border-l-4 border-warning rounded-r-lg p-5"
        >
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Threshold Warning</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                You've reached {vatStatus.ossThresholdPercentage.toFixed(1)}% of your OSS threshold.
                Consider preparing for registration requirements.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid - Stripe Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Cross-Border Sales</div>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            €{vatStatus.totalCrossBorderB2C.toLocaleString()}
          </div>
          <div className="flex items-center text-sm">
            <span className={cn(
              "font-medium",
              vatStatus.ossThresholdPercentage > 72.5 ? "text-warning" : "text-success"
            )}>
              {vatStatus.ossThresholdPercentage.toFixed(1)}%
            </span>
            <span className="text-gray-500 ml-1">of OSS limit</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Total Turnover</div>
            <Euro className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            €{vatStatus.totalEUTurnover.toLocaleString()}
          </div>
          <div className="flex items-center text-sm">
            <span className={cn(
              "font-medium",
              vatStatus.smeThresholdPercentage > 72.5 ? "text-warning" : "text-success"
            )}>
              {vatStatus.smeThresholdPercentage.toFixed(1)}%
            </span>
            <span className="text-gray-500 ml-1">of SME cap</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">OSS Remaining</div>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            €{vatStatus.ossRemainingCapacity.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Before registration</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Status</div>
            <CheckCircle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {vatStatus.ossStatus === 'safe' && vatStatus.smeStatus === 'safe' ? 'Healthy' : 'Warning'}
          </div>
          <div className="text-sm text-gray-500">Compliance state</div>
        </motion.div>
      </div>

      {/* Main Content - Stripe Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* OSS Threshold Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    OSS Registration Threshold
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cross-border B2C sales to EU consumers
                  </p>
                </div>
                <span className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium",
                  vatStatus.ossStatus === 'safe' ? 'bg-success-light text-success-dark' :
                  vatStatus.ossStatus === 'warning' ? 'bg-warning-light text-warning-dark' :
                  'bg-danger-light text-danger-dark'
                )}>
                  {vatStatus.ossStatus === 'safe' ? 'On Track' :
                   vatStatus.ossStatus === 'warning' ? 'Warning' : 'Exceeded'}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    €{vatStatus.totalCrossBorderB2C.toLocaleString()}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-primary-600">
                      {vatStatus.ossThresholdPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">utilized</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  of €{EU_VAT_THRESHOLDS.OSS_TRIGGER.toLocaleString()} limit
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(vatStatus.ossThresholdPercentage, 100)}%` }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "h-full rounded-full",
                      vatStatus.ossStatus === 'safe' ? 'bg-success' :
                      vatStatus.ossStatus === 'warning' ? 'bg-warning' : 'bg-danger'
                    )}
                  />
                  <div className="absolute top-0 h-2 w-0.5 bg-gray-400" style={{ left: '72.5%' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>€0</span>
                  <span className="font-medium text-gray-600">72.5% Alert</span>
                  <span>€{EU_VAT_THRESHOLDS.OSS_TRIGGER.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SME Threshold Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    SME VAT Exemption
                  </h3>
                  <p className="text-sm text-gray-600">
                    Total annual EU-wide turnover
                  </p>
                </div>
                <span className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium",
                  vatStatus.smeStatus === 'safe' ? 'bg-success-light text-success-dark' :
                  vatStatus.smeStatus === 'warning' ? 'bg-warning-light text-warning-dark' :
                  'bg-danger-light text-danger-dark'
                )}>
                  {vatStatus.smeStatus === 'safe' ? 'On Track' :
                   vatStatus.smeStatus === 'warning' ? 'Warning' : 'Exceeded'}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    €{vatStatus.totalEUTurnover.toLocaleString()}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-primary-600">
                      {vatStatus.smeThresholdPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">utilized</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  of €{EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP.toLocaleString()} limit
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(vatStatus.smeThresholdPercentage, 100)}%` }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className={cn(
                      "h-full rounded-full",
                      vatStatus.smeStatus === 'safe' ? 'bg-success' :
                      vatStatus.smeStatus === 'warning' ? 'bg-warning' : 'bg-danger'
                    )}
                  />
                  <div className="absolute top-0 h-2 w-0.5 bg-gray-400" style={{ left: '72.5%' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>€0</span>
                  <span className="font-medium text-gray-600">72.5% Alert</span>
                  <span>€{EU_VAT_THRESHOLDS.SME_EXEMPTION_CAP.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span>Run threshold check</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span>View transactions</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span>Generate report</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last updated</span>
                <span className="font-medium text-gray-900">Just now</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Transactions</span>
                <span className="font-medium text-gray-900">4 active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Countries</span>
                <span className="font-medium text-gray-900">27 monitored</span>
              </div>
            </div>
          </motion.div>

          {/* Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-2">Need help?</h3>
            <p className="text-sm text-primary-100 mb-4">
              Our compliance experts are available 24/7
            </p>
            <button className="w-full bg-white text-primary-600 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Contact Support
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
