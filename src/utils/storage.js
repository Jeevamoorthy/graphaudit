/**
 * GraphAudit Data & Session Management
 * Fully anonymous, zero PII, compliant with ethical study guidelines.
 */

const STORAGE_KEY_SESSION = 'graphaudit_session';
const STORAGE_KEY_RESPONSES = 'graphaudit_local_submissions';

// Generate lightweight random ID
export function generateParticipantId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'ga-';
  for (let i = 0; i < 7; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Random condition selection with balanced probability
export function assignCondition() {
  const rand = Math.random();
  if (rand < 0.35) return 'A'; // Flag only
  if (rand < 0.70) return 'B'; // Flag + Explanation
  return 'C';                 // Flag + Explanation + Uncertainty
}

// Get or initialize active session
export function getOrCreateSession() {
  const stored = localStorage.getItem(STORAGE_KEY_SESSION);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // Fallback
    }
  }

  const newSession = {
    participantId: generateParticipantId(),
    condition: assignCondition(),
    startTime: Date.now(),
    consentGiven: false,
    tutorialCompleted: false,
    currentCaseIndex: 0,
    caseResponses: {}, // keyed by caseId
    surveyResponses: null,
    completed: false,
    endTime: null
  };

  saveSession(newSession);
  return newSession;
}

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
}

export function resetSession(preferredCondition = null) {
  const newSession = {
    participantId: generateParticipantId(),
    condition: preferredCondition || assignCondition(),
    startTime: Date.now(),
    consentGiven: false,
    tutorialCompleted: false,
    currentCaseIndex: 0,
    caseResponses: {},
    surveyResponses: null,
    completed: false,
    endTime: null
  };
  saveSession(newSession);
  return newSession;
}

export function recordCaseResponse(caseId, data) {
  const session = getOrCreateSession();
  session.caseResponses[caseId] = {
    ...data,
    submittedAt: Date.now()
  };
  saveSession(session);
  return session;
}

export function recordSurvey(surveyData) {
  const session = getOrCreateSession();
  session.surveyResponses = surveyData;
  session.completed = true;
  session.endTime = Date.now();
  saveSession(session);

  // Store into local archival list
  storeCompletedSubmission(session);

  // Async dispatch to external endpoint if configured
  dispatchToRemoteEndpoint(session);

  return session;
}

function storeCompletedSubmission(session) {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY_RESPONSES) || '[]');
    list.push({
      ...session,
      savedLocallyAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(list));
  } catch (err) {
    console.warn('Failed to archive submission locally', err);
  }
}

export function getAllLocalSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_RESPONSES) || '[]');
  } catch {
    return [];
  }
}

// Export data to CSV
export function exportSubmissionsToCSV(submissions) {
  if (!submissions || submissions.length === 0) return '';
  const rows = [];
  rows.push([
    'participantId',
    'condition',
    'caseId',
    'userVerdict',
    'groundTruthFraud',
    'modelVerdictFlag',
    'modelCorrect',
    'agreedWithModel',
    'agreedWithGroundTruth',
    'timeSeconds',
    'confidenceRating',
    'selectedNodesCount',
    'trustRating1',
    'trustRating2',
    'trustRating3',
    'priorExperience'
  ].join(','));

  submissions.forEach(sub => {
    const s = sub.surveyResponses || {};
    Object.entries(sub.caseResponses || {}).forEach(([caseId, c]) => {
      rows.push([
        sub.participantId,
        sub.condition,
        caseId,
        c.userVerdict ? 'FRAUD' : 'NORMAL',
        c.groundTruthFraud ? 'FRAUD' : 'NORMAL',
        c.modelVerdictFlag ? 'FRAUD' : 'NORMAL',
        c.modelCorrect ? 1 : 0,
        c.agreedWithModel ? 1 : 0,
        c.agreedWithGroundTruth ? 1 : 0,
        (c.durationMs / 1000).toFixed(2),
        c.confidence,
        (c.selectedNodes || []).length,
        s.trustRely || '',
        s.trustFair || '',
        s.trustUnderstand || '',
        s.experienceLevel || ''
      ].join(','));
    });
  });

  return rows.join('\n');
}

// Optional Supabase or webhook dispatch
async function dispatchToRemoteEndpoint(payload) {
  const endpoint = import.meta.env?.VITE_DATA_ENDPOINT;
  if (!endpoint) return;

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.info('Remote data endpoint not reached; data saved locally.');
  }
}
