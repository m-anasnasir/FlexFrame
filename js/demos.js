/**
 * Pre-loaded Demo Templates for FlexFrame Pro
 * Contains sample HTML/CSS projects to demonstrate responsive vs non-responsive behaviors.
 */

window.DEMO_TEMPLATES = {
    saas: {
        id: 'saas',
        title: 'Modern SaaS Landing Page',
        subtitle: 'Fully Responsive • Flexbox & Grid • Fluid Typography',
        badge: 'Responsive 100%',
        badgeClass: 'badge-success',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Cloud - Modern SaaS Platform</title>
  <style>
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: #334155;
      --accent: #06b6d4;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding-bottom: 3rem;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 5%;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(12px);
      z-index: 100;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    nav a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    nav a:hover { color: var(--text); }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0.6rem 1.4rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    .btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
    
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text);
      font-size: 1.5rem;
      cursor: pointer;
      min-height: 44px;
      min-width: 44px;
    }
    
    .hero {
      text-align: center;
      padding: 4rem 1.5rem 3rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.9rem;
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }
    .hero h1 {
      font-size: clamp(2rem, 5vw, 3.75rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }
    .hero p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--text-muted);
      margin-bottom: 2rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .features {
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 1.5rem;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .feature-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.75rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
    }
    .feature-icon {
      width: 48px;
      height: 48px;
      background: rgba(99, 102, 241, 0.1);
      color: var(--primary);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .feature-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .pricing {
      max-width: 1100px;
      margin: 4rem auto;
      padding: 0 1.5rem;
    }
    .pricing-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .price-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .price-card.popular {
      border-color: var(--primary);
      box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
    }
    .price {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 1rem 0;
    }
    .price span { font-size: 1rem; color: var(--text-muted); font-weight: 400; }
    .price-card ul {
      list-style: none;
      margin: 1.5rem 0 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      color: var(--text-muted);
      flex: 1;
    }
    .price-card ul li::before {
      content: "✓ ";
      color: var(--accent);
      font-weight: bold;
    }

    /* Media Queries for Navigation Breakdown */
    @media (max-width: 768px) {
      header nav {
        display: none;
      }
      .mobile-menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hero-cta {
        flex-direction: column;
      }
      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">ApexCloud</div>
    <nav>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#solutions">Solutions</a>
      <a href="#docs">Docs</a>
      <a href="#login" class="btn btn-outline" style="min-height: 40px; padding: 0.4rem 1rem;">Sign In</a>
      <a href="#signup" class="btn btn-primary" style="min-height: 40px; padding: 0.4rem 1rem;">Get Started</a>
    </nav>
    <button class="mobile-menu-btn" aria-label="Open menu">☰</button>
  </header>

  <main>
    <section class="hero">
      <span class="badge">Next-Gen Cloud Platform v3.0</span>
      <h1>Deploy scalable apps in seconds, not hours.</h1>
      <p>ApexCloud delivers high-performance multi-region edge hosting with automated CI/CD pipelines and built-in responsiveness testing.</p>
      <div class="hero-cta">
        <button class="btn btn-primary">Start Free Trial →</button>
        <button class="btn btn-outline">Explore Live Demo</button>
      </div>
    </section>

    <section class="features" id="features">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">Global</div>
          <h3>Global Edge Network</h3>
          <p>Deploy your full-stack applications across 300+ edge locations worldwide for sub-50ms latencies.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">Mobile</div>
          <h3>Fluid Mobile Responsive</h3>
          <p>Built with container queries and adaptive typography that automatically looks stunning on every screen size.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Zero-Trust Security</h3>
          <p>Automated SSL certification, DDoS protection, and instant web application firewall rules out of the box.</p>
        </div>
      </div>
    </section>

    <section class="pricing" id="pricing">
      <div class="pricing-header">
        <h2>Simple, Transparent Pricing</h2>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Choose the plan that fits your growth strategy.</p>
      </div>
      <div class="pricing-grid">
        <div class="price-card">
          <h3>Starter</h3>
          <div class="price">$19<span>/mo</span></div>
          <p style="color: var(--text-muted); font-size: 0.9rem;">For individual developers & side projects.</p>
          <ul>
            <li>5 Active Projects</li>
            <li>100GB Global Bandwidth</li>
            <li>Automated Responsive Audit</li>
            <li>Community Support</li>
          </ul>
          <button class="btn btn-outline">Get Started</button>
        </div>

        <div class="price-card popular">
          <span class="badge" style="position: absolute; top: -12px; right: 20px;">Most Popular</span>
          <h3>Pro Team</h3>
          <div class="price">$49<span>/mo</span></div>
          <p style="color: var(--text-muted); font-size: 0.9rem;">For fast-growing product teams.</p>
          <ul>
            <li>Unlimited Projects</li>
            <li>1TB Global Bandwidth</li>
            <li>Real-time Device Simulation</li>
            <li>Custom Domain SSL</li>
            <li>24/7 Priority Support</li>
          </ul>
          <button class="btn btn-primary">Start 14-Day Free Trial</button>
        </div>
      </div>
    </section>
  </main>

</body>
</html>`
    },

    ecommerce: {
        id: 'ecommerce',
        title: 'Modern E-Commerce Storefront',
        subtitle: 'Adaptive Product Grid • Mobile Navigation Bar • Touch Friendly',
        badge: 'Responsive 98%',
        badgeClass: 'badge-success',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VogueStyle - Fashion & Accessories</title>
  <style>
    :root {
      --bg: #fafafa;
      --card-bg: #ffffff;
      --text: #171717;
      --text-muted: #737373;
      --accent: #e11d48;
      --border: #e5e5e5;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 70px;
    }
    .top-announcement {
      background: #171717;
      color: white;
      text-align: center;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 500;
    }
    header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border);
      padding: 1rem 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand { font-size: 1.6rem; font-weight: 900; letter-spacing: -0.05em; color: var(--text); }
    .brand span { color: var(--accent); }
    .search-box {
      flex: 1;
      max-width: 400px;
      margin: 0 2rem;
      position: relative;
    }
    .search-box input {
      width: 100%;
      padding: 0.6rem 1rem 0.6rem 2.4rem;
      border: 1px solid var(--border);
      border-radius: 50px;
      outline: none;
      background: #f5f5f5;
    }
    .header-actions { display: flex; gap: 1.25rem; align-items: center; }
    .icon-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      position: relative;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cart-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: var(--accent);
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero-banner {
      background: linear-gradient(135deg, #ffe4e6 0%, #ccfbf1 100%);
      padding: 3rem 5%;
      border-radius: 0 0 24px 24px;
      margin-bottom: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .hero-content h1 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; margin-bottom: 0.75rem; }
    .hero-content p { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.5rem; }
    .shop-now-btn {
      background: var(--text);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 50px;
      border: none;
      font-weight: 700;
      cursor: pointer;
      min-height: 48px;
    }

    .products-section { padding: 0 5%; max-width: 1300px; margin: 0 auto; }
    .section-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.06); }
    .product-img {
      height: 220px;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      position: relative;
    }
    .product-info { padding: 1.25rem; display: flex; flex-direction: column; flex: 1; }
    .product-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem; }
    .product-cat { color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.75rem; }
    .product-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
    .price { font-weight: 800; font-size: 1.2rem; }
    .add-btn {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.5rem 0.9rem;
      font-weight: 600;
      cursor: pointer;
      min-height: 44px;
    }
    .add-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }

    /* Mobile Bottom Navigation */
    .mobile-bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--card-bg);
      border-top: 1px solid var(--border);
      padding: 0.5rem 1rem;
      justify-content: space-around;
      z-index: 100;
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-decoration: none;
    }
    .nav-item.active { color: var(--accent); font-weight: bold; }

    @media (max-width: 640px) {
      .search-box { display: none; }
      .mobile-bottom-nav { display: flex; }
      .product-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
      .product-img { height: 160px; font-size: 3rem; }
      .product-info { padding: 0.85rem; }
    }
  </style>
</head>
<body>

  <div class="top-announcement">Autumn Collection Sale: Up to 40% OFF with code <b>AUTUMN2026</b></div>

  <header>
    <div class="brand">Vogue<span>.</span></div>
    <div class="search-box">
      <input type="text" placeholder="Search products, brands...">
    </div>
    <div class="header-actions">
      <button class="icon-btn" title="Search">Search</button>
      <button class="icon-btn" title="Cart">Cart<span class="cart-badge">3</span></button>
    </div>
  </header>

  <div class="hero-banner">
    <div class="hero-content">
      <h1>Elevate Your Everyday Style</h1>
      <p>Discover minimalist apparel and timeless accessories designed for comfort.</p>
      <button class="shop-now-btn">Explore Collection</button>
    </div>
    <div style="font-size: 6rem;">👜</div>
  </div>

  <section class="products-section">
    <h2 class="section-title">Trending Products</h2>
    <div class="product-grid">
      <div class="product-card">
        <div class="product-img">👟</div>
        <div class="product-info">
          <div class="product-title">Urban Runner Sneakers</div>
          <div class="product-cat">Footwear</div>
          <div class="product-bottom">
            <div class="price">$129</div>
            <button class="add-btn">+ Add</button>
          </div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img">⌚</div>
        <div class="product-info">
          <div class="product-title">Chronograph Watch</div>
          <div class="product-cat">Accessories</div>
          <div class="product-bottom">
            <div class="price">$189</div>
            <button class="add-btn">+ Add</button>
          </div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img">Sunglasses</div>
        <div class="product-info">
          <div class="product-title">Polarized Sunglasses</div>
          <div class="product-cat">Eyewear</div>
          <div class="product-bottom">
            <div class="price">$79</div>
            <button class="add-btn">+ Add</button>
          </div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img">Travel pack</div>
        <div class="product-info">
          <div class="product-title">Leather Travel Pack</div>
          <div class="product-cat">Bags</div>
          <div class="product-bottom">
            <div class="price">$149</div>
            <button class="add-btn">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <nav class="mobile-bottom-nav">
    <a href="#" class="nav-item active">Home</a>
    <a href="#" class="nav-item">Search</a>
    <a href="#" class="nav-item">Cart</a>
    <a href="#" class="nav-item">Account</a>
  </nav>

</body>
</html>`
    },

    legacy: {
        id: 'legacy',
        title: 'Non-Responsive Legacy Website (Audit Test Case)',
        subtitle: 'Fixed 1200px Width • Missing Viewport Meta • Small Touch Targets',
        badge: 'Non-Responsive 32%',
        badgeClass: 'badge-danger',
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Old Tech Enterprise Systems (1999)</title>
  <!-- INTENTIONALLY MISSING <meta name="viewport"> TO TEST AUDIT DETECTION -->
  <style>
    body {
      background-color: #c0c0c0;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      /* Fixed width body creates overflow on mobile! */
      width: 1200px;
    }
    #container {
      width: 1200px;
      margin: 0 auto;
      background: white;
      border: 3px double #000;
    }
    #header {
      background-color: #000080;
      color: white;
      padding: 20px;
      text-align: center;
    }
    #menu {
      background: #d3d3d3;
      padding: 5px;
      width: 1200px;
    }
    #menu a {
      font-size: 8px; /* Intentionally tiny font */
      margin-right: 4px;
      color: black;
      text-decoration: none;
      padding: 1px 2px; /* Touch target way too small (< 44px) */
    }
    .content-table {
      width: 1200px;
      border-collapse: collapse;
    }
    .sidebar {
      width: 300px;
      background: #e6e6e6;
      vertical-align: top;
      padding: 10px;
      font-size: 9px;
    }
    .main-body {
      width: 900px;
      vertical-align: top;
      padding: 15px;
    }
    /* Fixed width images that burst out of container */
    .big-image {
      width: 850px;
      height: 350px;
      background: linear-gradient(45deg, #ff9999, #6699ff);
      color: white;
      font-size: 24px;
      text-align: center;
      line-height: 350px;
    }
    .warning-box {
      background: #ffffcc;
      border: 1px solid red;
      padding: 10px;
      margin: 10px 0;
      font-size: 10px;
    }
  </style>
</head>
<body>

  <div id="container">
    <div id="header">
      <h1>ACME ENTERPRISE SOLUTIONS INC.</h1>
      <p style="font-size: 10px;">Best viewed in 1024x768 resolution on Internet Explorer 6.0</p>
    </div>

    <div id="menu">
      <a href="#">[Home]</a>
      <a href="#">[Company Profile]</a>
      <a href="#">[Products & Solutions]</a>
      <a href="#">[Investor Relations]</a>
      <a href="#">[Global Partners]</a>
      <a href="#">[Support Desk]</a>
      <a href="#">[Contact Us]</a>
    </div>

    <table class="content-table">
      <tr>
        <td class="sidebar">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Legacy Download (2.4MB)</a></li>
            <li><a href="#">System Manual PDF</a></li>
            <li><a href="#">Server Status Page</a></li>
          </ul>
          <div class="warning-box">
            <b>Notice:</b> This site requires JavaScript 1.2 and 1200px desktop monitor.
          </div>
        </td>
        <td class="main-body">
          <h2>Welcome to Enterprise Solutions Portal</h2>
          <p style="font-size: 11px;">Our software provides mission critical infrastructure for banking, telecommunications, and logistics enterprise networks.</p>
          
          <div class="big-image">FIXED WIDTH BANNER (850px Wide)</div>

          <h3>System Specifications Table</h3>
          <table border="1" width="850" cellpadding="5">
            <tr bgcolor="#cccccc">
              <th>Module</th>
              <th>Requirement</th>
              <th>Bandwidth</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Core DB</td>
              <td>Oracle 9i</td>
              <td>10 Mbps</td>
              <td>Online</td>
            </tr>
            <tr>
              <td>Cluster Sync</td>
              <td>Unix AIX</td>
              <td>100 Mbps</td>
              <td>Active</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>

</body>
</html>`
    },

    portfolio: {
        id: 'portfolio',
        title: 'Creative Developer Portfolio',
        subtitle: 'Glassmorphism Design • Smooth Animations • Touch Slider',
        badge: 'Responsive 96%',
        badgeClass: 'badge-success',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera - Lead UI/UX Engineer</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(255, 255, 255, 0.04);
      --border: rgba(255, 255, 255, 0.1);
      --accent: #8b5cf6;
      --accent-cyan: #06b6d4;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 0 5% 4rem;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 0;
      border-bottom: 1px solid var(--border);
    }
    .brand-logo { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; }
    .brand-logo span { color: var(--accent-cyan); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-weight: 500; }
    .nav-links a:hover { color: var(--accent-cyan); }

    .hero {
      padding: 5rem 0 3rem;
      max-width: 800px;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.3);
      color: var(--accent-cyan);
      border-radius: 50px;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .dot { width: 8px; height: 8px; background: var(--accent-cyan); border-radius: 50%; display: inline-block; }
    .hero h1 {
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 650px; }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
    .portfolio-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 1.75rem;
      backdrop-filter: blur(12px);
      transition: all 0.3s;
    }
    .portfolio-card:hover {
      border-color: var(--accent);
      transform: translateY(-5px);
    }
    .card-tag { font-size: 0.75rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem; }
    .card-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; }
    .card-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; }
    .tech-stack { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .tech-pill {
      background: rgba(255,255,255,0.06);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero { padding: 2.5rem 0 1.5rem; }
    }
  </style>
</head>
<body>

  <nav>
    <div class="brand-logo">alex<span>.dev</span></div>
    <ul class="nav-links">
      <li><a href="#">Work</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Lab</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <main>
    <section class="hero">
      <div class="status-pill"><span class="dot"></span> Available for Q4 Engineering Contracts</div>
      <h1>Building fluid digital interfaces for high-scale products.</h1>
      <p>I craft performant, accessible web apps with modern CSS architecture, micro-animations, and responsive systems.</p>
    </section>

    <h2 style="font-size: 1.5rem; margin-top: 2rem;">Featured Projects</h2>
    <div class="grid-container">
      <div class="portfolio-card">
        <div class="card-tag">Web Application</div>
        <div class="card-title">Fintech Analytics Dashboard</div>
        <div class="card-desc">Real-time stock portfolio tracker built with container queries and responsive charts.</div>
        <div class="tech-stack">
          <span class="tech-pill">React</span>
          <span class="tech-pill">TypeScript</span>
          <span class="tech-pill">Tailwind CSS</span>
        </div>
      </div>
      <div class="portfolio-card">
        <div class="card-tag">Design System</div>
        <div class="card-title">Aura UI Component Library</div>
        <div class="card-desc">Comprehensive mobile-first design token engine used by over 50,000 active developers.</div>
        <div class="tech-stack">
          <span class="tech-pill">Web Components</span>
          <span class="tech-pill">CSS Modules</span>
        </div>
      </div>
    </div>
  </main>

</body>
</html>`
    }
};
