/**
 * Automated Responsiveness Audit Engine for FlexFrame Pro
 * Scans HTML/CSS and iframe DOM to evaluate responsiveness score, overflow issues, touch targets, and media queries.
 */

class AuditEngine {
    constructor() {
        this.lastReport = null;
    }

    /**
     * Run full audit scan on HTML content and optional iframe DOM reference
     */
    runAudit(htmlString, iframeDoc = null) {
        const issues = [];
        let score = 100;

        // 1. Viewport Meta Tag Audit
        const hasViewportMeta = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(htmlString);
        if (!hasViewportMeta) {
            score -= 30;
            issues.push({
                id: 'missing-viewport',
                category: 'meta',
                severity: 'critical',
                title: 'Missing Viewport Meta Tag',
                description: 'The document does not include a <meta name="viewport"> tag. Mobile browsers will render the page at desktop width (980px) and scale it down, causing tiny text and broken layouts.',
                codeSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                impact: '-30 pts'
            });
        } else {
            // Check if user-scalable is disabled
            if (/user-scalable\s*=\s*no/i.test(htmlString)) {
                score -= 5;
                issues.push({
                    id: 'disabled-zoom',
                    category: 'meta',
                    severity: 'warning',
                    title: 'Pinch-to-Zoom Disabled',
                    description: 'Viewport meta tag sets user-scalable=no, which prevents vision-impaired users from zooming in.',
                    codeSnippet: 'content="width=device-width, initial-scale=1.0"',
                    impact: '-5 pts'
                });
            }
        }

        // 2. Fixed Width Elements Audit (HTML / inline CSS check)
        const fixedWidthRegex = /(width|min-width)\s*:\s*([8-9]\d{2}|[1-9]\d{3,})px/gi;
        let match;
        const fixedWidthMatches = [];
        while ((match = fixedWidthRegex.exec(htmlString)) !== null) {
            fixedWidthMatches.push(match[0]);
        }
        if (fixedWidthMatches.length > 0) {
            score -= Math.min(25, fixedWidthMatches.length * 10);
            issues.push({
                id: 'fixed-width-css',
                category: 'layout',
                severity: 'critical',
                title: `Hardcoded Fixed Width CSS Detected (${fixedWidthMatches.length} instances)`,
                description: `Found CSS declarations with fixed widths exceeding 800px (e.g. ${fixedWidthMatches.slice(0, 3).join(', ')}). This prevents elements from shrinking on mobile screens.`,
                codeSnippet: '/* Replace fixed px with responsive fluid max-width: */\nwidth: 100%;\nmax-width: 1200px;',
                impact: `-${Math.min(25, fixedWidthMatches.length * 10)} pts`
            });
        }

        // 3. Image Responsiveness Check
        const nonResponsiveImgRegex = /<img[^>]+(width|style)=["']([8-9]\d{2}|[1-9]\d{3,})px?["'][^>]*>/gi;
        const imgMatches = htmlString.match(nonResponsiveImgRegex) || [];
        const hasFluidImgStyle = /img\s*\{[^}]*max-width\s*:\s*100%/i.test(htmlString);

        if (!hasFluidImgStyle && (imgMatches.length > 0 || /<img/i.test(htmlString))) {
            if (!hasFluidImgStyle) {
                score -= 10;
                issues.push({
                    id: 'non-fluid-images',
                    category: 'images',
                    severity: 'warning',
                    title: 'Missing Global Responsive Image CSS',
                    description: 'No global "img { max-width: 100%; height: auto; }" CSS rule detected. Images may overflow smaller viewports.',
                    codeSnippet: 'img, svg, video {\n  max-width: 100%;\n  height: auto;\n}',
                    impact: '-10 pts'
                });
            }
        }

        // 4. Media Queries Presence Check
        const mediaQueryMatches = htmlString.match(/@media\s*[^\{]+\{/gi) || [];
        if (mediaQueryMatches.length === 0) {
            score -= 15;
            issues.push({
                id: 'no-media-queries',
                category: 'breakpoints',
                severity: 'warning',
                title: 'No CSS Media Queries Detected',
                description: 'The stylesheet does not contain any @media breakpoint rules to alter styling for mobile vs desktop.',
                codeSnippet: '@media (max-width: 768px) {\n  .sidebar { display: none; }\n}',
                impact: '-15 pts'
            });
        }

        // 5. If iframe DOM reference is available, perform live computed DOM checks
        if (iframeDoc) {
            const domCheck = this.scanLiveIframeDom(iframeDoc);
            score -= domCheck.scorePenalty;
            issues.push(...domCheck.issues);
        }

        // Ensure score stays within 0 to 100
        score = Math.max(0, Math.min(100, Math.round(score)));

        // Determine grade classification
        let grade = { label: 'EXCELLENT', color: '#10b981', badgeClass: 'badge-success', icon: '✅' };
        if (score < 50) grade = { label: 'POOR (CRITICAL ISSUES)', color: '#ef4444', badgeClass: 'badge-danger', icon: '❌' };
        else if (score < 75) grade = { label: 'FAIR (NEEDS IMPROVEMENT)', color: '#f59e0b', badgeClass: 'badge-warning', icon: '⚠️' };
        else if (score < 90) grade = { label: 'GOOD', color: '#3b82f6', badgeClass: 'badge-info', icon: 'ℹ️' };

        const report = {
            score,
            grade,
            issues,
            mediaQueryCount: mediaQueryMatches.length,
            hasViewportMeta,
            timestamp: new Date().toLocaleTimeString()
        };

        this.lastReport = report;
        return report;
    }

    /**
     * Inspects actual computed DOM inside rendered iframe
     */
    scanLiveIframeDom(doc) {
        let scorePenalty = 0;
        const issues = [];

        try {
            const win = doc.defaultView || window;
            const viewportWidth = win.innerWidth || doc.documentElement.clientWidth;

            // Check 1: Horizontal Scrollbar / Element Overflow
            const bodyScrollWidth = doc.documentElement.scrollWidth || doc.body.scrollWidth;
            if (bodyScrollWidth > viewportWidth + 5) {
                const overflowingElements = [];
                const allElements = doc.body.querySelectorAll('*');
                allElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > viewportWidth + 5 && rect.width > 50) {
                        const selector = el.id ? `#${el.id}` : (el.className ? `.${el.className.split(' ')[0]}` : el.tagName.toLowerCase());
                        if (!overflowingElements.includes(selector)) {
                            overflowingElements.push(selector);
                        }
                    }
                });

                scorePenalty += 20;
                issues.push({
                    id: 'horizontal-overflow',
                    category: 'layout',
                    severity: 'critical',
                    title: `Horizontal Scrollbar Triggered (${bodyScrollWidth}px content on ${viewportWidth}px screen)`,
                    description: `Elements are overflowing the viewport boundary causing awkward horizontal scrolling on mobile. Offending elements: ${overflowingElements.slice(0, 5).join(', ')}`,
                    codeSnippet: '/* Fix overflow on body/container */\nbody, main {\n  overflow-x: hidden;\n  width: 100%;\n}',
                    impact: '-20 pts',
                    selectors: overflowingElements
                });
            }

            // Check 2: Small Touch Targets (< 44px height or width)
            const clickableElements = doc.querySelectorAll('a, button, input[type="button"], input[type="submit"]');
            let smallTouchCount = 0;
            clickableElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                    smallTouchCount++;
                }
            });

            if (smallTouchCount > 0) {
                const pen = Math.min(15, smallTouchCount * 3);
                scorePenalty += pen;
                issues.push({
                    id: 'small-touch-targets',
                    category: 'accessibility',
                    severity: 'warning',
                    title: `Small Touch Targets (${smallTouchCount} interactive elements < 44px)`,
                    description: `${smallTouchCount} buttons or links are smaller than Apple & Google's recommended 44×44px minimum touch target size. This causes mistaps on touchscreens.`,
                    codeSnippet: 'button, a, input {\n  min-height: 44px;\n  min-width: 44px;\n  display: inline-flex;\n  align-items: center;\n}',
                    impact: `-${pen} pts`
                });
            }

            // Check 3: Font size < 12px
            const textElements = doc.querySelectorAll('p, span, a, td, li');
            let tinyTextCount = 0;
            textElements.forEach(el => {
                const fontSize = parseFloat(win.getComputedStyle(el).fontSize);
                if (fontSize && fontSize < 11) {
                    tinyTextCount++;
                }
            });

            if (tinyTextCount > 0) {
                scorePenalty += 5;
                issues.push({
                    id: 'tiny-font-size',
                    category: 'typography',
                    severity: 'info',
                    title: `Unreadable Tiny Text (${tinyTextCount} elements < 11px font)`,
                    description: `Text elements were detected with computed font size smaller than 11px. Mobile users will struggle to read this without zooming.`,
                    codeSnippet: 'body {\n  font-size: 1rem; /* 16px base font size */\n}',
                    impact: '-5 pts'
                });
            }

        } catch (e) {
            console.warn('Live iframe DOM scan notice:', e);
        }

        return { scorePenalty, issues };
    }

    /**
     * Highlights broken/overflowing elements inside preview iframe
     */
    highlightElementsInIframe(doc, selectors) {
        if (!doc || !selectors || selectors.length === 0) return;
        
        // Remove prior highlights
        const existing = doc.querySelectorAll('.flexframe-highlight-overlay');
        existing.forEach(el => el.remove());

        selectors.forEach(sel => {
            try {
                const targets = doc.querySelectorAll(sel);
                targets.forEach(target => {
                    target.style.outline = '3px dashed #ef4444';
                    target.style.outlineOffset = '2px';
                    target.style.position = 'relative';

                    const badge = doc.createElement('div');
                    badge.className = 'flexframe-highlight-overlay';
                    badge.textContent = '⚠️ Overflow Element';
                    badge.style.position = 'absolute';
                    badge.style.top = '0';
                    badge.style.right = '0';
                    badge.style.background = '#ef4444';
                    badge.style.color = '#ffffff';
                    badge.style.fontSize = '10px';
                    badge.style.fontWeight = 'bold';
                    badge.style.padding = '2px 6px';
                    badge.style.borderRadius = '4px';
                    badge.style.zIndex = '99999';
                    target.appendChild(badge);
                });
            } catch (e) {
                console.warn('Highlight failed for selector:', sel);
            }
        });
    }
}

window.auditEngine = new AuditEngine();
