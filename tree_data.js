const TREE_DATA = {
  "metadata": {
    "version": "1.2.0",
    "description": "DT Daily Reflection Tree - Tension & Structural Integrity Spec",
    "axes": ["locus", "orientation", "radius"]
  },
  "nodes": {
    "START": {
      "id": "START",
      "type": "start",
      "text": "Good evening. Let's look at your day through the lens of PDGMS. Be honest—this is for your growth, not for your lead.",
      "next": "A1_OPEN"
    },
    "A1_OPEN": {
      "id": "A1_OPEN",
      "type": "question",
      "text": "How would you describe the 'structural quality' of your day in one word?",
      "options": [
        { "text": "Productive", "signal": "locus:active" },
        { "text": "Mixed", "signal": "locus:neutral" },
        { "text": "Tough", "signal": "locus:reactive" },
        { "text": "Frustrating", "signal": "locus:victim" }
      ],
      "next": "A1_D1"
    },
    "A1_D1": {
      "id": "A1_D1",
      "type": "decision",
      "logic": "A1_OPEN.answer=Productive|Mixed:A1_Q_TENSION_HIGH;A1_OPEN.answer=Tough|Frustrating:A1_Q_TENSION_LOW"
    },
    "A1_Q_TENSION_HIGH": {
      "id": "A1_Q_TENSION_HIGH",
      "type": "question",
      "text": "Your day was {A1_OPEN.answer}. To achieve this, what did you have to trade off?",
      "options": [
        { "text": "I followed the process strictly, even if it slowed me down.", "next": "A1_R_PROCESS", "signal": "locus:victor_process" },
        { "text": "I bypassed a few minor protocols to ensure delivery.", "next": "A1_R_DELIVERY", "signal": "locus:victor_delivery" },
        { "text": "I didn't have to trade anything; the system worked perfectly.", "next": "A1_R_IDEAL", "signal": "locus:victor_ideal" }
      ]
    },
    "A1_Q_TENSION_LOW": {
      "id": "A1_Q_TENSION_LOW",
      "type": "question",
      "text": "Your day was {A1_OPEN.answer}. Where was the primary leak in your agency?",
      "options": [
        { "text": "I waited for clarity that didn't arrive.", "next": "A1_R_WAIT", "signal": "locus:victim_passive" },
        { "text": "I tried to fix things but hit a structural wall.", "next": "A1_R_WALL", "signal": "locus:victim_active" },
        { "text": "I chose to deprioritize this task because of external pressure.", "next": "A1_R_CHOICE", "signal": "locus:victor_choice" }
      ]
    },
    "A1_R_PROCESS": {
      "id": "A1_R_PROCESS",
      "type": "reflection",
      "text": "Valuing process over speed is a sign of long-term thinking. You are protecting the system's integrity.",
      "next": "BRIDGE_1_2"
    },
    "A1_R_DELIVERY": {
      "id": "A1_R_DELIVERY",
      "type": "reflection",
      "text": "Bypassing protocol is a 'Risk-taker' trait, but it creates technical debt. Ensure you file a reflection to fix the protocol itself.",
      "next": "BRIDGE_1_2"
    },
    "A1_R_IDEAL": {
      "id": "A1_R_IDEAL",
      "type": "reflection",
      "text": "A perfect system is rare. Ensure you aren't ignoring invisible friction that could be improved.",
      "next": "BRIDGE_1_2"
    },
    "A1_R_WAIT": {
      "id": "A1_R_WAIT",
      "type": "reflection",
      "text": "Waiting is the hallmark of the Victim state. In PDGMS, 'no clarity' is a signal to build the spec yourself.",
      "next": "BRIDGE_1_2"
    },
    "A1_R_WALL": {
      "id": "A1_R_WALL",
      "type": "reflection",
      "text": "Hitting a wall is data. Your next Commitment should be to 'engineer' a way through or over that wall.",
      "next": "BRIDGE_1_2"
    },
    "A1_R_CHOICE": {
      "id": "A1_R_CHOICE",
      "type": "reflection",
      "text": "Deciding not to do something is still Agency. You chose your battles—that is a Victor stance.",
      "next": "BRIDGE_1_2"
    },
    "BRIDGE_1_2": {
      "id": "BRIDGE_1_2",
      "type": "bridge",
      "text": "Moving to Orientation. Let's look at the 'Tension' between Excellence and Speed.",
      "next": "A2_OPEN"
    },
    "A2_OPEN": {
      "id": "A2_OPEN",
      "type": "question",
      "text": "When you finished your main task, what was your priority for the hand-off?",
      "options": [
        { "text": "The speed of the hand-off to keep my momentum.", "next": "A2_R_SPEED", "signal": "orient:efficiency" },
        { "text": "The absolute clarity of the spec to ensure zero rework.", "next": "A2_R_CLARITY", "signal": "orient:excellence" },
        { "text": "I didn't think about the hand-off; I just finished.", "next": "A2_R_SELF", "signal": "orient:self" }
      ]
    },
    "A2_R_SPEED": {
      "id": "A2_R_SPEED",
      "type": "reflection",
      "text": "Efficiency is good, but if the next person has to ask questions, you haven't actually saved time.",
      "next": "BRIDGE_2_3"
    },
    "A2_R_CLARITY": {
      "id": "A2_R_CLARITY",
      "type": "reflection",
      "text": "Clarity is the ultimate contribution. You are reducing 'chaos' in the organization.",
      "next": "BRIDGE_2_3"
    },
    "A2_R_SELF": {
      "id": "A2_R_SELF",
      "type": "reflection",
      "text": "A 'finished' task is only 50% of the work. The other 50% is the communication of its state.",
      "next": "BRIDGE_2_3"
    },
    "BRIDGE_2_3": {
      "id": "BRIDGE_2_3",
      "type": "bridge",
      "text": "Finally, the Radius Tension: Your output vs. the Team's survival.",
      "next": "A3_OPEN"
    },
    "A3_OPEN": {
      "id": "A3_OPEN",
      "type": "question",
      "text": "A teammate was struggling today while you were on a roll. What did you do?",
      "options": [
        { "text": "Stayed focused on my high-priority delivery.", "next": "A3_R_FOCUS", "signal": "radius:self_excel" },
        { "text": "Paused my work to help them unblock.", "next": "A3_R_HELP", "signal": "radius:others_help" },
        { "text": "Pointed them to a resource/spec without stopping.", "next": "A3_R_SPEC", "signal": "radius:others_spec" }
      ]
    },
    "A3_R_FOCUS": {
      "id": "A3_R_FOCUS",
      "type": "reflection",
      "text": "Focus is a duty. But a teammate's blocker is a system leak. Is your current ticket more valuable than the leak?",
      "next": "SUMMARY"
    },
    "A3_R_HELP": {
      "id": "A3_R_HELP",
      "type": "reflection",
      "text": "Altruism unblocks the team, but ensure you aren't choosing it to avoid your own difficult tasks.",
      "next": "SUMMARY"
    },
    "A3_R_SPEC": {
      "id": "A3_R_SPEC",
      "type": "reflection",
      "text": "The middle path: Scaling yourself through documentation. This is the most structural response.",
      "next": "SUMMARY"
    },
    "SUMMARY": {
      "id": "SUMMARY",
      "type": "summary",
      "text": "Reflection complete. You've navigated the structural tensions of the day. Every choice is data.",
      "next": "END"
    },
    "END": {
      "id": "END",
      "type": "end",
      "text": "Session closed. See you on the grid tomorrow."
    }
  }
};
