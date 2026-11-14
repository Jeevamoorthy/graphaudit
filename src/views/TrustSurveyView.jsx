import React, { useState } from 'react';
import { Award, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export default function TrustSurveyView({ onCompleteSurvey }) {
  const [trustRely, setTrustRely] = useState(3);
  const [trustFair, setTrustFair] = useState(3);
  const [trustUnderstand, setTrustUnderstand] = useState(3);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompleteSurvey({
      trustRely,
      trustFair,
      trustUnderstand,
      experienceLevel,
      feedback: feedback.trim()
    });
  };

  const scaleLabels = [
    '1 - Strongly Disagree',
    '2 - Disagree',
    '3 - Neutral',
    '4 - Agree',
    '5 - Strongly Agree'
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            Final Step: 60-Second Trust Questionnaire
          </div>
          <h2 className="text-2xl font-bold text-white">Post-Task System Evaluation</h2>
          <p className="text-xs text-slate-400 mt-1">
            Your honest ratings help measure how explanations affect investigator confidence and reliance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
              1. "I would rely on this AI system to support my decisions in high-stakes fraud audits."
            </label>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setTrustRely(val)}
                  className={`py-2 rounded-lg font-medium border transition ${
                    trustRely === val
                      ? 'bg-sky-500 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-bold">{val}</span>
                  <span className="text-[10px] hidden sm:block mt-0.5 opacity-80">
                    {val === 1 ? 'Disagree' : val === 3 ? 'Neutral' : val === 5 ? 'Agree' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
              2. "The model's outputs helped me understand why an account was considered risky."
            </label>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setTrustFair(val)}
                  className={`py-2 rounded-lg font-medium border transition ${
                    trustFair === val
                      ? 'bg-sky-500 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-bold">{val}</span>
                  <span className="text-[10px] hidden sm:block mt-0.5 opacity-80">
                    {val === 1 ? 'Disagree' : val === 3 ? 'Neutral' : val === 5 ? 'Agree' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
              3. "I felt confident overruling the AI whenever its judgment seemed questionable."
            </label>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setTrustUnderstand(val)}
                  className={`py-2 rounded-lg font-medium border transition ${
                    trustUnderstand === val
                      ? 'bg-sky-500 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-bold">{val}</span>
                  <span className="text-[10px] hidden sm:block mt-0.5 opacity-80">
                    {val === 1 ? 'Disagree' : val === 3 ? 'Neutral' : val === 5 ? 'Agree' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Background Experience */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
              4. Prior background with AI, fraud detection, or financial graphs:
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:border-sky-500"
            >
              <option value="none">None / Non-technical</option>
              <option value="beginner">Beginner (curious student / casual AI user)</option>
              <option value="intermediate">Intermediate (taken CS / ML / Finance courses)</option>
              <option value="expert">Expert / Industry Practitioner (AML, Fraud, Data Science)</option>
            </select>
          </div>

          {/* Optional comment */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
              Optional: Any thoughts on what made a case difficult or easy?
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={2}
              placeholder="e.g., Circular loops were obvious, but the merchant refund case was tricky..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
            >
              <span>Complete Study & Reveal Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
