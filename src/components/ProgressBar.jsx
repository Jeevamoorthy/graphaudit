import React from 'react';

export default function ProgressBar({ current, total, label = 'Study Progress' }) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full bg-slate-900/80 p-3 rounded-xl border border-slate-800 shadow-sm">
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="font-medium text-slate-400">{label}</span>
        <span className="font-mono font-semibold text-sky-400">
          Case {current} of {total} <span className="text-slate-500">({percentage}%)</span>
        </span>
      </div>
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
