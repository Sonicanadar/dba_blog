/* ==========================================================================
   GLOBAL HEADER & FOOTER INJECTION ENGINE (Unified UI Template)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get current page filename to detect active styling constraints
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    // 2. Identify and isolate sub-page conditional profiles
    const isHomePage = (pageName === 'index.html' || pageName === '');

    // 3. Build context-aware navigation layout elements
    const navigationControls = isHomePage 
        ? '' // Home page keeps title clean without an overlapping home button layout
        : `<a href="index.html" class="theme-toggle-btn" style="text-decoration: none; position: static;">🏠 Back to Home</a>`;

    // ==========================================
    // A. INJECT HEADER LAYOUT (Banner Removed)
    // ==========================================
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.className = "dark-theme"; 
        
        // ⚡ FIXED: Set this to a blank string to remove the terminal box entirely
        const profileBannerMarkup = ''; 

        headerElement.innerHTML = `
            <div class="header-content">
                <h1>The Oracle DBA Logbook</h1>
                <p>Production reference scripts, architectural blueprints, and critical error triage metrics.</p>
                ${profileBannerMarkup}
            </div>
            <!-- Unified Corner Action Panel Wrapper Control Group -->
            <div class="header-actions-wrap">
                ${navigationControls}
                <button id="themeToggleBtn" class="theme-toggle-btn" style="position: static;">☀️ Light Mode</button>
            </div>
        `;
    }


    // ==========================================
    // B. INJECT FOOTER LAYOUT
    // ==========================================
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.className = "site-footer";
        footerElement.innerHTML = `
            <nav class="footer-nav">
                <a href="index.html" class="${pageName === 'index.html' ? 'active-foot' : ''}">📋 Logbook Feed</a>
                <a href="architecture.html" class="${pageName === 'architecture.html' ? 'active-foot' : ''}">📊 Architecture</a>
                <a href="tuning.html" class="${pageName === 'tuning.html' ? 'active-foot' : ''}">⚡ Tuning</a>
                <a href="backup.html" class="${pageName === 'backup.html' ? 'active-foot' : ''}">💾 Backup</a>
                <a href="multitenant.html" class="${pageName === 'multitenant.html' ? 'active-foot' : ''}">📦 Multitenant</a>
                <a href="troubleshooting.html" class="${pageName === 'troubleshooting.html' ? 'active-foot' : ''}">🚨 Triage</a>
                <a href="patching.html" class="${pageName === 'patching.html' ? 'active-foot' : ''}">🛠️ Patching</a>
                <a href="tablespace.html" class="${pageName === 'tablespace.html' ? 'active-foot' : ''}">📁 Storage</a>
                <a href="archiver.html" class="${pageName === 'archiver.html' ? 'active-foot' : ''}">🔥 Archiver</a>
                <a href="prechecks.html" class="${pageName === 'prechecks.html' ? 'active-foot' : ''}">🔍 Pre-Checks</a>
                <a href="security.html" class="${pageName === 'security.html' ? 'active-foot' : ''}">🛡️ Security</a>
                <a href="rac.html" class="${pageName === 'rac.html' ? 'active-foot' : ''}">🕸️ RAC</a>
                <a href="automation.html" class="${pageName === 'automation.html' ? 'active-foot' : ''}">🤖 Automation</a>
                <a href="cloud.html" class="${pageName === 'cloud.html' ? 'active-foot' : ''}">☁️ Cloud</a>
                <a href="datapump.html" class="${pageName === 'datapump.html' ? 'active-foot' : ''}">📦 Data Pump</a>
                <a href="baselines.html" class="${pageName === 'baselines.html' ? 'active-foot' : ''}">📈 Baselines</a>
                <a href="sql_pinning.html" class="${pageName === 'sql_pinning.html' ? 'active-foot' : ''}">📌 Pinning</a>
                <a href="auditing.html" class="${pageName === 'auditing.html' ? 'active-foot' : ''}">🛡️ Auditing</a>
            </nav>
        `;
    }

    // ==========================================
    // C. INITIALIZE THE THEME SWITCHER LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bodyElement = document.body;

    function applyTheme(theme) {
        if (theme === 'light-theme') {
            bodyElement.classList.remove('dark-theme');
            bodyElement.classList.add('light-theme');
            if (themeToggleBtn) themeToggleBtn.innerText = "🌙 Dark Mode";
            localStorage.setItem('preferred-dba-theme', 'light-theme');
        } else {
            bodyElement.classList.remove('light-theme');
            bodyElement.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.innerText = "☀️ Light Mode";
            localStorage.setItem('preferred-dba-theme', 'dark-theme');
        }
    }

    const savedTheme = localStorage.getItem('preferred-dba-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(systemPrefersDark ? 'dark-theme' : 'light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            applyTheme(bodyElement.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme');
        });
    }
});
