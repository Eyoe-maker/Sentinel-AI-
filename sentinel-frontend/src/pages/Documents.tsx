import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  X,
  Trash2,
  Check,
  AlertTriangle,
  Globe,
  Scan,
  Loader2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchDocuments, uploadDocument, deleteDocument, processDocumentOCR, type Document } from '../lib/api';

const EU_COUNTRIES = [
  { code: 'AT', name: 'Austria' }, { code: 'BE', name: 'Belgium' }, { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' }, { code: 'CY', name: 'Cyprus' }, { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' }, { code: 'EE', name: 'Estonia' }, { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' }, { code: 'DE', name: 'Germany' }, { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' }, { code: 'IE', name: 'Ireland' }, { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' }, { code: 'LT', name: 'Lithuania' }, { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' }, { code: 'NL', name: 'Netherlands' }, { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' }, { code: 'RO', name: 'Romania' }, { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' }, { code: 'ES', name: 'Spain' }, { code: 'SE', name: 'Sweden' },
];

const DOCUMENT_CATEGORIES = [
  'A1 Certificate',
  'Posted Worker Declaration',
  'VAT Registration',
  'Invoice',
  'Contract',
  'Other',
];

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'A1 Certificate',
    country: 'FR',
    expiryDate: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingOCR, setProcessingOCR] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await fetchDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = selectedCategory === 'all'
    ? documents
    : documents.filter(doc => doc.category === selectedCategory);

  const statusConfig = {
    verified: {
      icon: CheckCircle2,
      color: 'text-success-dark',
      bgColor: 'bg-success-light',
      borderColor: 'border-success',
      label: 'Verified',
    },
    pending: {
      icon: Clock,
      color: 'text-warning-dark',
      bgColor: 'bg-warning-light',
      borderColor: 'border-warning',
      label: 'Pending Review',
    },
    expired: {
      icon: AlertCircle,
      color: 'text-danger-dark',
      bgColor: 'bg-danger-light',
      borderColor: 'border-danger',
      label: 'Expired',
    },
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadForm(prev => ({
      ...prev,
      name: file.name.replace(/\.[^/.]+$/, ''),
    }));
    setShowUploadModal(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      await uploadDocument(selectedFile, {
        name: uploadForm.name,
        category: uploadForm.category,
        country: uploadForm.country,
        expiryDate: uploadForm.expiryDate || undefined,
      });
      setShowUploadModal(false);
      setSelectedFile(null);
      setUploadForm({ name: '', category: 'A1 Certificate', country: 'FR', expiryDate: '' });
      await loadDocuments();
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      setDeleteConfirm(null);
      await loadDocuments();
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete document');
    }
  };

  const handleOCR = async (id: string) => {
    setProcessingOCR(id);
    try {
      await processDocumentOCR(id);
      await loadDocuments();
    } catch (err) {
      console.error('OCR failed:', err);
      setError('Failed to process document with OCR');
    } finally {
      setProcessingOCR(null);
    }
  };

  const getCountryName = (code: string) => {
    return EU_COUNTRIES.find(c => c.code === code)?.name || code;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-EU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDocumentUrl = (doc: Document) => {
    if (!doc.storageUrl) return null;
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001';
    return `${baseUrl}${doc.storageUrl}`;
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
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Document Vault</h1>
          <p className="text-lg text-gray-600">Manage compliance documents with automated OCR extraction</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
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

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all",
          isDragging
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
        )}
      >
        <Upload className={cn("w-12 h-12 mx-auto mb-4", isDragging ? "text-primary-500" : "text-gray-400")} />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isDragging ? 'Drop file here' : 'Drop files here or click to upload'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Supported formats: PDF, PNG, JPG, WebP (max 10MB)
        </p>
        <p className="text-xs text-gray-500">
          OCR extraction will automatically detect: Worker names, Certificate IDs, Expiry dates
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="flex items-center space-x-2 flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        {['all', ...DOCUMENT_CATEGORIES].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category === 'all' ? 'All Documents' : category}
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600">Upload your first compliance document to get started</p>
          </div>
        ) : (
          filteredDocuments.map((doc, index) => {
            const config = statusConfig[doc.status];
            const Icon = config.icon;
            const docUrl = getDocumentUrl(doc);

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-gray-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Globe className="w-3 h-3" />
                          {getCountryName(doc.country)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium text-primary-600">{doc.category}</span>
                        <span>Uploaded {formatDate(doc.uploadDate)}</span>
                        {doc.expiryDate && (
                          <span className={cn(
                            new Date(doc.expiryDate) < new Date() ? 'text-danger' : ''
                          )}>
                            Expires {formatDate(doc.expiryDate)}
                          </span>
                        )}
                      </div>

                      {/* Extracted data */}
                      {doc.extractedData && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                          <p className="font-medium text-blue-900 mb-2">Extracted Information:</p>
                          <pre className="text-xs text-blue-800 overflow-auto">
                            {typeof doc.extractedData === 'string'
                              ? doc.extractedData
                              : JSON.stringify(doc.extractedData, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={cn('flex items-center space-x-2 px-3 py-1 rounded-full', config.bgColor)}>
                      <Icon className={cn('w-4 h-4', config.color)} />
                      <span className={cn('text-sm font-medium', config.color)}>{config.label}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* OCR Button */}
                      {doc.status === 'pending' && (
                        <button
                          onClick={() => handleOCR(doc.id)}
                          disabled={processingOCR === doc.id}
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            processingOCR === doc.id
                              ? "bg-primary-100 text-primary-600"
                              : "hover:bg-primary-50 text-primary-600 hover:text-primary-700"
                          )}
                          title="Extract text with OCR"
                        >
                          {processingOCR === doc.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Scan className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      {docUrl && (
                        <>
                          <a
                            href={docUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View document"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </a>
                          <a
                            href={docUrl}
                            download={doc.name}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </a>
                        </>
                      )}
                      {deleteConfirm === doc.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 text-danger hover:bg-danger-light rounded-lg"
                            title="Confirm delete"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(doc.id)}
                          className="p-2 text-gray-400 hover:text-danger hover:bg-danger-light rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleUploadSubmit} className="p-6 space-y-5">
                {/* Selected file */}
                {selectedFile && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-8 h-8 text-primary-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}

                {/* Document name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Name</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {DOCUMENT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <select
                    value={uploadForm.country}
                    onChange={e => setUploadForm({ ...uploadForm, country: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {EU_COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={uploadForm.expiryDate}
                    onChange={e => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="flex-1 py-2.5 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
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
