import React, { useState, useEffect, useRef } from 'react';
import CytoscapeGraph from '../components/CytoscapeGraph';
import RiskBadge from '../components/RiskBadge';
import ProgressBar from '../components/ProgressBar';
import { AlertTriangle, ArrowRight, Star, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function CaseReviewView({
  caseItem,
  caseIndex,
  totalCases,
  condition,
  onSubmitVerdict
}) {
  const [selectedVerdict, setSelectedVerdict] = useState(null); // true (fraud) | false (normal)
  const [confidence, setConfidence] = useState(3);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const startTimeRef = useRef(Date.now());

  // Reset state when new case loads
  useEffect(() => {
    setSelectedVerdict(null);
    setConfidence(3);
    setSelectedNodes([]);
    startTimeRef.current = Date.now();
  }, [caseItem.id]);

  const showExplanations = condition === 'B' || condition === 'C';
  const showUncertainty = condition === 'C';

  const handleToggleNode = (nodeId) => {
    setSelectedNodes(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const handleProceed = () => {
    if (selectedVerdict === null) return;

    const durationMs = Date.now() - startTimeRef.current;
    const isModelFlagFraud = caseItem.modelVerdict.flag.toLowerCase().includes('suspicious') ||
                             caseItem.modelVerdict.flag.toLowerCase().includes('ring');

    const agreedWithModel = selectedVerdict === isModelFlagFraud;
    const agreedWithGroundTruth = selectedVerdict === caseItem.groundTruth.isFraudRing;

    onSubmitVerdict({
      caseId: caseItem.id,
      caseNumber: caseIndex + 1,
      userVerdict: selectedVerdict,
      groundTruthFraud: caseItem.groundTruth.isFraudRing,
      modelVerdictFlag: isModelFlagFraud,
      modelCorrect: caseItem.modelCorrect,
      agreedWithModel,
      agreedWithGroundTruth,
      confidence,
      selectedNodes,
      durationMs
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Progress */}
      <ProgressBar current={caseIndex + 1} total={totalCases} label="Fraud Review Progress" />

      {/* Case Header & AI Recommendation Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Case {caseIndex + 1} of {totalCases}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">
                {caseItem.graph.nodes.length} Accounts, {caseItem.graph.edges.length} Transfers
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">{caseItem.title}</h2>
          </div>

          <RiskBadge
            flag={caseItem.modelVerdict.flag}
            score={caseItem.modelVerdict.riskScore}
            uncertainty={showUncertainty ? caseItem.modelVerdict.uncertainty : null}
          />
        </div>

        {/* Condition B / C Explanation Banner */}
        {showExplanations && (
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Model Rationale (Subgraph Highlight):</span>
            </div>
            <p className="text-slate-300 leading-relaxed pl-6">
              {caseItem.modelVerdict.explanation}
            </p>
          </div>
        )}

        {/* Interactive Cytoscape Graph */}
        <CytoscapeGraph
          graphData={caseItem.graph}
          highlightedNodes={caseItem.modelVerdict.highlightedNodes}
          highlightedEdges={caseItem.modelVerdict.highlightedEdges}
          showExplanations={showExplanations}
          selectedNodes={selectedNodes}
          onToggleNodeSelect={handleToggleNode}
        />

        {/* Participant Decision Form */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-100 mb-1">
              Your Decision: Is there a fraud ring in this transaction network?
            </label>
            <p className="text-xs text-slate-400">
              Consider both the graph visual structure and the model recommendation above.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <button
                type="button"
                onClick={() => setSelectedVerdict(true)}
                className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 border transition ${
                  selectedVerdict === true
                    ? 'bg-rose-600/30 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>Yes, Suspicious Fraud Ring</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVerdict(false)}
                className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 border transition ${
                  selectedVerdict === false
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>No, Looks Normal</span>
              </button>
            </div>
          </div>

          {/* Confidence Rating (1 to 5) */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-200">
                How confident are you in this decision?
              </label>
              <span className="text-xs font-mono font-bold text-sky-400">
                {confidence === 1 && '1 - Very Low (Pure Guess)'}
                {confidence === 2 && '2 - Low'}
                {confidence === 3 && '3 - Moderate'}
                {confidence === 4 && '4 - High'}
                {confidence === 5 && '5 - Very High (Certain)'}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-between max-w-md mx-auto py-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setConfidence(val)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                    confidence === val
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${confidence >= val ? 'fill-current' : ''}`} />
                  <span>{val}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3 flex justify-end">
            <button
              onClick={handleProceed}
              disabled={selectedVerdict === null}
              className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition ${
                selectedVerdict !== null
                  ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{caseIndex + 1 === totalCases ? 'Proceed to Trust Survey' : 'Submit & Next Case'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
