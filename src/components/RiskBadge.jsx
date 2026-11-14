import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, HelpCircle } from 'lucide-react';

export default function RiskBadge({ flag, score, uncertainty = null, size = 'md' }) {
  const isSuspicious = flag.toLowerCase().includes('suspicious') || flag.toLowerCase().includes('ring');

  const containerClasses = isSuspicious
    ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';

  const iconClass = isSuspicious ? 'text-rose-400' : 'text-emerald-400';

  return (
    <div className="flex flex-col gap-1.5">
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border font-medium ${containerClasses}`}>
        {isSuspicious ? (
          <ShieldAlert className={`w-5 h-5 ${iconClass} flex-shrink-0 animate-pulse`} />
        ) : (
          <CheckCircle className={`w-5 h-5 ${iconClass} flex-shrink-0`} />
        )}
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm tracking-wide">{flag}</span>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60">
            Risk: <span className={isSuspicious ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{score}%</span>
          </span>
        </div>
      </div>

      {uncertainty && (
        <div className="flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/30">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>{uncertainty}</span>
        </div>
      )}
    </div>
  );
}
