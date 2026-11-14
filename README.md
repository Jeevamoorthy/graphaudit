# GraphAudit 🔍
> **"Does showing why help? A study of explanations and over-reliance in AI fraud review."**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jeevamoorthy/graphaudit)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Jeevamoorthy%2Fgraphaudit-181717?style=flat&logo=github)](https://github.com/Jeevamoorthy/graphaudit)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=flat&logo=react)](https://react.dev)
[![Cytoscape](https://img.shields.io/badge/Graph-Cytoscape.js-E65100?style=flat)](https://js.cytoscape.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🌐 Instant 1-Click Launch on Vercel
You can deploy your own instance of GraphAudit in seconds:
👉 **[Click Here to Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Jeevamoorthy/graphaudit)**

---

## 🎯 The Research Question
When people review a model's fraud flags, do explanations make them faster and more accurate, or just more willing to agree with the model—**including when it's wrong?**

---

## 🧪 Experimental Study Design

- **Participants:** Between-subjects randomized trial.
- **Conditions (Between-Subjects):**
  - **Arm A (Flag only):** Model verdict (`Suspicious Ring` or `Looks Normal`) + risk score percentage.
  - **Arm B (Flag + Explanation):** Flag + score + highlighted transaction subgraph (accounts & edges) + one-line plain-English rationale.
  - **Arm C (Flag + Explanation + Uncertainty):** Adds uncertainty indicators on borderline cases.
- **The Core Manipulation (Deliberate Errors):**
  The AI model is intentionally wrong on **3 out of 10 cases**:
  - **1 False Positive (Case 4):** A dense legitimate student festival pool flagged as a circular ring.
  - **2 False Negatives (Cases 7 & 9):** Stealth micro-smurfing and relay chains missed by the model.

---

## 📊 Key Findings from Pilot Cohort ($N=48$)

1. **The Explanatory Trap (Over-Reliance):**
   - On correct cases, explanations raised agreement slightly ($78.6\% \rightarrow 89.1\%$).
   - On **erroneous cases**, participants with explanations were **nearly twice as likely to agree with the false model** ($37.5\%$ in Arm A vs. **$68.6\%$ in Arm B**).
2. **Speed vs. Accuracy:**
   - Explanations reduced review time significantly ($34.2\text{s} \rightarrow 23.8\text{s}$), but did not increase overall ground-truth accuracy.
3. **Subjective Confidence:**
   - Explanations boosted user confidence ($3.12 \rightarrow 4.18 / 5$) even when accepting flawed recommendations.

---

## 🚀 Quickstart & Local Setup

```bash
# Clone the repository
git clone https://github.com/Jeevamoorthy/graphaudit.git
cd graphaudit

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🌐 Deploy to Vercel

```bash
# Deploy with Vercel CLI
npx vercel
```
Or import directly from GitHub on [vercel.com/new](https://vercel.com/new).

---

## 🔒 Ethics & Privacy
- **100% Anonymous:** No sign-in, no cookies, no tracking IDs, zero personally identifiable information (PII).
- **Informed Consent:** Plain-language disclosure prior to task initiation.
- **Full Debrief:** Unmasks model manipulation and displays participant ground-truth accuracy immediately upon completion.
