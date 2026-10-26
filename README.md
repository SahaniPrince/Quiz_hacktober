# StudyPath — Minimalist Educational Platform

StudyPath is a focused, distraction-free examination preparation platform built strictly according to professional product design standards.

---

## Strict Design System Implementation

The application adheres 100% to the white, clean, human-designed specification:

### 1. Sage Green & Dusty Blue Color Palette
- **Core Sage Green**: `#3F5E4D` (Brand mark, primary buttons, active filter chips, answered question states)
  - Hover Sage: `#324D3E`
  - Subtle Sage Tint: `#EBF2ED` (Badges, active tab backgrounds)
  - Sage Contour: `#C8D7CE`
- **Core Dusty Blue**: `#4A6B82` (Secondary accent, selected quiz cards, target exam badges, focus indicators)
  - Hover Dusty Blue: `#3C576C`
  - Subtle Dusty Blue Tint: `#EEF4F8` (Chat user containers, selected option fill)
  - Dusty Blue Contour: `#CBD8E2`
- **Canvas & Surface**:
  - Primary Background: `#FFFFFF`
  - Secondary Canvas: `#F6F8F6` (Calm natural off-white)
  - Card Background: `#FFFFFF`
  - Borders & Dividers: `#DFE6E1`
  - Subtle Hover: `#EDF3EF`
- **Typography & Inputs**:
  - Primary Text: `#1C2721` (High contrast pine charcoal)
  - Secondary Text: `#586960` (Muted sage slate)
  - Input Border: `#CBD7CE` (Focus ring: `#4A6B82`)
- **Functional Feedback**:
  - Success: `#26733E` (Foliage green)
  - Error: `#B03A3A` (Terracotta crimson)
  - Warning: `#996215` (Warm amber)

### 2. Typography
- **Font Stack**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Semibold headings, standard-weight body copy with comfortable line-height (1.5–1.6), and muted supporting text.
- Clean hierarchy driven by whitespace rather than decoration.

### 3. Prohibited Elements Excluded
- Zero gradients, glowing borders, or neon accents.
- Zero glassmorphism or floating decorative elements.
- Zero oversized illustrations or animated robot graphics.
- Clean corner radii strictly between 6px and 8px.
- Zero fake metrics or uninformative charts; all statistics reflect genuine student session data.

---

## Implemented Pages & Views

1. **Homepage (`#home`)**: Clean landing interface introducing StudyPath's curriculum coverage, diagnostic approach, and practical value pillars.
2. **Dashboard (`#dashboard`)**: Overview with student greeting, target exam indicator, 4 minimalist metric cards (Quizzes completed, Average score, Highest score, Syllabus coverage), recommended modules, daily streak, and recent logs.
3. **Question Bank (`#question-bank`)**: Verified questions across Mathematics, Physics, Chemistry, Biology, and Computer Science with real-time keyword search, subject pills, difficulty filters, and instant explanation viewers.
4. **Quiz Engine (`#quiz`)**: High-focus, distraction-free examination environment featuring a stopwatch timer, progress bar, question flag drawer, clear option selection states, and jump navigator.
5. **Results Page (`#results`)**: Honest score breakdown, performance percentage, pacing rate, and question-by-question review with clear functional feedback tags and detailed step-by-step solutions.
6. **Progress Dashboard (`#progress`)**: Subject mastery matrix with monochrome progress bars, weak topic diagnostic recommendations, and chronological assessment logs.
7. **AI Study Assistant (`#assistant`)**: Scholarly tutor for conceptual explanations, mathematical proofs, and diagnostic practice questions with ready-to-click prompt chips.
8. **Profile & Target Settings (`#profile`)**: Student information editor, target exam switcher (JEE, NEET, SAT, GRE, GATE, Grade 12 STEM), daily question goal manager, and data reset tools.
9. **Authentication (`#auth`)**: Registration, sign-in, and one-click student demo access.

## Local AI Model Integration (Ollama `gemma3:4b`)

StudyPath is integrated with your local **Ollama** installation using the **`gemma3:4b`** model:

1. **How it Works**:
   - The AI Study Assistant communicates with `gemma3:4b` locally via `http://localhost:11434` (or via `/api/chat` through `server.js`).
   - All AI inference executes entirely on your local machine with complete data privacy and zero cloud dependencies.
   - When active, responses in the chat stream display the `Ollama (gemma3:4b)` badge.

2. **Starting Ollama**:
   Open a terminal and ensure your local model is running:
   ```bash
   ollama run gemma3:4b
   ```
   *(Or run `ollama serve` if running as a background service).*

3. **Status & Diagnostics**:
   - In the **AI Study Assistant** header, a live indicator shows whether `gemma3:4b` is connected.
   - You can click **"Verify Connection"** at any time to test the link.
   - In **Profile Settings**, you can inspect and configure the Ollama host and model name.
   - If Ollama is offline, the platform provides clear instructions and automatically falls back to the verified STEM knowledge base so study sessions are never interrupted.

---

## How to Run

### Method 1: Direct Browser Launch (Zero Dependencies)
Simply double-click `front.html` (or `index.html`) in Windows Explorer, or open:
`file:///C:/Users/Administrator/Desktop/SunBeam%20Hackathon/front.html`

### Method 2: Node Local Server
Run in PowerShell or Command Prompt:
```bash
npm start
```
Then navigate to `http://localhost:3000` in your web browser.

