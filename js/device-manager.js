/**
 * Device Manager Module for FlexFrame Pro
 * Handles device specs, viewport dimensions, scaling, orientation, and multi-device views.
 */

window.DEVICE_PRESETS = [
    // Mobile Devices
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'mobile', width: 393, height: 852, dpr: 3.0, os: 'iOS', icon: '', hasBezel: true, notchType: 'dynamic-island' },
    { id: 'iphone-15-promax', name: 'iPhone 15 Pro Max', category: 'mobile', width: 430, height: 932, dpr: 3.0, os: 'iOS', icon: '', hasBezel: true, notchType: 'dynamic-island' },
    { id: 'galaxy-s24', name: 'Samsung Galaxy S24', category: 'mobile', width: 412, height: 915, dpr: 3.0, os: 'Android', icon: '', hasBezel: true, notchType: 'hole-punch' },
    { id: 'pixel-8-pro', name: 'Google Pixel 8 Pro', category: 'mobile', width: 412, height: 915, dpr: 3.0, os: 'Android', icon: '', hasBezel: true, notchType: 'hole-punch' },
    { id: 'iphone-se', name: 'iPhone SE (3rd Gen)', category: 'mobile', width: 375, height: 667, dpr: 2.0, os: 'iOS', icon: '', hasBezel: true, notchType: 'classic' },
    
    // Tablets
    { id: 'ipad-pro-129', name: 'iPad Pro 12.9"', category: 'tablet', width: 1024, height: 1366, dpr: 2.0, os: 'iPadOS', icon: '', hasBezel: true, notchType: 'none' },
    { id: 'ipad-air', name: 'iPad Air 10.9"', category: 'tablet', width: 820, height: 1180, dpr: 2.0, os: 'iPadOS', icon: '', hasBezel: true, notchType: 'none' },
    { id: 'galaxy-tab-s9', name: 'Samsung Galaxy Tab S9', category: 'tablet', width: 800, height: 1280, dpr: 2.5, os: 'Android', icon: '', hasBezel: true, notchType: 'none' },

    // Laptops
    { id: 'macbook-air-13', name: 'MacBook Air 13"', category: 'laptop', width: 1280, height: 832, dpr: 2.0, os: 'macOS', icon: '', hasBezel: false, notchType: 'notch' },
    { id: 'dell-xps-15', name: 'Dell XPS 15', category: 'laptop', width: 1440, height: 900, dpr: 1.5, os: 'Windows', icon: '', hasBezel: false, notchType: 'none' },

    // Desktop
    { id: 'desktop-fhd', name: '1080p Desktop', category: 'desktop', width: 1920, height: 1080, dpr: 1.0, os: 'Desktop', icon: '', hasBezel: false, notchType: 'none' },
    { id: 'desktop-2k', name: '2K QHD Display', category: 'desktop', width: 2560, height: 1440, dpr: 1.0, os: 'Desktop', icon: '', hasBezel: false, notchType: 'none' },
    { id: 'ultrawide', name: 'UltraWide Monitor', category: 'desktop', width: 2560, height: 1080, dpr: 1.0, os: 'Desktop', icon: '', hasBezel: false, notchType: 'none' }
];

class DeviceManager {
    constructor() {
        this.currentDevice = window.DEVICE_PRESETS[0]; // iPhone 15 Pro by default
        this.isLandscape = false;
        this.scale = 1.0;
        this.isAutoFit = true; // Auto-fit by default so every device fits on any screen
        this.showBezel = true;
        this.viewMode = 'single'; // 'single' or 'matrix'
        this.activeMatrixCategory = 'all'; // 'all', 'mobile', 'tablet', 'desktop'
        this.customWidth = 800;
        this.customHeight = 600;
        this.listeners = [];
        this.zoomSteps = [0.25, 0.33, 0.5, 0.6, 0.75, 0.85, 1.0, 1.25, 1.5];
    }

    setDevice(deviceId) {
        const found = window.DEVICE_PRESETS.find(d => d.id === deviceId);
        if (found) {
            this.currentDevice = found;
            this.notify();
        }
    }

