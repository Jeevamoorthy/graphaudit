import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, AlertTriangle, ArrowRight, BarChart3, HelpCircle, ShieldCheck } from 'lucide-react';

export default function DebriefView({ session, cases, onViewFindings, onRestart }) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignored if confetti fails
    }
  }, []);

  const responses = session?.caseResponses || {};
  let correctCount = 0;
  let modelAgreementCount = 0;
  let totalTimeMs = 0;

  cases.forEach(c => {
    const r = responses[c.id];
    if (r) {
      if (r.agreedWithGroundTruth) correctCount++;
      if (r.agreedWithModel) modelAgreementCount++;
      totalTimeMs += (r.durationMs || 0);
    }
  });

  const avgTimeSec = cases.length > 0 ? (totalTimeMs / cases.length / 1000).toFixed(1) : 0;
  const accuracyPct = Math.round((correctCount / cases.length) * 100);

  // Analyze the 3 deliberate error cases (Cases 4, 7, 9)
  const errorCases = cases.filter(c => !c.modelCorrect);
  let fellForTrapCount = 0;
  errorCases.forEach(c => {
    const r = responses[c.id];
    if (r && r.agreedWithModel) {
      fellForTrapCount++; // Agreed with the faulty model
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Hero Debrief Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Study Complete • Participant ID: <span className="font-mono text-white">{session?.participantId}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Investigation Complete! Here is Your Debrief.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Thank you for participating! Here is how your decisions aligned with both the AI model and the absolute ground truth.
        </p>

        {/* Participant Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Ground Truth Accuracy</span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {correctCount} <span className="text-lg font-normal text-slate-500">/ {cases.length}</span>
            </div>
            <span className="text-xs text-sky-400 font-semibold">{accuracyPct}% correct</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">AI Agreement Rate</span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {modelAgreementCount} <span className="text-lg font-normal text-slate-500">/ {cases.length}</span>
            </div>
            <span className="text-xs text-indigo-400 font-semibold">{Math.round((modelAgreementCount / cases.length) * 100)}% matched AI</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Avg. Decision Speed</span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {avgTimeSec} <span className="text-lg font-normal text-slate-500">s</span>
            </div>
            <span className="text-xs text-slate-400">per case</span>
          </div>
        </div>
      </div>

      {/* The Research Reveal: Deliberate Errors */}
      <div className="bg-amber-950/20 border-2 border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-200">The Research Reveal: Intentional AI Errors</h2>
            <p className="text-xs text-amber-300/80">Why this study exists & what we tested</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          In real investigations, AI models are never infallible. To test <strong className="text-white">over-reliance</strong>, the AI model in this study was <strong>deliberately wrong on 3 of the 10 cases</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-rose-300 block">Case 4: False Positive</span>
            <p className="text-slate-300 text-[11px]">A college event ticket pool that looked like circular layering. The AI incorrectly cried wolf.</p>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 block">Case 7: False Negative</span>
            <p className="text-slate-300 text-[11px]">A micro-smurfing ring designed under regulatory thresholds. The AI missed it.</p>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 block">Case 9: False Negative</span>
            <p className="text-slate-300 text-[11px]">A multi-day staggered mule relay chain. The AI missed it.</p>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
          <strong className="text-white">Your Reliance on AI Errors:</strong> You agreed with the AI on{' '}
          <span className="text-amber-400 font-bold">{fellForTrapCount} of the 3 flawed cases</span>.
          {fellForTrapCount >= 2 ? (
            <span className="block mt-1 text-slate-400">
              When models present convincing visual explanations, even vigilant reviewers tend to trust the AI's verdict over their own skepticism!
            </span>
          ) : (
            <span className="block mt-1 text-emerald-400">
              Impressive vigilance! You caught the AI's errors and did not blindly accept its explanations.
            </span>
          )}
        </div>
      </div>

      {/* Case-by-Case Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-100 text-sm">Full 10-Case Audit Log</h3>
          <span className="text-xs text-slate-400 font-mono">Condition {session?.condition}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Case</th>
                <th className="py-3 px-4 font-semibold">AI Flag</th>
                <th className="py-3 px-4 font-semibold">AI Correct?</th>
                <th className="py-3 px-4 font-semibold">Your Call</th>
                <th className="py-3 px-4 font-semibold">Ground Truth</th>
                <th className="py-3 px-4 font-semibold">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {cases.map((c) => {
                const r = responses[c.id];
                const userCalledFraud = r?.userVerdict;
                const truthIsFraud = c.groundTruth.isFraudRing;
                const userWasRight = r?.agreedWithGroundTruth;

                return (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-sans font-medium text-slate-200">
                      {c.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className={c.modelVerdict.flag.includes('Suspicious') ? 'text-rose-400' : 'text-emerald-400'}>
                        {c.modelVerdict.flag}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {c.modelCorrect ? (
                        <span className="text-emerald-400 font-semibold">Correct</span>
                      ) : (
                        <span className="text-amber-400 font-bold">Flawed ({c.isDeliberateError === 'false_positive' ? 'False +' : 'False -'})</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {userCalledFraud ? 'Fraud Ring' : 'Normal'}
                    </td>
                    <td className="py-3 px-4">
                      {truthIsFraud ? 'Fraud Ring' : 'Normal'}
                    </td>
                    <td className="py-3 px-4">
                      {userWasRight ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Overruled Truth
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA to Findings */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-900 rounded-2xl border border-slate-800">
        <div>
          <h4 className="font-bold text-white text-sm">Explore Aggregated Study Findings</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare overall accuracy, over-reliance rates, and response latency across Conditions A, B, and C.
          </p>
        </div>
        <button
          onClick={onViewFindings}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Study Findings</span>
        </button>
      </div>
    </div>
  );
}
