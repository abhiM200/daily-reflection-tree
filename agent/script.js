let tree = {};
let currentSignals = {
    locus: null,
    orient: null,
    radius: null
};
let answers = {}; // Store answers for interpolation and logic

function init() {
    // TREE_DATA is loaded from tree_data.js
    if (typeof TREE_DATA !== 'undefined') {
        tree = TREE_DATA.nodes;
        renderNode('START');
    } else {
        document.getElementById('question-text').innerText = "Critical Error: Tree data not found.";
    }
}

function renderNode(nodeId) {
    const node = tree[nodeId];
    if (!node) {
        console.error("Node not found:", nodeId);
        return;
    }

    // Handle Decision Nodes (Silent routing)
    if (node.type === 'decision') {
        const nextNodeId = evaluateDecision(node.logic);
        renderNode(nextNodeId);
        return;
    }

    const display = document.getElementById('node-display');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    // Reset container with animation
    display.classList.remove('fade-in');
    void display.offsetWidth; 
    display.classList.add('fade-in');

    // Handle Text Interpolation
    questionText.innerText = interpolateText(node.text);
    optionsContainer.innerHTML = '';

    if (node.type === 'question') {
        node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt.text;
            btn.onclick = () => {
                answers[nodeId] = { answer: opt.text };
                if (opt.signal) updateSignals(opt.signal);
                renderNode(opt.next || node.next);
            };
            optionsContainer.appendChild(btn);
        });
    } else if (['reflection', 'bridge', 'start', 'summary'].includes(node.type)) {
        const btn = document.createElement('button');
        btn.innerText = node.type === 'start' ? "Begin Reflection →" : "Continue →";
        btn.style.justifyContent = "center";
        btn.onclick = () => renderNode(node.next);
        optionsContainer.appendChild(btn);
    } else if (node.type === 'end') {
        const btn = document.createElement('button');
        btn.innerText = "Restart Reflection";
        btn.style.justifyContent = "center";
        btn.onclick = () => {
            currentSignals = { locus: null, orient: null, radius: null };
            answers = {};
            updateUI();
            renderNode('START');
        };
        optionsContainer.appendChild(btn);
    }
}

function interpolateText(text) {
    return text.replace(/\{(\w+)\.answer\}/g, (match, nodeId) => {
        return answers[nodeId] ? answers[nodeId].answer : match;
    });
}

function evaluateDecision(logic) {
    // Format: "nodeId.answer=val1|val2:targetNode;..."
    const rules = logic.split(';');
    for (let rule of rules) {
        const [condition, target] = rule.split(':');
        const [path, allowedValues] = condition.split('=');
        const [refNodeId, prop] = path.split('.');
        
        const actualValue = answers[refNodeId] ? answers[refNodeId][prop] : null;
        const possibleValues = allowedValues.split('|');

        if (possibleValues.includes(actualValue)) {
            return target;
        }
    }
    return null; 
}

function updateSignals(signalStr) {
    const [axis, value] = signalStr.split(':');
    // Map signal keys to UI keys if necessary
    const keyMap = { 'axis1': 'locus', 'axis2': 'orient', 'axis3': 'radius' };
    const uiKey = keyMap[axis] || axis;
    
    if (uiKey in currentSignals) {
        currentSignals[uiKey] = value;
        updateUI();
    }
}

function updateUI() {
    document.getElementById('locus-val').innerText = currentSignals.locus || '--';
    document.getElementById('orient-val').innerText = currentSignals.orient || '--';
    document.getElementById('radius-val').innerText = currentSignals.radius || '--';
}

window.onload = init;
