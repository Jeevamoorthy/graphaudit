import React from 'react';
import { Network, BarChart3, FileText, Download, Shield } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  condition,
  onConditionChange,
  onOpenExport
}) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                Graph<span className="text-sky-400">Audit</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Research Study
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Explanations & Over-reliance in AI Fraud Review
            </p>
          </div>
        </div>

        {/* Center Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              ['landing', 'consent', 'tutorial', 'case', 'survey', 'debrief'].includes(currentView)
                ? 'bg-slate-800/80 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Study
          </button>
          <button
            onClick={() => setCurrentView('findings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              currentView === 'findings'
                ? 'bg-slate-800/80 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Findings
          </button>
          <button
            onClick={() => setCurrentView('method')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              currentView === 'method'
                ? 'bg-slate-800/80 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Method & Hypotheses
          </button>
        </nav>

        {/* Right Tools: Condition selector & Export */}
        <div className="flex items-center gap-2">
          {/* Condition Switcher for Demo/Auditing */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px]">Condition:</span>
            <select
              value={condition}
              onChange={(e) => onConditionChange(e.target.value)}
              className="bg-slate-800 text-sky-400 font-semibold rounded px-1.5 py-0.5 border border-slate-700 text-xs focus:outline-none"
              title="Switch experimental condition"
            >
              <option value="A">Arm A: Flag Only</option>
              <option value="B">Arm B: Flag + Explanation</option>
              <option value="C">Arm C: Flag + Expl + Uncertainty</option>
            </select>
          </div>

          <button
            onClick={onOpenExport}
            title="Export Collected Data"
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition text-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span className="hidden lg:inline text-xs font-medium">Export Data</span>
          </button>
        </div>
      </div>
    </header>
  );
}
