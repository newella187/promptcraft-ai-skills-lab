const modules = [
  {
    id: 'clear-instructions',
    title: '1. Clear task instructions',
    tag: 'Prompt design',
    summary: 'Turn vague requests into a clear instruction with role, task, context, output and boundaries.',
    bullets: [
      'State the job to be done, not just the topic.',
      'Give relevant context, documents, clause references and intended audience.',
      'Set output rules: format, length, tone, assumptions and exclusions.'
    ],
    example: 'Act as an ISO 14001 auditor. Using only the evidence provided, write a concise audit-style paragraph against clause 6.1.2. Separate facts from assumptions and say where evidence is missing.'
  },
  {
    id: 'reasoning-summary',
    title: '2. Reasoning summaries, not hidden reasoning',
    tag: 'Modern AI language',
    summary: 'Do not ask for private chain-of-thought. Ask for assumptions, checks, concise rationale and final answer.',
    bullets: [
      'Use: “think through the issue, then give me the answer with key checks.”',
      'Ask for uncertainty, missing evidence and confidence limits.',
      'For audits, request evidence trails rather than invisible reasoning.'
    ],
    example: 'Review this process description. Provide: findings, evidence used, assumptions, gaps, and a final audit-ready summary. Do not invent evidence.'
  },
  {
    id: 'verification',
    title: '3. Verification and source checking',
    tag: 'Anti-fabrication control',
    summary: 'Reduce unsupported outputs by forcing the model to identify what is known, unknown and needing verification.',
    bullets: [
      'Use source-bound wording: “only use the supplied text.”',
      'Ask the model to flag weak evidence and missing documents.',
      'For legal, medical, finance, standards and live information, verify externally.'
    ],
    example: 'Create a table with three columns: evidence found, audit implication, further evidence needed. If the evidence is not present, write “not evidenced”.'
  },
  {
    id: 'workflow',
    title: '4. AI workflow design',
    tag: 'Beyond a single prompt',
    summary: 'Modern AI use is less about one magic prompt and more about repeatable workflows with controls.',
    bullets: [
      'Break the job into stages: extract, classify, analyse, draft, review.',
      'Use checklists, acceptance criteria and a final human review step.',
      'Keep reusable templates for common audit tasks.'
    ],
    example: 'Step 1 extract facts. Step 2 map facts to ISO clauses. Step 3 identify gaps. Step 4 draft a client-ready paragraph. Step 5 list checks before issue.'
  },
  {
    id: 'gpts-agents',
    title: '5. GPTs, agents and tools',
    tag: 'Current terminology',
    summary: 'Teach the difference between a chat assistant, a Custom GPT and an agent that can use tools or run a workflow.',
    bullets: [
      'Model: the AI engine producing the response.',
      'Custom GPT: a configured assistant with instructions and knowledge.',
      'Agent: a system that can plan, use tools and complete multi-step tasks under control.'
    ],
    example: 'For audit support, use a Custom GPT for clause guidance and an agent-style workflow for document review, evidence extraction and report drafting.'
  },
  {
    id: 'safe-use',
    title: '6. Safe and professional use',
    tag: 'Governance',
    summary: 'Good prompting includes confidentiality, data protection, bias checks and human accountability.',
    bullets: [
      'Do not paste confidential, personal or client-sensitive data unless approved.',
      'Redact names, addresses, payroll data, health information and contract details where possible.',
      'AI supports professional judgement; it does not replace it.'
    ],
    example: 'Before using AI, classify the data, redact unnecessary identifiers, define the permitted use, and record the human review decision.'
  }
];

const terminology = [
  ['Prompt engineering', 'Prompt design / instruction design'],
  ['Chain-of-thought', 'Reasoning summary / concise rationale / key checks'],
  ['Hallucination', 'Unsupported or fabricated output'],
  ['AI prompt', 'Task instruction'],
  ['Prompt template', 'Reusable workflow instruction'],
  ['One-shot answer', 'Draft output requiring review'],
  ['GPT', 'Model, Custom GPT or agent depending on use']
];

