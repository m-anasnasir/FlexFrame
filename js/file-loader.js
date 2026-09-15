/**
 * File Loader & Virtual File System (VFS) Module for FlexFrame Pro
 * Handles HTML/CSS file uploads, ZIP unpacking via JSZip, CORS proxy URLs, and Blob URL generation.
 */

class FileLoader {
    constructor() {
        this.currentProjectName = "Demo Project";
        this.projectFiles = {}; // { 'index.html': 'content...', 'css/style.css': 'content...' }
        this.blobMap = {}; // Maps relative path to blob URL
        this.activeHtmlPath = 'index.html';
        this.currentUrl = null;
        this.currentSourceType = 'demo'; // 'demo', 'url', 'files', 'zip'
        this.listeners = [];
    }

    // Load pre-loaded demo template
    loadDemo(demoKey) {
        const demo = window.DEMO_TEMPLATES[demoKey] || window.DEMO_TEMPLATES['saas'];
        this.currentProjectName = demo.title;
        this.currentSourceType = 'demo';
        this.currentUrl = null;
        this.projectFiles = {
            'index.html': demo.html
        };
        this.activeHtmlPath = 'index.html';
        this.processProjectFiles();
    }

    // Load external URL
    loadUrl(url) {
        if (!url) return;
        let formattedUrl = url.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'https://' + formattedUrl;
        }
        this.currentUrl = formattedUrl;
        this.currentProjectName = new URL(formattedUrl).hostname;
        this.currentSourceType = 'url';
        this.notify({ type: 'url', url: formattedUrl });
    }

    // Load raw files (HTML, CSS, JS, Images)
    async loadFiles(filesList) {
        this.projectFiles = {};
        this.revokeBlobs();

        for (const file of filesList) {
            const path = file.webkitRelativePath || file.name;
            if (file.type.startsWith('text/') || file.name.endsWith('.html') || file.name.endsWith('.css') || file.name.endsWith('.js') || file.name.endsWith('.svg') || file.name.endsWith('.json')) {
                const text = await file.text();
                this.projectFiles[path] = text;
            } else {
                // Binary assets (images, fonts)
                const arrayBuffer = await file.arrayBuffer();
                const blob = new Blob([arrayBuffer], { type: file.type });
                const blobUrl = URL.createObjectURL(blob);
                this.blobMap[path] = blobUrl;
                this.blobMap['./' + path] = blobUrl;
            }
        }

        // Find root HTML file
        const htmlFiles = Object.keys(this.projectFiles).filter(p => p.endsWith('.html'));
        if (htmlFiles.length === 0) {
            alert('No .html file found in uploaded items!');
            return;
        }

        this.activeHtmlPath = htmlFiles.find(p => p === 'index.html' || p.endsWith('/index.html')) || htmlFiles[0];
        this.currentProjectName = filesList[0].name.replace(/\.[^/.]+$/, "");
        this.currentSourceType = 'files';
        this.currentUrl = null;
        this.processProjectFiles();
    }

    // Load ZIP Archive using JSZip
    async loadZip(zipFile) {
        if (typeof JSZip === 'undefined') {
            alert('JSZip library loading... Please check internet connection.');
            return;
        }
        try {
            const jszip = new JSZip();
            const zip = await jszip.loadAsync(zipFile);
            this.projectFiles = {};
            this.revokeBlobs();

            for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
                if (zipEntry.dir) continue;
                
                const lowerName = relativePath.toLowerCase();
                if (lowerName.endsWith('.html') || lowerName.endsWith('.css') || lowerName.endsWith('.js') || lowerName.endsWith('.svg') || lowerName.endsWith('.json')) {
                    const content = await zipEntry.async('text');
                    this.projectFiles[relativePath] = content;
                } else {
                    const blob = await zipEntry.async('blob');
                    const blobUrl = URL.createObjectURL(blob);
                    this.blobMap[relativePath] = blobUrl;
                    this.blobMap['./' + relativePath] = blobUrl;
                }
            }

            const htmlFiles = Object.keys(this.projectFiles).filter(p => p.endsWith('.html'));
            if (htmlFiles.length === 0) {
                alert('No .html file found inside the ZIP archive!');
                return;
            }

            this.activeHtmlPath = htmlFiles.find(p => p === 'index.html' || p.endsWith('/index.html')) || htmlFiles[0];
            this.currentProjectName = zipFile.name.replace(/\.zip$/i, "");
            this.currentSourceType = 'zip';
            this.currentUrl = null;
            this.processProjectFiles();
        } catch (err) {
            console.error('Error unpacking ZIP:', err);
            alert('Failed to process ZIP file: ' + err.message);
        }
    }

    // Process linked CSS/JS files and assemble final rendered HTML srcdoc string
    processProjectFiles() {
        let rootHtml = this.projectFiles[this.activeHtmlPath] || '';
        
        // Resolve linked CSS files
        rootHtml = rootHtml.replace(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
            const cssContent = this.resolvePathContent(href);
            if (cssContent) {
                return `<style data-source-href="${href}">\n${cssContent}\n</style>`;
            }
            return match;
        });

        // Resolve linked JS files
        rootHtml = rootHtml.replace(/<script[^>]+src=["']([^"']+)["'][^>]*>\s*<\/script>/gi, (match, src) => {
            const jsContent = this.resolvePathContent(src);
            if (jsContent) {
                return `<script data-source-src="${src}">\n${jsContent}\n</script>`;
            }
            return match;
        });

        // Resolve Image srcs mapped to blobs
        rootHtml = rootHtml.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
            const blobUrl = this.blobMap[src] || this.blobMap['./' + src];
            if (blobUrl) {
                return match.replace(src, blobUrl);
            }
            return match;
        });

        this.assembledHtml = rootHtml;
        this.notify({ type: 'html', html: rootHtml, name: this.currentProjectName });
    }

    resolvePathContent(relativePath) {
        // Try exact key match, or subpath match
        if (this.projectFiles[relativePath]) return this.projectFiles[relativePath];
        const cleanPath = relativePath.replace(/^\.\//, '');
        if (this.projectFiles[cleanPath]) return this.projectFiles[cleanPath];

        for (const [path, content] of Object.entries(this.projectFiles)) {
            if (path.endsWith(cleanPath)) return content;
        }
        return null;
    }

    updateFileContent(filePath, newContent) {
        this.projectFiles[filePath] = newContent;
        this.processProjectFiles();
    }

    revokeBlobs() {
        Object.values(this.blobMap).forEach(url => URL.revokeObjectURL(url));
        this.blobMap = {};
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify(data) {
        this.listeners.forEach(cb => cb(data, this));
    }
}

window.fileLoader = new FileLoader();
