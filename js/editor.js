/**
 * editor.js — Live Code Editor component for FlexFrame Pro
 */
class CodeEditor {
  constructor() {
    this.activeFile = 'index.html';
    this.container = null;
    this.textarea = null;
    this.gutter = null;
    this.tabsEl = null;
  }

  init(containerEl) {
    this.container = containerEl;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="editor-topbar">
        <div class="editor-tabs" id="editorTabs"></div>
        <div style="display:flex; gap:8px; align-items:center; flex-shrink:0;">
          <span style="font-size:0.72rem; font-weight:600; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.06em;">Live Editor</span>
          <button class="btn btn-sm btn-cyan" id="applyEdit">⚡ Apply</button>
        </div>
      </div>
      <div class="editor-body">
        <div class="editor-gutter" id="editorGutter">1</div>
        <textarea class="editor-textarea" id="editorTextarea" spellcheck="false" placeholder="Select a file tab above to start editing..."></textarea>
      </div>
    `;
    this.textarea = this.container.querySelector('#editorTextarea');
    this.gutter   = this.container.querySelector('#editorGutter');
    this.tabsEl   = this.container.querySelector('#editorTabs');
  }

  bindEvents() {
    this.container.querySelector('#applyEdit').addEventListener('click', () => {
      if (this.activeFile) {
        window.fileLoader.updateFileContent(this.activeFile, this.textarea.value);
        showToast('Live preview updated ⚡', 'success');
      }
    });

    this.textarea.addEventListener('input', () => this.syncGutter());
    this.textarea.addEventListener('scroll', () => {
      this.gutter.scrollTop = this.textarea.scrollTop;
    });
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = this.textarea.selectionStart;
        const v = this.textarea.value;
        this.textarea.value = v.slice(0, s) + '  ' + v.slice(this.textarea.selectionEnd);
        this.textarea.selectionStart = this.textarea.selectionEnd = s + 2;
        this.syncGutter();
      }
    });
  }

  updateFileTabs() {
    if (!this.tabsEl) return;
    const files = Object.keys(window.fileLoader.projectFiles || {});
    this.tabsEl.innerHTML = '';
    if (!files.length) {
      this.tabsEl.innerHTML = '<span class="no-files-tag">No project loaded</span>';
      return;
    }
    files.forEach(f => {
      const ext = f.split('.').pop();
      const icons = { html: '🌐', css: '🎨', js: '⚡', json: '📋' };
      const btn = document.createElement('button');
      btn.className = 'editor-file-tab' + (f === this.activeFile ? ' active' : '');
      btn.innerHTML = `<span>${icons[ext] || '📄'}</span>${f}`;
      btn.addEventListener('click', () => this.loadFile(f));
      this.tabsEl.appendChild(btn);
    });
  }

  loadFile(filePath) {
    this.activeFile = filePath;
    this.updateFileTabs();
    this.textarea.value = window.fileLoader.projectFiles[filePath] || '';
    this.syncGutter();
  }

  syncGutter() {
    const lines = this.textarea.value.split('\n').length;
    this.gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  }
}

window.codeEditor = new CodeEditor();

/* ── Global toast helper ────────────────────────────────────────────────── */
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
};
