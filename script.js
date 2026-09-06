let activeCategory = 'all';

/* ==========================================================================
   2. MAIN LOGS/CONTENT RENDERING ENGINE (WITH HYPERLINKED BADGES)
   ========================================================================== */
function renderLogs() {
    const container = document.getElementById('logContainer');
    if (!container) return; // Exit gracefully if handled on sub-pages without this container
    
    const searchBarNode = document.getElementById('searchBar');
    const searchInput = searchBarNode ? searchBarNode.value.toLowerCase() : '';
    container.innerHTML = '';

    // Filter array data based on active domain category and input search strings
    const filteredData = dbaConcepts.filter(item => {
        const matchesCategory = (activeCategory === 'all' || item.category === activeCategory);
        const matchesSearch = item.title.toLowerCase().includes(searchInput) || 
                              item.summary.toLowerCase().includes(searchInput) || 
                              item.content.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });

    // Handle empty database results states gracefully
    if (filteredData.length === 0) {
        container.innerHTML = `<div class="no-results">No logbook entries match your search criteria.</div>`;
        return;
    }

    // Build and inject DOM nodes dynamically into layout view tree profiles
    filteredData.forEach(item => {
        // Dynamic navigation routing maps assigned to categories
        let pageLink = "#";
        if (item.category === "Architecture") pageLink = "architecture.html";
        if (item.category === "Performance") pageLink = "tuning.html";
        if (item.category === "Backup") pageLink = "backup.html";
        if (item.category === "Multitenant") pageLink = "multitenant.html"; 
        if (item.category === "Troubleshooting") pageLink = "troubleshooting.html"; 
        if (item.category === "Patching") pageLink = "patching.html";
        if (item.category === "Storage") pageLink = "tablespace.html";
        if (item.category === "Archiver") pageLink = "archiver.html";
        if (item.category === "Pre-Checks") pageLink = "prechecks.html";
        if (item.category === "Security") pageLink = "security.html";
        if (item.category === "RAC") pageLink = "rac.html";
        if (item.category === "Automation") pageLink = "automation.html";
        if (item.category === "Cloud") pageLink = "cloud.html"; 
        if (item.category === "DataPump") pageLink = "datapump.html";
        if (item.category === "Baselines") pageLink = "baselines.html";
        if (item.category === "Pinning") pageLink = "sql_pinning.html"; 
        if (item.category === "Auditing") pageLink = "auditing.html";

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${item.title}</h2>
                <div class="card-meta">
                    <!-- Functional navigation tag link -->
                    <a href="${pageLink}" class="badge" style="text-decoration: none; cursor: pointer;">
                        ${item.category}
                    </a>
                </div>
            </div>
            <div class="card-body">
                <p><strong>Overview:</strong> ${item.summary}</p>
                <p>${item.content}</p>
                <div class="code-container">
                    <button class="copy-btn" onclick="copyToClipboard('${item.id}', this)">Copy</button>
                    <pre><code id="${item.id}">${escapeHtml(item.code)}</code></pre>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function changeCategory(category, buttonId) {
    activeCategory = category;
    
    // Manage active sidebar navigational layout highlight loops
    document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
    const targetedBtn = document.getElementById(buttonId);
    if (targetedBtn) targetedBtn.classList.add('active');
    
    renderLogs();
}

// Security sanitization utility against code character layout structural breakage
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt bridge;");
}

/* ==========================================================================
   3. ASYNCHRONOUS CLIPBOARD SCRIPT COPY ENGINE
   ========================================================================== */
function copyToClipboard(elementId, buttonElement) {
    const codeText = document.getElementById(elementId).innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        buttonElement.innerText = "Copied!";
        buttonElement.style.backgroundColor = "#22c55e"; // Success Green Accent 
        buttonElement.style.color = "#ffffff";
        
        // Restore styling variables back to defaults after 2 seconds execution delay
        setTimeout(() => {
            buttonElement.innerText = "Copy";
            buttonElement.style.backgroundColor = "";
            buttonElement.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error('System failed to gain clipboard access controls: ', err);
    });
}

/* ==========================================================================
   4. ROUTINE EVENT TRIGGER BINDINGS & DOM CONTENT LOADING HANDLING
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const searchField = document.getElementById('searchBar');
    if (searchField) searchField.addEventListener('input', renderLogs);

    const bindBtn = (id, cat) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => changeCategory(cat, id));
    };
    
    bindBtn('btn-all', 'all');
    bindBtn('btn-architecture', 'Architecture');
    bindBtn('btn-performance', 'Performance');
    bindBtn('btn-backup', 'Backup');
    bindBtn('btn-multitenant', 'Multitenant');
    bindBtn('btn-troubleshooting', 'Troubleshooting');
    bindBtn('btn-patching', 'Patching');
    bindBtn('btn-storage', 'Storage'); 
    bindBtn('btn-archiver', 'Archiver');
    bindBtn('btn-prechecks', 'Pre-Checks'); 
    bindBtn('btn-security', 'Security');
    bindBtn('btn-rac', 'RAC');
    bindBtn('btn-automation', 'Automation');
    bindBtn('btn-cloud', 'Cloud'); 
    bindBtn('btn-datapump', 'DataPump');
    bindBtn('btn-baselines', 'Baselines');
    bindBtn('btn-pinning', 'Pinning');
    bindBtn('btn-auditing', 'Auditing');

    // Initialize presentation view configurations immediately
    renderLogs();
});
