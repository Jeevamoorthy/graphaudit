import React, { useState } from 'react';
import { Shield, Check, ArrowRight, X } from 'lucide-react';

export default function ConsentView({ onConsentGiven, onDecline }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Informed Consent & Ethics</h2>
            <p className="text-xs text-slate-400">GraphAudit Empirical Human-AI Decision Study</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-semibold text-slate-100 text-sm">Study Purpose</h3>
            <p>
              This academic study investigates human decision-making, speed, and trust calibration when reviewing AI-generated risk evaluations in financial transaction graphs.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100 text-sm">What Participation Involves</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Reviewing 1 practice case and 10 small synthetic transaction graphs (15–30 accounts each).</li>
              <li>Deciding whether you believe a fraud ring exists and rating your confidence (1–5).</li>
              <li>Answering a brief 3-question trust questionnaire at the end.</li>
              <li>Total duration: Approximately <strong>4 to 6 minutes</strong>.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100 text-sm">Anonymity & Privacy</h3>
            <p>
              Participation is <strong>strictly anonymous</strong>. We do not collect your name, email, IP address, device serials, or any personally identifying information. Data is used exclusively for academic research analysis.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100 text-sm">Voluntary Participation</h3>
            <p>
              Your participation is completely voluntary. You may stop or close this browser window at any time without penalty.
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900 border-slate-700 bg-slate-900"
          />
          <span className="text-xs sm:text-sm text-slate-200">
            I confirm that I am at least 18 years old, have read the information above, and consent to participate anonymously in this study.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onDecline}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Decline & Exit
          </button>

          <button
            onClick={onConsentGiven}
            disabled={!agreed}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition ${
              agreed
                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Tutorial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
