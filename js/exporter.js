/**
 * Exporter & Report Generator Module for FlexFrame Pro
 * Handles HTML/PDF report export, screenshot capture, and data downloading.
 */

class Exporter {
    /**
     * Download current responsiveness audit report as a formatted HTML file
     */
    exportAuditReportHTML() {
        const report = window.auditEngine.lastReport;
        if (!report) {
            alert('Please run an audit first before exporting!');
            return;
        }

        const projectName = window.fileLoader.currentProjectName || 'Project';
        const date = new Date().toLocaleString();

        let issuesHtml = report.issues.map(issue => `
            <div style="border: 1px solid #334155; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #1e293b;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                    <strong style="color: ${issue.severity === 'critical' ? '#ef4444' : '#f59e0b'}; font-size: 16px;">
                        [${issue.severity.toUpperCase()}] ${issue.title}
                    </strong>
                    <span style="background: #334155; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${issue.impact}</span>
                </div>
                <p style="color: #cbd5e1; margin-bottom: 10px;">${issue.description}</p>
                <pre style="background: #0f172a; padding: 10px; border-radius: 6px; color: #38bdf8; font-family: monospace; overflow-x: auto;">${issue.codeSnippet}</pre>
            </div>
        `).join('');

        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Responsive Audit Report - ${projectName}</title>
    <style>
        body { font-family: -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.6; }
        .header { border-bottom: 2px solid #334155; padding-bottom: 20px; margin-bottom: 30px; }
        .score-box { background: linear-gradient(135deg, #1e293b, #0f172a); border: 2px solid #38bdf8; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px; }
        .score-val { font-size: 64px; font-weight: 800; color: ${report.grade.color}; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Responsiveness Audit Report</h1>
        <p>Project: <b>${projectName}</b> • Generated: <b>${date}</b></p>
    </div>

    <div class="score-box">
        <div>OVERALL RESPONSIVENESS SCORE</div>
        <div class="score-val">${report.score}%</div>
        <h3 style="color: ${report.grade.color}; margin-top: 10px;">${report.grade.label}</h3>
    </div>

    <h2>Audit Diagnostic Issues (${report.issues.length})</h2>
    ${issuesHtml}
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FlexFrame_Report_${projectName.replace(/\s+/g, '_')}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

window.exporter = new Exporter();
