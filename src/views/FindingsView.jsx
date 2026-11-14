import React, { useState } from 'react';
import pilotData from '../data/pilotData.json';
import { BarChart3, TrendingUp, Clock, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function FindingsView() {
  const [selectedTab, setSelectedTab] = useState('reliance'); // reliance | accuracy | time | confidence

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5" />
          Empirical Research Findings (N={pilotData.meta.sampleSize} Participants)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Study Results: Does Showing "Why" Help?
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Comparing human decision quality across <strong>Condition A</strong> (Flag only), <strong>Condition B</strong> (Flag + Graph Explanation), and <strong>Condition C</strong> (Flag + Explanation + Uncertainty cues).
        </p>
      </div>

      {/* Headline Metric Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Headline Finding</span>
            <h2 className="text-xl font-bold text-white mt-0.5">The Explanatory Trap: Explanations Drive Over-Reliance</h2>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            95% Bootstrap Confidence Intervals
          </span>
        </div>

        {/* Headline Chart: Agreement Rate when Model is Right vs Wrong */}
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When the AI was correct, explanations slightly increased agreement (78.6% &rarr; 89.1%). But when the AI made deliberate mistakes, <strong className="text-rose-400">participants with explanations were nearly twice as likely to agree with the false verdict</strong> (37.5% in Condition A vs. <strong className="text-rose-400">68.6% in Condition B</strong>).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Model Correct */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400">When Model is CORRECT (7 Cases)</span>
                <span className="text-slate-400">Agreement Rate</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Condition A (Flag Only)</span>
                    <span className="font-mono font-bold">78.6%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '78.6%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span className="font-semibold text-sky-300">Condition B (Flag + Expl)</span>
                    <span className="font-mono font-bold text-sky-400">89.1%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: '89.1%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Condition C (+ Uncertainty)</span>
                    <span className="font-mono font-bold text-indigo-400">86.7%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '86.7%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model WRONG (The key measurement!) */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border-2 border-rose-500/30 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-400">When Model is WRONG (3 Cases) — Over-Reliance</span>
                <span className="text-rose-400 font-semibold font-mono">Critical Bias</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Condition A (Flag Only)</span>
                    <span className="font-mono font-bold">37.5%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '37.5%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span className="font-bold text-rose-300">Condition B (Flag + Expl)</span>
                    <span className="font-mono font-bold text-rose-400">68.6% (+31.1% over-trust!)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full animate-pulse" style={{ width: '68.6%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span className="text-emerald-300">Condition C (+ Uncertainty Cues)</span>
                    <span className="font-mono font-bold text-emerald-400">44.4% (Mitigated)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '44.4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics: Accuracy, Speed, and Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Overall Accuracy */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <span>Overall Accuracy</span>
          </div>
          <p className="text-xs text-slate-400">
            Explanations alone did not improve overall accuracy due to false trust on error cases.
          </p>

          <div className="space-y-2 text-xs">
            {pilotData.metrics.accuracy.map(m => (
              <div key={m.condition} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">{m.condition}</span>
                  <span className="font-mono text-sky-400">{m.accuracy}%</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  95% CI: [{m.ciLow}%, {m.ciHigh}%]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric 2: Decision Time */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Average Decision Speed</span>
          </div>
          <p className="text-xs text-slate-400">
            Explanations reduced review time significantly from ~34s down to ~24s per case.
          </p>

          <div className="space-y-2 text-xs">
            {pilotData.metrics.averageTimeSeconds.map(m => (
              <div key={m.condition} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">{m.condition}</span>
                  <span className="font-mono text-emerald-400">{m.seconds}s</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  95% CI: [{m.ciLow}s, {m.ciHigh}s]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric 3: Confidence */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Reviewer Confidence (1–5)</span>
          </div>
          <p className="text-xs text-slate-400">
            Visual explanations dramatically boosted reviewer confidence, even when wrong.
          </p>

          <div className="space-y-2 text-xs">
            {pilotData.metrics.confidenceRating.map(m => (
              <div key={m.condition} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">{m.condition}</span>
                  <span className="font-mono text-purple-400">{m.avgRating} / 5</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  95% CI: [{m.ciLow}, {m.ciHigh}]
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qualitative Breakdown of Deliberate Errors */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Error Case Breakdown: Where Reviewers Were Misled</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {pilotData.metrics.errorCaseBreakdown.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200 block">{item.case}</span>
              <div className="space-y-1 text-slate-400">
                <p className="text-slate-300">Arm A: {item.agreementA}</p>
                <p className="text-rose-400 font-semibold">Arm B: {item.agreementB}</p>
                <p className="text-emerald-400">Arm C: {item.agreementC}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
          <Info className="w-4 h-4 text-sky-400" />
          <span>Study Limitations</span>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400 leading-relaxed">
          <li><strong>Participant Demographic:</strong> The cohort was recruited largely from university cohorts and peer networks rather than full-time bank compliance officers.</li>
          <li><strong>Synthetic Ground Truth:</strong> Graphs were generated synthetically using realistic topological rules (Louvain communities, hub-and-spoke, micro-smurfing) rather than real sensitive banking data.</li>
          <li><strong>Sample Size (N=48):</strong> Sufficient to capture large effect sizes in over-reliance, but subtle interaction effects between uncertainty cues require larger follow-up studies (N &gt; 200).</li>
        </ul>
      </div>
    </div>
  );
}
