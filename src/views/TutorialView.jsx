import React, { useState } from 'react';
import CytoscapeGraph from '../components/CytoscapeGraph';
import RiskBadge from '../components/RiskBadge';
import { Lightbulb, ArrowRight, CheckCircle2, AlertTriangle, Layers, Shuffle } from 'lucide-react';

export default function TutorialView({ tutorialCase, condition, onCompleteTutorial }) {
  const [userVote, setUserVote] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const showExplanations = condition === 'B' || condition === 'C';

  const handleToggleNode = (nodeId) => {
    setSelectedNodes(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const handleTestVote = (vote) => {
    setUserVote(vote);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Tutorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Lightbulb className="w-3.5 h-3.5" />
          Orientation & Practice Case
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          How to Spot a Money Mule Ring
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Fraud rings recruit or compromise intermediary accounts (mules) to launder stolen money before banks can freeze them. Take 60 seconds to review these common patterns before beginning.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <Layers className="w-4 h-4" />
            <span>1. Funnel / Fan-In Hub</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Multiple new accounts receive identical structured deposits and funnel them rapidly into a single central node within hours.
          </p>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Shuffle className="w-4 h-4" />
            <span>2. Circular Layering</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Funds hop in closed loops (A &rarr; B &rarr; C &rarr; A) with minimal dwell time to confuse tracking algorithms.
          </p>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Legitimate Groups</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Colleges, family expenses, and payrolls also form clusters—but involve older accounts, natural payment rhythms, and normal balances.
          </p>
        </div>
      </div>

      {/* Interactive Practice Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-sky-400 font-bold tracking-wider">Practice Graph</span>
            <h2 className="text-lg font-bold text-white mt-0.5">{tutorialCase.title}</h2>
          </div>

          <RiskBadge
            flag={tutorialCase.modelVerdict.flag}
            score={tutorialCase.modelVerdict.riskScore}
            uncertainty={condition === 'C' ? tutorialCase.modelVerdict.uncertainty : null}
          />
        </div>

        {/* Condition Explanation Banner (if Arm B or C) */}
        {showExplanations && (
          <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-xl text-xs text-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-rose-300">AI Explanation:</span>{' '}
              {tutorialCase.modelVerdict.explanation}
              <div className="text-[11px] text-slate-400 mt-1">
                (Suspected accounts and transaction flows are highlighted in red on the graph).
              </div>
            </div>
          </div>
        )}

        {/* Graph */}
        <CytoscapeGraph
          graphData={tutorialCase.graph}
          highlightedNodes={tutorialCase.modelVerdict.highlightedNodes}
          highlightedEdges={tutorialCase.modelVerdict.highlightedEdges}
          showExplanations={showExplanations}
          selectedNodes={selectedNodes}
          onToggleNodeSelect={handleToggleNode}
        />

        {/* Try voting */}
        {!showFeedback ? (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-100">Test Your Call:</p>
              <p className="text-xs text-slate-400">Based on the network above, do you believe this is a fraud ring?</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleTestVote(true)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition"
              >
                Yes, Fraud Ring
              </button>
              <button
                onClick={() => handleTestVote(false)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
              >
                No, Looks Normal
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-950/90 rounded-xl border border-sky-500/30 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-sky-400" />
              <span>Tutorial Feedback: Ground Truth is a FRAUD RING</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tutorialCase.groundTruth.explanation}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={onCompleteTutorial}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <span>Start Actual 10 Study Cases</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
