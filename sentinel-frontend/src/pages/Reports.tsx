import { motion } from 'framer-motion';
import { BarChart3, Image as ImageIcon, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuditLog {
  id: string;
  date: Date;
  portal: string;
  action: string;
  status: 'success' | 'pending' | 'failed';
  screenshots: number;
  duration: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    date: new Date('2025-01-15T14:30:00'),
    portal: 'SIPSI (France)',
    action: 'Posted Worker Declaration Submission',
    status: 'success',
    screenshots: 12,
    duration: '3m 42s',
  },
  {
    id: '2',
    date: new Date('2025-01-14T10:15:00'),
    portal: 'OSS Portal (EU)',
    action: 'Quarterly VAT Return Filing',
    status: 'pending',
    screenshots: 8,
    duration: '2m 18s',
  },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center space-x-3">
        <BarChart3 className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Automation Reports</h1>
          <p className="mt-1 text-gray-600">Audit trail of browser automation activities</p>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Audit Trail:</span> Every browser automation action is logged with
          timestamped screenshots. This provides full transparency and evidence for compliance audits.
        </p>
      </div>

      {/* Audit logs */}
      <div className="space-y-4">
        {mockAuditLogs.map((log, index) => {
          const statusConfig = {
            success: {
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              label: 'Completed',
            },
            pending: {
              color: 'text-amber-600',
              bgColor: 'bg-amber-50',
              label: 'Awaiting Approval',
            },
            failed: {
              color: 'text-red-600',
              bgColor: 'bg-red-50',
              label: 'Failed',
            },
          };

          const config = statusConfig[log.status];

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-950 text-lg">{log.action}</h3>
                  <p className="text-sm text-gray-600 mt-1">{log.portal}</p>
                </div>
                <div className={cn('px-3 py-1 rounded-full text-sm font-medium', config.bgColor, config.color)}>
                  {config.label}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Date & Time</p>
                  <p className="text-sm text-slate-950 mt-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{log.date.toLocaleString()}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Duration</p>
                  <p className="text-sm text-slate-950 mt-1">{log.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Screenshots</p>
                  <p className="text-sm text-slate-950 mt-1 flex items-center space-x-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>{log.screenshots} captured</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                  <p className={cn('text-sm mt-1 flex items-center space-x-1', config.color)}>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{config.label}</span>
                  </p>
                </div>
              </div>

              {/* Screenshot preview placeholder */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Screenshot Timeline</p>
                <div className="flex space-x-2 overflow-x-auto">
                  {Array.from({ length: log.screenshots }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-24 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-sm text-primary hover:text-primary-hover font-medium">
                  View Full Audit Trail →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Browser automation info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-950 mb-3">How Browser Automation Works</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium text-slate-950">Data Mapping</p>
              <p className="text-gray-600">Sentinel extracts data from your Document Vault and accounting system (DATEV/Plaid via MCP)</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium text-slate-950">Stealth Navigation</p>
              <p className="text-gray-600">Playwright browser navigates government portals (SIPSI, OSS) using residential proxies and human-like behavior</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium text-slate-950">Screenshot Evidence</p>
              <p className="text-gray-600">Every step is captured: Login → Form Fill → Draft Creation → Review Screen</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
              4
            </div>
            <div>
              <p className="font-medium text-slate-950">Manual Approval</p>
              <p className="text-gray-600">
                <span className="font-semibold text-amber-600">Submission is BLOCKED</span> until you click "Approve & Submit" - full human oversight
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Playwright safety notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Safety First:</span> Playwright automation creates drafts only.
          No submission occurs without your explicit "Click-to-Sign" approval. All credentials are encrypted at rest.
        </p>
      </div>
    </div>
  );
}