    nextDevice() {
        const list = this.activeMatrixCategory === 'all'
            ? window.DEVICE_PRESETS
            : window.DEVICE_PRESETS.filter(d => d.category === this.activeMatrixCategory);
        if (!list.length) return;
        const idx = list.findIndex(d => d.id === this.currentDevice.id);
        const nextIdx = (idx + 1) % list.length;
        this.currentDevice = list[nextIdx];
        this.notify();
    }

    prevDevice() {
        const list = this.activeMatrixCategory === 'all'
            ? window.DEVICE_PRESETS
            : window.DEVICE_PRESETS.filter(d => d.category === this.activeMatrixCategory);
        if (!list.length) return;
        const idx = list.findIndex(d => d.id === this.currentDevice.id);
        const prevIdx = (idx - 1 + list.length) % list.length;
        this.currentDevice = list[prevIdx];
        this.notify();
    }

    setCustomDimensions(width, height) {
        this.customWidth = Math.max(280, Math.min(3840, width));
        this.customHeight = Math.max(300, Math.min(2160, height));
        this.currentDevice = {
            id: 'custom',
            name: `Custom (${this.customWidth}×${this.customHeight})`,
            category: 'custom',
            width: this.customWidth,
            height: this.customHeight,
            dpr: 1.0,
            os: 'Custom',
            icon: '',
            hasBezel: false,
            notchType: 'none'
        };
        this.notify();
    }

    toggleOrientation() {
        this.isLandscape = !this.isLandscape;
        this.notify();
    }

    setAutoFit(enabled = true) {
        this.isAutoFit = !!enabled;
        this.notify();
    }

    toggleAutoFit() {
        this.isAutoFit = !this.isAutoFit;
        this.notify();
    }

    setScale(scaleFactor) {
        if (scaleFactor === 'fit' || scaleFactor === 'auto') {
            this.isAutoFit = true;
        } else {
            this.isAutoFit = false;
            const parsed = typeof scaleFactor === 'string' ? parseFloat(scaleFactor) : scaleFactor;
            this.scale = Math.max(0.15, Math.min(2.0, parsed || 1.0));
        }
        this.notify();
    }

    zoomIn() {
        this.isAutoFit = false;
        const current = this.scale;
        const next = this.zoomSteps.find(s => s > current + 0.02) || Math.min(2.0, current + 0.15);
        this.scale = Math.round(next * 100) / 100;
        this.notify();
    }

    zoomOut() {
        this.isAutoFit = false;
        const current = this.scale;
        const prev = [...this.zoomSteps].reverse().find(s => s < current - 0.02) || Math.max(0.2, current - 0.15);
        this.scale = Math.round(prev * 100) / 100;
        this.notify();
    }

    toggleBezel() {
        this.showBezel = !this.showBezel;
        this.notify();
    }

    setViewMode(mode) {
        if (mode === 'single' || mode === 'matrix') {
            this.viewMode = mode;
            this.notify();
        }
    }

    getCurrentDimensions() {
        const w = this.isLandscape ? this.currentDevice.height : this.currentDevice.width;
        const h = this.isLandscape ? this.currentDevice.width : this.currentDevice.height;
        return { width: w, height: h };
    }

    getBreakpointCategory(width) {
        if (width < 576) return { code: 'XS', label: 'Extra Small (< 576px)', color: '#ef4444' };
        if (width < 768) return { code: 'SM', label: 'Small Mobile/Tablet (576px - 767px)', color: '#f59e0b' };
        if (width < 992) return { code: 'MD', label: 'Medium Tablet (768px - 991px)', color: '#10b981' };
        if (width < 1200) return { code: 'LG', label: 'Large Laptop (992px - 1199px)', color: '#3b82f6' };
        if (width < 1400) return { code: 'XL', label: 'Extra Large Desktop (1200px - 1399px)', color: '#8b5cf6' };
        return { code: '2XL', label: 'Ultra Desktop (1400px+)', color: '#ec4899' };
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb(this));
    }
}

window.deviceManager = new DeviceManager();
