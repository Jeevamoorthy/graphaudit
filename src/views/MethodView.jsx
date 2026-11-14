import React from 'react';
import { FileText, Cpu, GitCommit, CheckSquare, Layers, ShieldCheck, AlertCircle } from 'lucide-react';

export default function MethodView() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          Pre-Registration & Experimental Protocol
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Methodology & Study Design
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Full documentation of the experimental conditions, synthetic graph generation rules, model architecture, and pre-registered hypotheses for the GraphAudit study.
        </p>
      </div>

      {/* 1. Pre-Registered Hypotheses */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <CheckSquare className="w-5 h-5 text-sky-400" />
          <h2 className="text-lg font-bold text-white">1. Pre-Registered Hypotheses</h2>
        </div>
        <p className="text-xs text-slate-400">
          Formulated prior to data collection to guarantee academic rigor and prevent p-hacking:
        </p>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="font-bold text-sky-400 block mb-1">Hypothesis 1 (H1 — Over-Reliance):</span>
            <p className="text-slate-300 leading-relaxed">
              Explanations significantly increase human agreement with the AI model on cases where the model is <em>factually wrong</em> (p &lt; 0.05).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="font-bold text-sky-400 block mb-1">Hypothesis 2 (H2 — Efficiency):</span>
            <p className="text-slate-300 leading-relaxed">
              Explanations significantly reduce average time per review compared to flag-only presentations (p &lt; 0.01).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="font-bold text-sky-400 block mb-1">Hypothesis 3 (H3 — Confidence Distortion):</span>
            <p className="text-slate-300 leading-relaxed">
              Visual subgraph explanations raise participant subjective confidence scores to a greater degree than they raise actual decision accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* 2. System Architecture Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">2. Study Architecture</h2>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-3 text-slate-300">
          <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-sky-300 font-bold">
            [1. Synthetic Transaction Generator (Python / NetworkX)]
            <div className="text-[11px] font-normal text-slate-400 mt-1">
              &bull; 2,000 baseline nodes &bull; Power-law degrees &bull; Planted mule cycles, fan-in hubs, and micro-smurfing
            </div>
          </div>
          <div className="text-center text-slate-500 font-bold">&darr;</div>
          <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-indigo-300 font-bold">
            [2. Graph Neural Network — MuleNet (GraphSAGE + Louvain Communities)]
            <div className="text-[11px] font-normal text-slate-400 mt-1">
              &bull; GNN node embeddings + edge importance &bull; Subgraph extraction for visual explanations
            </div>
          </div>
          <div className="text-center text-slate-500 font-bold">&darr;</div>
          <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-amber-300 font-bold">
            [3. Case Curation (10 Evaluated Networks)]
            <div className="text-[11px] font-normal text-slate-400 mt-1">
              &bull; 7 Model-Correct cases &bull; 1 Deliberate False Positive (dense festival pool) &bull; 2 Deliberate False Negatives (stealth smurfing & relay chain)
            </div>
          </div>
          <div className="text-center text-slate-500 font-bold">&darr;</div>
          <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-emerald-300 font-bold">
            [4. Random Between-Subjects Arms & Response Logging]
            <div className="text-[11px] font-normal text-slate-400 mt-1">
              &bull; Arm A: Flag Only &bull; Arm B: Flag + Explanation &bull; Arm C: Flag + Explanation + Uncertainty
            </div>
          </div>
        </div>
      </div>

      {/* 3. Data Generation & Error Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">3. Data Generation & Error Selection</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Rather than fabricating arbitrary errors, the 3 flawed cases were drawn from real failure modes of Graph Neural Networks in fraud detection:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300 text-xs">
            <li>
              <strong className="text-white">False Positive (Case 4):</strong> GraphSAGE often conflates high clique density with circular layering. Legitimate burst events (e.g., student festival ticket aggregation) trigger false alarms.
            </li>
            <li>
              <strong className="text-white">False Negative (Case 7):</strong> When fraudsters perform micro-smurfing (&lt; $1,000) across multiple days, graph edge weight features attenuate, causing the GNN to classify the pattern as background noise.
            </li>
            <li>
              <strong className="text-white">False Negative (Case 9):</strong> Staggered relay chains without cyclic returns evade standard motif detection.
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Exclusion Rules & Data Quality */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">4. Exclusion Criteria</h2>
        </div>
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>Submissions are automatically excluded from the final analysis if:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Total time spent across all 10 cases is under <strong>60 seconds</strong> (speed-clicking / bot behavior).</li>
            <li>Failure of the obvious attention-check case (Case 10).</li>
            <li>Session left incomplete before reaching the survey.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
