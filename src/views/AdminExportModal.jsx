import React, { useState } from 'react';
import { getAllLocalSubmissions, exportSubmissionsToCSV } from '../utils/storage';
import { Download, Copy, Check, Trash2, X, FileSpreadsheet } from 'lucide-react';

export default function AdminExportModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const submissions = getAllLocalSubmissions();

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `graphaudit_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadCSV = () => {
    const csvContent = exportSubmissionsToCSV(submissions);
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `graphaudit_analysis_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(submissions, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Researcher Data Export</h3>
            <p className="text-xs text-slate-400">Anonymous participant submissions logged in browser</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Locally Recorded Sessions:</span>
          <span className="font-mono font-bold text-sky-400 text-sm">
            {submissions.length} completed
          </span>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownloadCSV}
            className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download CSV for Pandas / R Analysis</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Raw JSON</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 border border-slate-800 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON to Clipboard'}</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
