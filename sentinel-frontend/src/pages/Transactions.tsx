import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  X,
  AlertTriangle,
  Check,
  Globe,
  Building2,
  User,
} from 'lucide-react';
import { fetchTransactions, createTransaction, deleteTransaction, type Transaction } from '../lib/api';
import { cn } from '../lib/utils';

const EU_COUNTRIES = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
];

const VAT_RATES: Record<string, number> = {
  AT: 20, BE: 21, BG: 20, HR: 25, CY: 19, CZ: 21, DK: 25, EE: 22,
  FI: 24, FR: 20, DE: 19, GR: 24, HU: 27, IE: 23, IT: 22, LV: 21,
  LT: 21, LU: 17, MT: 18, NL: 21, PL: 23, PT: 23, RO: 19, SK: 20,
  SI: 22, ES: 21, SE: 25,
};

interface TransactionFormData {
  date: string;
  amount: string;
  customerCountry: string;
  isB2B: boolean;
  isCrossBorder: boolean;
  vatRate: string;
  description: string;
}

const defaultFormData: TransactionFormData = {
  date: new Date().toISOString().split('T')[0],
  amount: '',
  customerCountry: 'FR',
  isB2B: false,
  isCrossBorder: true,
  vatRate: '20',
  description: '',
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<TransactionFormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      customerCountry: country,
      vatRate: VAT_RATES[country]?.toString() || '20',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createTransaction({
        date: formData.date,
        amount: parseFloat(formData.amount),
        customerCountry: formData.customerCountry,
        isB2B: formData.isB2B,
        isCrossBorder: formData.isCrossBorder,
        vatRate: parseFloat(formData.vatRate),
        description: formData.description || undefined,
      });

      setShowModal(false);
      setFormData(defaultFormData);
      await loadTransactions();
    } catch (err) {
      console.error('Failed to create transaction:', err);
      setError('Failed to create transaction');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setDeleteConfirm(null);
      await loadTransactions();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
      setError('Failed to delete transaction');
    }
  };

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-EU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCountryName = (code: string) => {
    return EU_COUNTRIES.find(c => c.code === code)?.name || code;
  };

  if (loading) {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Transactions</h1>
          <p className="text-lg text-gray-600">Manage your EU cross-border sales</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-danger-light border-l-4 border-danger rounded-r-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-danger mr-3" />
            <p className="text-sm text-danger-dark">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-danger-dark hover:text-danger">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cross-Border</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">VAT Rate</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No transactions yet. Add your first transaction to start tracking.
                  </td>
                </tr>
              ) : (
                transactions.map((txn, index) => (
                  <motion.tr
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(txn.date)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">€{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{getCountryName(txn.customerCountry)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium",
                        txn.isB2B ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                      )}>
                        {txn.isB2B ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {txn.isB2B ? 'B2B' : 'B2C'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
                        txn.isCrossBorder ? "bg-success-light text-success-dark" : "bg-gray-100 text-gray-700"
                      )}>
                        {txn.isCrossBorder ? 'Yes' : 'Domestic'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.vatRate}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                      {txn.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {deleteConfirm === txn.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(txn.id)}
                            className="p-1.5 text-danger hover:bg-danger-light rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(txn.id)}
                          className="p-1.5 text-gray-400 hover:text-danger hover:bg-danger-light rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
            <span>
              Total: €{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Add Transaction</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (EUR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer Country</label>
                  <select
                    value={formData.customerCountry}
                    onChange={e => handleCountryChange(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {EU_COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Customer Type</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isB2B: false })}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 transition-all",
                        !formData.isB2B
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <User className="w-4 h-4" />
                      B2C (Consumer)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isB2B: true })}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 transition-all",
                        formData.isB2B
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Building2 className="w-4 h-4" />
                      B2B (Business)
                    </button>
                  </div>
                </div>

                {/* Cross-Border */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="crossBorder"
                    checked={formData.isCrossBorder}
                    onChange={e => setFormData({ ...formData, isCrossBorder: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="crossBorder" className="text-sm font-medium text-gray-700">
                    Cross-border sale (to another EU country)
                  </label>
                </div>

                {/* VAT Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">VAT Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="50"
                    value={formData.vatRate}
                    onChange={e => setFormData({ ...formData, vatRate: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Standard rate for {getCountryName(formData.customerCountry)}: {VAT_RATES[formData.customerCountry]}%
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (Optional)</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Software license sale"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Adding...' : 'Add Transaction'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
