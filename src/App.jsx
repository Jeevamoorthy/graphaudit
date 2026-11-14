import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingView from './views/LandingView';
import ConsentView from './views/ConsentView';
import TutorialView from './views/TutorialView';
import CaseReviewView from './views/CaseReviewView';
import TrustSurveyView from './views/TrustSurveyView';
import DebriefView from './views/DebriefView';
import FindingsView from './views/FindingsView';
import MethodView from './views/MethodView';
import AdminExportModal from './views/AdminExportModal';

import casesData from './data/cases.json';
import {
  getOrCreateSession,
  saveSession,
  resetSession,
  recordCaseResponse,
  recordSurvey
} from './utils/storage';

export default function App() {
  const [session, setSession] = useState(getOrCreateSession());
  const [currentView, setCurrentView] = useState('landing');
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync state if session already completed
  useEffect(() => {
    if (session.completed) {
      // If user had finished earlier, let them see debrief or findings
    }
  }, []);

  const handleConditionChange = (newCondition) => {
    const updated = resetSession(newCondition);
    setSession(updated);
    setCurrentCaseIndex(0);
    setCurrentView('landing');
  };

  const handleStartStudy = () => {
    setCurrentView('consent');
  };

  const handleConsentGiven = () => {
    const s = { ...session, consentGiven: true };
    saveSession(s);
    setSession(s);
    setCurrentView('tutorial');
  };

  const handleConsentDecline = () => {
    setCurrentView('landing');
  };

  const handleCompleteTutorial = () => {
    const s = { ...session, tutorialCompleted: true };
    saveSession(s);
    setSession(s);
    setCurrentCaseIndex(0);
    setCurrentView('case');
  };

  const handleSubmitCaseVerdict = (verdictPayload) => {
    const updatedSession = recordCaseResponse(verdictPayload.caseId, verdictPayload);
    setSession(updatedSession);

    if (currentCaseIndex + 1 < casesData.cases.length) {
      setCurrentCaseIndex(prev => prev + 1);
    } else {
      // Completed all 10 cases!
      setCurrentView('survey');
    }
  };

  const handleCompleteSurvey = (surveyData) => {
    const updatedSession = recordSurvey(surveyData);
    setSession(updatedSession);
    setCurrentView('debrief');
  };

  const handleRestart = () => {
    const fresh = resetSession(session.condition);
    setSession(fresh);
    setCurrentCaseIndex(0);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        condition={session.condition}
        onConditionChange={handleConditionChange}
        onOpenExport={() => setIsExportOpen(true)}
      />

      <main className="flex-1 pb-16">
        {currentView === 'landing' && (
          <LandingView
            onStart={handleStartStudy}
            onViewFindings={() => setCurrentView('findings')}
            condition={session.condition}
          />
        )}

        {currentView === 'consent' && (
          <ConsentView
            onConsentGiven={handleConsentGiven}
            onDecline={handleConsentDecline}
          />
        )}

        {currentView === 'tutorial' && (
          <TutorialView
            tutorialCase={casesData.tutorialCase}
            condition={session.condition}
            onCompleteTutorial={handleCompleteTutorial}
          />
        )}

        {currentView === 'case' && (
          <CaseReviewView
            caseItem={casesData.cases[currentCaseIndex]}
            caseIndex={currentCaseIndex}
            totalCases={casesData.cases.length}
            condition={session.condition}
            onSubmitVerdict={handleSubmitCaseVerdict}
          />
        )}

        {currentView === 'survey' && (
          <TrustSurveyView
            onCompleteSurvey={handleCompleteSurvey}
          />
        )}

        {currentView === 'debrief' && (
          <DebriefView
            session={session}
            cases={casesData.cases}
            onViewFindings={() => setCurrentView('findings')}
            onRestart={handleRestart}
          />
        )}

        {currentView === 'findings' && (
          <FindingsView />
        )}

        {currentView === 'method' && (
          <MethodView />
        )}
      </main>

      <AdminExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-300">GraphAudit</span>
            <span>&bull;</span>
            <span>AI Fraud Review & Explainability Research</span>
          </div>
          <div>
            <span>Anonymous Human-AI Interaction Evaluation &bull; 100% Zero PII</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