const fields = {
  role: 'Act as an experienced UK ISO auditor.',
  task: 'Create an audit-ready summary from the evidence provided.',
  context: 'Management system: ISO 9001 / ISO 14001 / ISO 45001. Audience: certification audit report reader.',
  constraints: 'Use only the supplied evidence. Do not invent facts. Separate evidence, assumptions and gaps.',
  output: 'Provide concise paragraphs plus a short evidence/gap table.',
  checks: 'Before the final answer, check for unsupported claims, missing clause evidence and unclear wording.'
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildPrompt() {
  return [
    `Role: ${fields.role}`,
    `Task: ${fields.task}`,
    `Context: ${fields.context}`,
    `Constraints: ${fields.constraints}`,
    `Output required: ${fields.output}`,
    `Quality checks: ${fields.checks}`
  ].join('\n\n');
}

function render(activeId = modules[0].id) {
  const currentModule = modules.find((item) => item.id === activeId) || modules[0];
  const moduleButtons = modules.map((module) => `
    <button class="module-card ${module.id === activeId ? 'module-card--active' : ''}" data-module="${module.id}" type="button">
      <span>${escapeHtml(module.tag)}</span>
      <strong>${escapeHtml(module.title)}</strong>
      <small>${escapeHtml(module.summary)}</small>
    </button>
  `).join('');

  const termRows = terminology.map(([oldTerm, newTerm]) => `
    <tr><td>${escapeHtml(oldTerm)}</td><td>${escapeHtml(newTerm)}</td></tr>
  `).join('');

  const fieldMarkup = [
    ['role', 'Role'], ['task', 'Task'], ['context', 'Context'],
    ['constraints', 'Constraints'], ['output', 'Output required'], ['checks', 'Quality checks']
  ].map(([key, label]) => `
    <label>${label}<textarea data-field="${key}">${escapeHtml(fields[key])}</textarea></label>
  `).join('');

  document.getElementById('root').innerHTML = `
    <main>
      <section class="hero">
        <div class="hero__content">
          <p class="eyebrow">PromptCraft v2</p>
          <h1>AI Skills Lab</h1>
          <p class="hero__text">A practical training app for clear instructions, safer AI use and audit-ready workflows. Updated to avoid outdated chain-of-thought language and unsupported accuracy claims.</p>
          <div class="hero__actions">
            <a href="#builder" class="button button--primary">Build a prompt</a>
            <a href="#modules" class="button button--ghost">View modules</a>
          </div>
        </div>
        <div class="hero__panel" aria-label="Key principles">
          <span>Intent</span><span>Context</span><span>Constraints</span><span>Sources</span><span>Checks</span><span>Human review</span>
        </div>
      </section>

      <section class="notice"><strong>Release note:</strong> this version removes Perplexity preview code, avoids hidden reasoning requests, and reframes prompt training as controlled workflow design.</section>

      <section id="modules" class="section">
        <div class="section__header"><p class="eyebrow">Learning modules</p><h2>Teach the method, not magic words</h2></div>
        <div class="module-grid">
          <div class="module-list" role="list" aria-label="Training modules">${moduleButtons}</div>
          <article class="module-detail">
            <p class="tag">${escapeHtml(currentModule.tag)}</p>
            <h3>${escapeHtml(currentModule.title)}</h3>
            <p>${escapeHtml(currentModule.summary)}</p>
            <ul>${currentModule.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>
            <div class="example"><strong>Example instruction</strong><p>${escapeHtml(currentModule.example)}</p></div>
          </article>
        </div>
      </section>

      <section class="section split">
        <div><p class="eyebrow">Terminology update</p><h2>Use language that still works in 2026</h2><p>Older prompt-training material often tells users to ask for chain-of-thought or promises neat accuracy percentages. That is risky. This version teaches visible checks, evidence control and accountable outputs.</p></div>
        <div class="table-wrap"><table><thead><tr><th>Old wording</th><th>Better wording</th></tr></thead><tbody>${termRows}</tbody></table></div>
      </section>

      <section id="builder" class="section builder">
        <div class="section__header"><p class="eyebrow">Prompt builder</p><h2>Build a controlled audit prompt</h2></div>
        <div class="builder-grid">
          <form class="builder-form">${fieldMarkup}</form>
          <aside class="prompt-output">
            <div class="prompt-output__header"><h3>Generated prompt</h3><div><button type="button" class="button button--small" id="copyPrompt">Copy</button><button type="button" class="button button--small button--ghost" id="downloadPrompt">Download</button></div></div>
            <pre id="promptPreview">${escapeHtml(buildPrompt())}</pre>
          </aside>
        </div>
      </section>

      <section class="section cards">
        <article><h3>For ISO auditors</h3><p>Use AI to structure evidence, draft plain-English findings and identify missing records. Keep professional judgement with the auditor. No robot gets the signing pen.</p></article>
        <article><h3>For managers</h3><p>Use repeatable prompts for meeting minutes, objectives, risks, actions and management review inputs.</p></article>
        <article><h3>For safe deployment</h3><p>Define what data may be used, what needs approval, and where human review is mandatory.</p></article>
      </section>

      <footer><strong>PromptCraft — AI Skills Lab</strong><span>Designed for practical AI training, audit support and responsible workflow design.</span></footer>
    </main>`;

  document.querySelectorAll('[data-module]').forEach((button) => {
    button.addEventListener('click', () => render(button.dataset.module));
  });

  document.querySelectorAll('[data-field]').forEach((textarea) => {
    textarea.addEventListener('input', (event) => {
      fields[event.target.dataset.field] = event.target.value;
      document.getElementById('promptPreview').textContent = buildPrompt();
    });
  });

  document.getElementById('copyPrompt').addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(buildPrompt());
    event.target.textContent = 'Copied';
    setTimeout(() => { event.target.textContent = 'Copy'; }, 1600);
  });

  document.getElementById('downloadPrompt').addEventListener('click', () => {
    const blob = new Blob([buildPrompt()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'promptcraft-audit-prompt.txt';
    link.click();
    URL.revokeObjectURL(url);
  });
}

render();
