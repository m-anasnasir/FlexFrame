/**
 * app.js — Main application orchestrator for FlexFrame Pro
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── State ──────────────────────────────────────────────────────────── */
  let activeTab = 'studio';
  let selectedCat = 'all';

  /* ── Init code editor ───────────────────────────────────────────────── */
  const editorContainer = document.getElementById('editorContainer');
  if (editorContainer) window.codeEditor.init(editorContainer);

  /* ── Populate device select ─────────────────────────────────────────── */
  function buildDeviceSelect(cat = 'all') {
    const sel = document.getElementById('deviceSelect');
    if (!sel) return;
    sel.innerHTML = '';
    const devices = cat === 'all'
      ? window.DEVICE_PRESETS
      : window.DEVICE_PRESETS.filter(d => d.category === cat);

    let lastCat = null;
    devices.forEach(d => {
      if (d.category !== lastCat) {
        lastCat = d.category;
        const g = document.createElement('optgroup');
        g.label = d.category.toUpperCase();
        sel.appendChild(g);
      }
      const o = document.createElement('option');
      o.value = d.id;
      o.textContent = `${d.icon} ${d.name} (${d.width}×${d.height})`;
      if (d.id === window.deviceManager.currentDevice.id) o.selected = true;
      sel.lastChild.appendChild(o);
    });

    // If current device not in filtered list, switch to first
    if (devices.length > 0 && !devices.find(d => d.id === window.deviceManager.currentDevice.id)) {
      window.deviceManager.setDevice(devices[0].id);
    }
  }
  buildDeviceSelect();

  /* ── Tab navigation ─────────────────────────────────────────────────── */
  document.querySelectorAll('.tab-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.tab-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
    if (tabId === 'audit' || tabId === 'studio') runAudit();
    if (tabId === 'editor') window.codeEditor.updateFileTabs();
    if (tabId === 'breakpoints') renderBreakpoints();
  }

  /* ── Header URL ─────────────────────────────────────────────────────── */
  const urlInput = document.getElementById('urlInput');
  if (urlInput) {
    urlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && urlInput.value.trim()) {
        window.fileLoader.loadUrl(urlInput.value.trim());
      }
    });
  }

  /* ── Upload modal ───────────────────────────────────────────────────── */
  const modal = document.getElementById('uploadModal');
  const closeModal = document.getElementById('closeModal');
  document.getElementById('btnUploadProject')?.addEventListener('click', () => modal?.classList.add('open'));
  closeModal?.addEventListener('click', () => modal?.classList.remove('open'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  document.getElementById('fileInput')?.addEventListener('change', e => {
    if (e.target.files.length) { window.fileLoader.loadFiles([...e.target.files]); modal?.classList.remove('open'); }
  });
  document.getElementById('folderInput')?.addEventListener('change', e => {
    if (e.target.files.length) { window.fileLoader.loadFiles([...e.target.files]); modal?.classList.remove('open'); }
  });
  document.getElementById('zipInput')?.addEventListener('change', e => {
    if (e.target.files[0]) { window.fileLoader.loadZip(e.target.files[0]); modal?.classList.remove('open'); }
  });

  /* ── Drag & Drop ────────────────────────────────────────────────────── */
  const dragOverlay = document.getElementById('dragOverlay');
  window.addEventListener('dragover', e => { e.preventDefault(); dragOverlay?.classList.add('active'); });
  window.addEventListener('dragleave', e => { if (!e.relatedTarget) dragOverlay?.classList.remove('active'); });
  window.addEventListener('drop', e => {
    e.preventDefault();
    dragOverlay?.classList.remove('active');
    const files = [...e.dataTransfer.files];
    if (files.length === 1 && files[0].name.endsWith('.zip')) window.fileLoader.loadZip(files[0]);
    else if (files.length) window.fileLoader.loadFiles(files);
  });

  /* ── Category filter pills ──────────────────────────────────────────── */
  document.getElementById('categoryFilter')?.querySelectorAll('.btn-ghost').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('categoryFilter').querySelectorAll('.btn-ghost').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCat = btn.dataset.cat;
      buildDeviceSelect(selectedCat);
      renderStudio();
    });
  });

  /* ── Device select ──────────────────────────────────────────────────── */
  document.getElementById('deviceSelect')?.addEventListener('change', e => {
    window.deviceManager.setDevice(e.target.value);
  });

  /* ── Toolbar controls ───────────────────────────────────────────────── */
  document.getElementById('btnOrientation')?.addEventListener('click', () => window.deviceManager.toggleOrientation());
  document.getElementById('btnBezel')?.addEventListener('click', function() {
    window.deviceManager.toggleBezel();
    this.classList.toggle('active', window.deviceManager.showBezel);
  });
  document.getElementById('zoomSelect')?.addEventListener('change', e => window.deviceManager.setScale(parseFloat(e.target.value)));

  document.getElementById('btnSetCustom')?.addEventListener('click', () => {
    const w = parseInt(document.getElementById('customW')?.value, 10);
    const h = parseInt(document.getElementById('customH')?.value, 10);
    if (w && h) window.deviceManager.setCustomDimensions(w, h);
  });

  /* View toggle */
  document.getElementById('btnSingle')?.addEventListener('click', function() {
    window.deviceManager.setViewMode('single');
    this.classList.add('active');
    document.getElementById('btnMatrix')?.classList.remove('active');
  });
  document.getElementById('btnMatrix')?.addEventListener('click', function() {
    window.deviceManager.setViewMode('matrix');
    this.classList.add('active');
    document.getElementById('btnSingle')?.classList.remove('active');
  });

  /* Sidebar action buttons */
  document.getElementById('btnGoToEditor')?.addEventListener('click', () => switchTab('editor'));
  document.getElementById('btnExportReport')?.addEventListener('click', () => window.exporter.exportAuditReportHTML());
  document.getElementById('btnExportAudit')?.addEventListener('click', () => window.exporter.exportAuditReportHTML());
  document.getElementById('btnRunAudit')?.addEventListener('click', () => { runAudit(); switchTab('audit'); });
  document.getElementById('btnReRunAudit')?.addEventListener('click', runAudit);

  /* ── Demos ──────────────────────────────────────────────────────────── */
  document.querySelectorAll('.demo-load-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.fileLoader.loadDemo(btn.dataset.demo);
      switchTab('studio');
    });
  });

  /* ── Subscribe to state changes ─────────────────────────────────────── */
  window.deviceManager.subscribe(renderStudio);
  window.fileLoader.subscribe(onProjectLoaded);

  function onProjectLoaded() {
    // Update toolbar project name
    const nameEl = document.getElementById('projectNameDisplay');
    if (nameEl) nameEl.textContent = window.fileLoader.currentProjectName;

    // Update status bar
    const srcEl = document.getElementById('statusSource');
    if (srcEl) srcEl.textContent = `Source: ${window.fileLoader.currentSourceType}`;
    const filesEl = document.getElementById('statusFiles');
    if (filesEl) {
      const count = Object.keys(window.fileLoader.projectFiles).length;
      filesEl.textContent = count > 0 ? `${count} file${count > 1 ? 's' : ''} loaded` : 'URL mode';
    }

    renderStudio();
    runAudit();
    if (activeTab === 'editor') window.codeEditor.updateFileTabs();
    if (activeTab === 'breakpoints') renderBreakpoints();

    showToast(`"${window.fileLoader.currentProjectName}" loaded`, 'success');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER STUDIO
  ═══════════════════════════════════════════════════════════════════════ */
  function renderStudio() {
    const dm = window.deviceManager;
    const dims = dm.getCurrentDimensions();
    const dev = dm.currentDevice;

    /* Update toolbar display */
    const dimEl = document.getElementById('dimDisplay');
    if (dimEl) dimEl.textContent = `${dims.width} × ${dims.height} px`;

    const bp = dm.getBreakpointCategory(dims.width);
    const bpEl = document.getElementById('bpDisplay');
    if (bpEl) bpEl.textContent = `${bp.code} · ${dev.category || 'custom'}`;

    /* Update sidebar device info */
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('devName', dev.name);
    set('devOS', dev.os || '—');
    set('devW', dims.width + 'px');
    set('devH', dims.height + 'px');
    set('devDPR', (dev.dpr || 1) + '×');

    /* Sync device select */
    const sel = document.getElementById('deviceSelect');
    if (sel && sel.value !== dev.id) sel.value = dev.id;

    if (dm.viewMode === 'single') {
      renderSingleFrame(dims, dev);
    } else {
      renderMatrix();
    }
  }

  function renderSingleFrame(dims, dev) {
    const canvasArea = document.getElementById('canvasArea');
    const singleContainer = document.getElementById('singleContainer');
    const matrixArea = document.getElementById('matrixArea');
    if (!canvasArea || !singleContainer) return;

    singleContainer.style.display = '';
    if (matrixArea) matrixArea.style.display = 'none';

    const dm = window.deviceManager;
    const scale = dm.scale;
    const showBezel = dm.showBezel;

    /* Build notch html */
    let notchHtml = '';
    if (showBezel && dev.hasBezel) {
      if (dev.notchType === 'dynamic-island') notchHtml = '<div class="device-notch pill"></div>';
      else if (dev.notchType === 'hole-punch')      notchHtml = '<div class="device-notch dot"></div>';
      else if (dev.notchType === 'notch')           notchHtml = '<div class="device-notch bar"></div>';
    }

    singleContainer.innerHTML = `
      <div class="device-frame-wrapper" style="transform: scale(${scale}); transform-origin: center top;">
        <div class="device-shell ${showBezel && dev.hasBezel ? '' : 'borderless'}">
          ${notchHtml}
          <div class="device-screen" style="width:${dims.width}px; height:${dims.height}px;">
            <!-- iframe goes here -->
          </div>
        </div>
        <div class="device-label">
          <span class="dot-live"></span>
          ${dev.icon} ${dev.name} &nbsp;·&nbsp; ${dims.width} × ${dims.height}
        </div>
      </div>
    `;

    const iframe = document.createElement('iframe');
    iframe.className = 'device-iframe';
    iframe.style.width = dims.width + 'px';
    iframe.style.height = dims.height + 'px';
    injectContent(iframe);
    singleContainer.querySelector('.device-screen').appendChild(iframe);
  }

  function renderMatrix() {
    const singleContainer = document.getElementById('singleContainer');
    const matrixArea = document.getElementById('matrixArea');
    const matrixGrid = document.getElementById('matrixGrid');
    if (!matrixGrid) return;

    if (singleContainer) singleContainer.style.display = 'none';
    if (matrixArea) matrixArea.style.display = '';

    let devices = window.DEVICE_PRESETS;
    if (selectedCat !== 'all') devices = devices.filter(d => d.category === selectedCat);
    else devices = devices.filter(d => ['mobile', 'tablet'].includes(d.category) || d.id === 'macbook-air-13');

    matrixGrid.innerHTML = '';
    devices.forEach(dev => {
      const scale = Math.min(0.62, 280 / dev.width);
      const visH = Math.round(dev.height * scale);
      const card = document.createElement('div');
      card.className = 'matrix-card';
      card.innerHTML = `
        <div class="matrix-card-header">
          <span class="matrix-card-title">${dev.icon} ${dev.name}</span>
          <span class="matrix-dim-badge">${dev.width}×${dev.height}</span>
        </div>
        <div class="matrix-viewport" style="height:${Math.max(visH + 32, 220)}px;">
          <!-- iframe -->
        </div>
      `;
      const iframe = document.createElement('iframe');
      iframe.className = 'matrix-iframe';
      iframe.style.width = dev.width + 'px';
      iframe.style.height = dev.height + 'px';
      iframe.style.transform = `scale(${scale})`;
      iframe.style.transformOrigin = 'top center';
      injectContent(iframe);
      card.querySelector('.matrix-viewport').appendChild(iframe);
      matrixGrid.appendChild(card);
    });
  }

  function injectContent(iframe) {
    if (window.fileLoader.currentSourceType === 'url') {
      iframe.src = window.fileLoader.currentUrl;
    } else {
      iframe.removeAttribute('sandbox');
      iframe.srcdoc = window.fileLoader.assembledHtml || '<html><body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;color:#666;"><p>No project loaded</p></body></html>';
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     AUDIT
  ═══════════════════════════════════════════════════════════════════════ */
  function runAudit() {
    const liveIframe = document.querySelector('.device-iframe');
    const iframeDoc = liveIframe?.contentDocument ?? null;
    const report = window.auditEngine.runAudit(window.fileLoader.assembledHtml || '', iframeDoc);

    updateSidebarScore(report);
    updateAuditPanel(report);
  }

  function updateSidebarScore(report) {
    /* SVG ring: circumference = 2π × 52 ≈ 327 */
    const arc = document.getElementById('scoreRingArc');
    if (arc) {
      const offset = 327 * (1 - report.score / 100);
      arc.style.strokeDashoffset = offset;
      arc.style.stroke = report.grade.color;
    }
    const scoreEl = document.getElementById('sidebarScore');
    if (scoreEl) { scoreEl.textContent = report.score + '%'; scoreEl.style.color = report.grade.color; }
    const gradeEl = document.getElementById('sidebarGrade');
    if (gradeEl) gradeEl.textContent = report.grade.icon + ' ' + report.grade.label;

    /* Quick stat pills */
    function setStat(id, text, kind) {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = text;
      el.className = 'stat-value ' + kind;
    }
    setStat('sqViewport', report.hasViewportMeta ? 'Present' : 'Missing', report.hasViewportMeta ? 'stat-ok' : 'stat-bad');
    setStat('sqMedia', report.mediaQueryCount > 0 ? report.mediaQueryCount + ' rules' : 'None', report.mediaQueryCount > 0 ? 'stat-ok' : 'stat-warn');
    const hasImgIssue = report.issues.some(i => i.id === 'non-fluid-images');
    setStat('sqImages', hasImgIssue ? 'Review' : 'OK', hasImgIssue ? 'stat-warn' : 'stat-ok');
    const hasTouchIssue = report.issues.some(i => i.id === 'small-touch-targets');
    setStat('sqTouch', hasTouchIssue ? 'Issues' : 'OK', hasTouchIssue ? 'stat-warn' : 'stat-ok');
  }

  function updateAuditPanel(report) {
    /* Score circle */
    const circleBg = document.getElementById('auditCircleBg');
    if (circleBg) circleBg.style.setProperty('--pct', report.score);

    const scoreNum = document.getElementById('auditScoreNum');
    if (scoreNum) { scoreNum.textContent = report.score; scoreNum.style.color = report.grade.color; }

    const gradeBadge = document.getElementById('auditGradeBadge');
    if (gradeBadge) {
      gradeBadge.textContent = `${report.grade.icon} ${report.grade.label}`;
      gradeBadge.style.borderColor = report.grade.color;
      gradeBadge.style.color = report.grade.color;
    }

    /* Metrics */
    function setMetric(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    setMetric('metViewport', report.hasViewportMeta ? '✓' : '✗');
    document.getElementById('metViewport').style.color = report.hasViewportMeta ? 'var(--color-success)' : 'var(--color-danger)';
    document.getElementById('metViewportSub').textContent = report.hasViewportMeta ? 'Tag found' : 'Tag missing';
    setMetric('metMQ', report.mediaQueryCount);
    document.getElementById('metMQ').style.color = report.mediaQueryCount > 0 ? 'var(--accent-purple)' : 'var(--color-warning)';
    const overflowCount = report.issues.filter(i => i.id === 'horizontal-overflow' || i.id === 'fixed-width-css').length;
    setMetric('metOverflow', overflowCount);
    document.getElementById('metOverflow').style.color = overflowCount === 0 ? 'var(--color-success)' : 'var(--color-danger)';
    setMetric('metIssues', report.issues.length);
    document.getElementById('metIssues').style.color = report.issues.length === 0 ? 'var(--color-success)' : 'var(--color-warning)';

    /* Issue cards */
    const list = document.getElementById('issuesList');
    if (!list) return;
    list.innerHTML = '';

    if (report.issues.length === 0) {
      list.innerHTML = `
        <div class="audit-success">
          <div style="font-size:2.5rem; margin-bottom:12px;">🎉</div>
          <h3>Zero Issues Found!</h3>
          <p>Your project passes all responsiveness checks. Viewport meta, media queries, fluid images, and touch targets all look great.</p>
        </div>`;
      return;
    }

    report.issues.forEach(issue => {
      const card = document.createElement('div');
      card.className = 'issue-card';
      card.innerHTML = `
        <div class="issue-card-bar ${issue.severity}"></div>
        <div class="issue-card-body">
          <div class="issue-card-header">
            <div class="issue-card-title-row">
              <span class="severity-badge ${issue.severity}">${issue.severity}</span>
              <span class="issue-title">${issue.title}</span>
            </div>
            <span class="impact-pill">${issue.impact}</span>
          </div>
          <p class="issue-desc">${issue.description}</p>
          <div class="code-block">
            <div class="code-block-header">Suggested Fix</div>
            <pre>${escHtml(issue.codeSnippet)}</pre>
          </div>
          <div class="issue-actions">
            ${issue.selectors ? `<button class="btn btn-sm btn-secondary btn-highlight-sel" data-sel='${JSON.stringify(issue.selectors)}'>🔍 Highlight in viewport</button>` : ''}
          </div>
        </div>
      `;
      card.querySelectorAll('.btn-highlight-sel').forEach(b => {
        b.addEventListener('click', () => {
          const selectors = JSON.parse(b.dataset.sel);
          const frame = document.querySelector('.device-iframe');
          if (frame?.contentDocument) {
            window.auditEngine.highlightElementsInIframe(frame.contentDocument, selectors);
            switchTab('studio');
          }
        });
      });
      list.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     BREAKPOINTS PANEL
  ═══════════════════════════════════════════════════════════════════════ */
  function renderBreakpoints() {
    const list = document.getElementById('mqList');
    if (!list) return;
    const html = window.fileLoader.assembledHtml || '';
    const matches = [...html.matchAll(/@media\s*\(([^\)]+)\)\s*\{/gi)].map(m => m[1]);
    list.innerHTML = matches.length
      ? matches.map(mq => `<div class="mq-item">(${escHtml(mq)})</div>`).join('')
      : `<div style="color:var(--text-tertiary); font-size:0.88rem; padding:16px;">No @media rules detected in the loaded project.</div>`;
  }

  /* ─── Helpers ────────────────────────────────────────────────────────── */
  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ─── Boot ───────────────────────────────────────────────────────────── */
  setTimeout(() => window.fileLoader.loadDemo('saas'), 60);

});
