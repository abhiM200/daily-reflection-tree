# DT Fellowship Assignment: Write-up
**Subject:** Deterministic Reflection Tree Design & Implementation
**Developer:** Abhishek

## 1. Approach & Philosophy
The core challenge was to build a reflection tool that wasn't just a survey, but a **Diagnostic Engine**. I approached this by aligning with PDGMS principles:
- **Atomic Data**: Every user choice is mapped to a specific "signal" (e.g., `locus:victor_process`).
- **Tension-Based Questioning**: I avoided "obvious" correct answers. Instead, I created "Tension Nodes" where users must choose between two competing "goods" (e.g., Speed vs. Quality).
- **Deterministic Routing**: Using a JSON-based state machine ensured the system is auditable and repeatable—critical for scientific execution.

## 2. Controlling AI Hallucination
To ensure the system remained rigorous and non-hallucinatory:
- **Zero Runtime LLM**: I moved the intelligence into a **static JSON tree**. The logic is hard-coded, meaning the AI cannot "drift" or invent advice during a session.
- **Predefined Options**: No free-text input was allowed. This constrained the user and the system to a known ontology, preventing subjective interpretation.

## 3. Human-AI Collaboration & Disagreements
During development, the AI initially proposed "motivational" responses (e.g., "Great job today!"). I disagreed with this approach, as it contradicts the DT value of **Rigor over Encouragement**. 
- **The Pivot**: I forced the AI to rewrite all reflection nodes to be **analytical**. Instead of praise, the system now provides **Structural Insights** (e.g., *"Valuing process over speed protects the system's integrity"*).

## 4. Alignment with Guidelines
- **Premium Aesthetics**: The web interface uses glassmorphism and animated backgrounds to create a "wow" factor, as requested in the design guidelines.
- **Scientific Context**: The tree is built specifically to extract data on Locus, Orientation, and Radius, providing a qualitative map of an employee's daily operations.

## 5. Negative Prompting
I used the following negative constraints:
- **NO** open-ended questions.
- **NO** generic motivational fluff.
- **NO** randomness in logic.
- **NO** moralizing tone.

This ensured the final deliverable was a tool for builders, not a standard HR survey.
