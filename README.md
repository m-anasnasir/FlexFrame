# FlexFrame Pro 📱⚡

> **Multi-Device Responsive Testing Studio & Automated Audit Engine**  
> Test, inspect, and audit your web projects across 13+ real-world device viewports with automated scoring, live DOM diagnostics, and an in-browser code editor.

---

[![Pure Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-f7df1e?logo=javascript&logoColor=black)](#tech-stack)
[![HTML5 & CSS3](https://img.shields.io/badge/Stack-HTML5%20%2F%20CSS3-e34f26?logo=html5&logoColor=white)](#tech-stack)
[![Zero Build Steps](https://img.shields.io/badge/Build-Zero_Config_Required-success)](#getting-started)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

**FlexFrame Pro** is a client-side developer studio designed to test responsive web layouts, diagnose viewport overflow bottlenecks, audit responsive best practices, and preview code changes in real time. 

Built entirely with standard web technologies (HTML5, CSS3, ES6 JavaScript), it runs 100% inside your browser with no build step, node modules, or backend server required.

---

## ✨ Key Features

### 📱 1. Multi-Device Studio
- **Accurate Viewport Simulation**: Real-world pixel dimensions, device aspect ratios, and Device Pixel Ratio (DPR) values.
- **Hardware-Accurate Bezels & Notches**: Render viewports with realistic chassis bezels and notches (Dynamic Island, hole-punch cameras, top notches).
- **Orientation Toggle**: Instantly flip between portrait and landscape modes with a single click.
- **Zoom & Scaling**: Scale the canvas viewport from `50%` to `100%` to comfortably inspect large desktop viewports on smaller monitors.
- **Custom Viewports**: Enter arbitrary custom width and height combinations (up to 4K resolution) on demand.
- **Matrix View**: Simultaneously preview your layout across mobile, tablet, and desktop viewports side-by-side.

### ⚡ 2. Automated Responsiveness Audit Engine
- **Weighted 0–100% Health Score**: Evaluates responsive quality based on industry standards and Google/Apple web guidelines.
- **Viewport Meta Tag Validation**: Checks for `<meta name="viewport" content="width=device-width, initial-scale=1.0">` and flags accessibility issues like disabled pinch-to-zoom (`user-scalable=no`).
- **Fixed-Width CSS Detection**: Flags hardcoded widths (e.g., `width: 1200px`) that cause horizontal overflow on mobile screens.
- **Fluid Media & Image Checks**: Inspects whether images and videos utilize responsive rules (`max-width: 100%`, `height: auto`).
- **Live Iframe DOM Scanning**:
  - **Horizontal Scrollbar Detection**: Detects content overflowing the screen width.
  - **Visual Element Highlighter**: Click **"Highlight in viewport"** to outline the offending overflow elements in red dashed borders with badges inside the preview frame.
  - **Touch Target Analysis**: Flags interactive buttons and links smaller than the recommended 44×44px minimum touch target size.
  - **Typography Readability**: Detects tiny text smaller than 11px computed font size.

### 💻 3. In-Browser Live Code Editor
- **Multi-File Tab Navigation**: Switch between `index.html`, stylesheets, and JavaScript files loaded into the virtual file system.
- **Hot-Reload Preview**: Edit HTML or CSS directly in the editor and click **Apply** to instantly refresh the live device frame without losing state.
- **Code Gutter & Indentation**: Synchronized line numbers and tab key support.

### 📐 4. Breakpoint Analyzer & Visual Ruler
- **Media Query Extraction**: Automatically parses loaded stylesheets and lists all `@media` rule queries.
- **Responsive Ruler**: Reference standard device breakpoint thresholds (`320px`, `576px`, `768px`, `992px`, `1200px`, `1400px`).

### 📦 5. Flexible Project Ingestion (Virtual File System)
- **ZIP Archives**: Drag and drop or upload `.zip` archives (decompressed in-memory via JSZip).
- **Project Folder Upload**: Select an entire local directory with linked stylesheets, scripts, and asset folders.
- **Individual Files**: Upload standalone HTML, CSS, JS, and image files.
- **Live URL Testing**: Enter any public web URL (e.g. `https://example.com`) to inspect live external websites.

### 🚀 6. Built-in Demonstration Projects
Includes 4 pre-loaded showcase templates ready for one-click testing:
1. **Modern SaaS Landing Page** (*100% Score*): Responsive flexbox header, fluid hero section, pricing grid, and modern styling.
2. **E-Commerce Storefront** (*98% Score*): Responsive product catalog, sticky mobile bottom navigation, and fluid layouts.
3. **Non-Responsive Legacy Site** (*32% Score*): Intentionally broken layout with fixed 1200px widths, unscaled images, and missing viewport meta tags — perfect for testing the audit engine and highlighter.
4. **Creative Developer Portfolio** (*96% Score*): Glassmorphism dark-mode layout with responsive CSS grid and adaptive drawer navigation.

### 📥 7. Audit Report Exporter
- Export a standalone, styled HTML report of your audit results, overall score, diagnostic findings, and code fix recommendations with one click.

---

## 📱 Device Presets Catalog

| Category | Device Name | Viewport (W × H) | DPR | OS | Bezel / Notch Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mobile** | iPhone 15 Pro | 393 × 852 px | 3.0× | iOS | Bezel + Dynamic Island |
| **Mobile** | iPhone 15 Pro Max | 430 × 932 px | 3.0× | iOS | Bezel + Dynamic Island |
| **Mobile** | Samsung Galaxy S24 | 412 × 915 px | 3.0× | Android | Bezel + Hole-punch |
| **Mobile** | Google Pixel 8 Pro | 412 × 915 px | 3.0× | Android | Bezel + Hole-punch |
| **Mobile** | iPhone SE (3rd Gen) | 375 × 667 px | 2.0× | iOS | Classic Bezel |
| **Tablet** | iPad Pro 12.9" | 1024 × 1366 px | 2.0× | iPadOS | Bezel |
| **Tablet** | iPad Air 10.9" | 820 × 1180 px | 2.0× | iPadOS | Bezel |
| **Tablet** | Samsung Galaxy Tab S9 | 800 × 1280 px | 2.5× | Android | Bezel |
| **Laptop** | MacBook Air 13" | 1280 × 832 px | 2.0× | macOS | Camera Notch |
| **Laptop** | Dell XPS 15 | 1440 × 900 px | 1.5× | Windows | Borderless |
| **Desktop** | 1080p Desktop | 1920 × 1080 px | 1.0× | Desktop | Borderless |
| **Desktop** | 2K QHD Display | 2560 × 1440 px | 1.0× | Desktop | Borderless |
| **Desktop** | UltraWide Monitor | 2560 × 1080 px | 1.0× | Desktop | Borderless |
| **Custom** | User Defined | *Any* × *Any* px | 1.0× | Custom | Borderless |

---

## 📁 Project Structure

```text
responsive/
├── index.html              # Main application shell, toolbar, modals, tabs, and workspace
├── README.md               # Documentation & setup guide
├── assets/
│   └── logo.jpg            # Application logo and brand asset
├── css/
│   └── styles.css          # Design system, device mockups, bezels, themes, and UI styles
└── js/
    ├── app.js              # Application orchestrator, event bindings, and UI state
    ├── audit-engine.js     # Responsive audit heuristics, scoring logic, and DOM overflow scanner
    ├── demos.js            # Preloaded demonstration HTML/CSS templates
    ├── device-manager.js   # Device specifications, orientations, view modes, and breakpoints
    ├── editor.js           # In-browser live multi-file code editor with syntax gutter
    ├── exporter.js         # HTML audit report generation and file download handler
    └── file-loader.js      # Virtual File System, JSZip unpacker, and Blob URL manager
```

---

## 🚀 Quick Start & How to Run

Because FlexFrame Pro uses standard web technologies with no compilation step, you can run it immediately using any of the methods below:

### Method 1: Direct File Open
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

> **Note**: For full iframe DOM access and cross-origin security compatibility when testing local files, running through a local web server (Methods 2, 3, or 4) is recommended.

### Method 2: VS Code Live Server (Recommended)
1. Open the project folder in [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (`ritwickdey.liveserver`).
3. Right-click `index.html` and select **"Open with Live Server"**.

### Method 3: Python Built-in Server
Open your terminal in the project root directory and run:

```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Method 4: Node.js (npx)
```bash
# Using serve
npx serve .

# Or using http-server
npx http-server -p 8000 -c-1
```

---

## 💡 How to Use

1. **Load a Project**:
   - Click **📁 Upload Project** in the header or drag-and-drop your project files (`.zip`, folder, or individual HTML/CSS files) into the window.
   - Or click **Sample Projects** in the top navigation tab and pick one of the built-in templates (SaaS, E-commerce, Portfolio, or Legacy).
   - Or paste an external website URL into the address bar and press <kbd>Enter</kbd>.
2. **Switch Devices & Orientations**:
   - Filter device categories using the pill buttons (**Mobile**, **Tablet**, **Laptop**, **Desktop**, **All**).
   - Choose a device from the dropdown menu.
   - Use the **🔄 Rotate** button to test landscape vs. portrait orientation.
   - Toggle the **🖼️ Bezel** button to show/hide hardware frames and camera cutouts.
   - Switch between **Single** device view and **Matrix** grid view to compare multiple screens simultaneously.
3. **Run Responsiveness Audit**:
   - Click **⚡ Run Audit** in the header or open the **Audit Report** tab.
   - Review your weighted health score (0–100%) and diagnostic findings.
   - For overflow warnings, click **🔍 Highlight in viewport** to visually pinpoint the broken elements inside the mockup.
4. **Live Code & Fix**:
   - Switch to the **Live Editor** tab.
   - Select the file you want to adjust (`index.html` or linked styles).
   - Make your adjustments (e.g., replace fixed widths with `max-width: 100%`) and click **⚡ Apply** to preview the fix instantly.
5. **Export Findings**:
   - Click **📥 Export Report** to download an HTML summary of your responsiveness diagnostic report.

---

## 📊 Audit Scoring Criteria

| Audit Criterion | Severity | Penalty | Description |
| :--- | :--- | :--- | :--- |
| **Missing Viewport Meta** | Critical | `-30 pts` | Document lacks `<meta name="viewport">`, forcing mobile browsers into desktop emulation. |
| **Disabled Pinch-to-Zoom** | Warning | `-5 pts` | `user-scalable=no` detected in meta tag, restricting accessibility. |
| **Hardcoded Fixed Widths** | Critical | Up to `-25 pts` | Declarations with fixed widths (`>800px`) that prevent elements from adapting to narrow screens. |
| **Missing Fluid Image Rules** | Warning | `-10 pts` | Lacks global `img { max-width: 100%; height: auto; }` rule, risking media overflow. |
| **Absence of Media Queries** | Warning | `-15 pts` | No `@media` rules found in the loaded CSS stylesheets. |
| **Horizontal Scroll Overflow** | Critical | `-20 pts` | Rendered DOM content exceeds viewport width (`scrollWidth > clientWidth`). |
| **Small Touch Targets** | Warning | Up to `-15 pts` | Interactive elements (buttons, links) measuring under 44×44px. |
| **Unreadable Tiny Text** | Info | `-5 pts` | Text elements with computed font size below 11px. |

---

## 🛠️ Tech Stack & Libraries

- **HTML5 & CSS3**: Modern semantic structure, CSS Variables, Flexbox, CSS Grid, and custom bezel mockups.
- **JavaScript (ES6+)**: Modular object-oriented architecture (`DeviceManager`, `AuditEngine`, `FileLoader`, `CodeEditor`, `Exporter`).
- **[JSZip 3.10.1](https://stuk.github.io/jszip/)**: Client-side ZIP decompression in browser memory via CDN.
- **Blob URLs & srcdoc**: Dynamic virtual asset linking without requiring server-side file uploads.

---

## 🤝 Contributing

Contributions, feature suggestions, and bug reports are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-device-preset`).
3. Commit your changes (`git commit -m "Add new device preset"`).
4. Push to the branch (`git push origin feature/new-device-preset`).
5. Open a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
