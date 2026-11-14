import React from 'react';
import { Play, ArrowRight, ShieldCheck, Clock, Award, BarChart3, HelpCircle } from 'lucide-react';

export default function LandingView({ onStart, onViewFindings, condition }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          5-Minute AI Investigation Research Study
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Seeing Is Believing?
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200">
            A Study of Explanations in AI Fraud Review
          </span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          When people review an AI's financial fraud flags, do visual explanations make them faster and more accurate, or simply more willing to agree with the model—even when it's wrong?
        </p>

        {/* Primary CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-white" />
            Take Part in the Study (5 Mins)
          </button>

          <button
            onClick={onViewFindings}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-base border border-slate-800 flex items-center justify-center gap-2 transition"
          >
            <BarChart3 className="w-5 h-5 text-sky-400" />
            View Current Findings
          </button>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">Under 6 Minutes</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              1 brief tutorial + 10 quick graph cases. Simple yes/no choices and confidence ratings.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">100% Anonymous</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              No sign-in, no emails, no names, no cookies. Only anonymous decision metrics are recorded.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">Instant Score & Debrief</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              See the ground truth answers right after you finish and discover whether you outsmarted the AI.
            </p>
          </div>
        </div>
      </div>

      {/* Study Context Card */}
      <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>What You Will Do</span>
          </h2>
          <span className="text-xs text-slate-400">
            Assigned to: <strong className="text-sky-400 font-mono">Condition {condition}</strong>
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          You will act as an audit officer inspecting money transfers between bank accounts. An AI system (<span className="text-sky-300 font-medium">MuleNet GNN</span>) will flag whether it believes a suspicious money mule ring is operating.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Your job is to inspect the visual transaction network, evaluate the AI recommendation, and make the final call: <strong className="text-white">Fraud Ring</strong> or <strong className="text-white">Normal Activity</strong>.
        </p>
      </div>
    </div>
  );
}
