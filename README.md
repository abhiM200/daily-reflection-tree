# DT Reflection Tool | PDGMS

A deterministic, decision-tree-based reflection system designed for the DT Fellowship recruitment process. This tool measures employee growth along three psychological axes: **Locus of Control**, **Orientation**, and **Radius**.

## 📂 Project Structure

```text
/tree/
  reflection-tree.json   # Master logic and node definitions
  tree-diagram.png       # Visual representation of the reflection path

/agent/
  main.py                # Python CLI version of the reflection engine
  index.html             # Web-based reflection tool (Premium UI)
  style.css              # Glassmorphism styling for the web tool
  script.js              # Core logic for the web-based state machine
  tree_data.js           # Local data source for web runtime
  server.py              # Local Python server for development

/transcripts/
  persona-1.md           # High-Agency 'Victor' walkthrough
  persona-2.md           # Low-Awareness 'Victim' walkthrough

write-up.md              # Detailed design philosophy & implementation notes
README.md                # This file
```

## 🚀 How to Use

### 1. The Web Tool (Premium UI)
To run the high-end web version:
1. Navigate to `/agent/`.
2. Run `python server.py`.
3. Open `http://localhost:8000` in your browser.

### 2. The Python CLI
To run the lightweight terminal version:
1. Navigate to `/agent/`.
2. Run `python main.py`.

## 🧠 Design Philosophy
This project was built following the **Scientific Execution** principle. Instead of using an LLM to "hallucinate" feedback, it uses a **Deterministic JSON Tree** to provide structured, repeatable, and auditable insights.

**Developed by Abhishek**
