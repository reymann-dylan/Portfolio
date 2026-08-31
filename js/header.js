// Fonction de chargement automatique et transparent de data/projects.js
function loadProjectsData(base) {
    return new Promise((resolve) => {
        if (window.PROJECTS_DATA && window.PROJECTS_DATA.length > 0) {
            resolve(window.PROJECTS_DATA);
            return;
        }

        const script = document.createElement('script');
        script.src = `${base}data/projects.js?v=${Date.now()}`;
        script.onload = () => {
            resolve(window.PROJECTS_DATA || []);
        };
        script.onerror = () => {
            resolve([]);
        };
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    const currentPage = document.body.dataset.page || '';
    const path = window.location.pathname;
    const isSubfolder = path.includes('/projets/') || path.includes('/portfolio/') || path.includes('/dossiers/');
    const base = isSubfolder ? '../' : './';

    // Récupération automatique des projets sans toucher aux fichiers HTML
    const projects = await loadProjectsData(base);

    let projectsDropdownHtml = '';
    if (projects.length > 0) {
        projectsDropdownHtml = projects.map(p => {
            const targetUrl = isSubfolder ? `${base}${p.url}` : p.url;
            const iconMarkup = p.icon 
                ? `<img src="${base}${p.icon}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                   <svg class="subproject-icon-svg" viewBox="0 0 24 24" style="display:none;"><path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10,9 15,12 10,15" fill="currentColor"/></svg>`
                : `<svg class="subproject-icon-svg" viewBox="0 0 24 24"><path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10,9 15,12 10,15" fill="currentColor"/></svg>`;

            return `
                <a href="${targetUrl}" class="subproject-item-link">
                    <div class="subproject-icon-box">${iconMarkup}</div>
                    <div class="subproject-text-group">
                        <span class="subproject-title">${p.title}</span>
                        <span class="subproject-meta">${p.category} | ${p.status}</span>
                    </div>
                </a>
            `;
        }).join('');
    } else {
        projectsDropdownHtml = `<span class="subproject-empty-tag">AUCUN PROJET ACTIF</span>`;
    }

    headerContainer.innerHTML = `
        <div class="header-container">
            <a href="${base}index.html" class="brand-capsule">
                <img src="${base}assets/images/logo-contingence-white.png" alt="Logo" class="header-brand-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <svg viewBox="0 0 100 100" style="display:none; width:18px; height:18px;">
                    <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#ffffff" stroke-width="8"/>
                </svg>
                <div>CONTINGENCE <span>| PORTFOLIO</span></div>
            </a>

            <nav class="nav-tabs-group">
                <a href="${base}index.html" class="nav-tab-btn ${currentPage === 'accueil' ? 'active' : ''}">Accueil</a>
                <a href="${base}portfolio.html" class="nav-tab-btn ${currentPage === 'portfolio' ? 'active' : ''}">Portfolio</a>
                <div class="has-dropdown">
                    <a href="${base}projets.html" class="nav-tab-btn ${currentPage === 'projets' ? 'active' : ''}">Projets</a>
                    <div class="subprojects-flyout">${projectsDropdownHtml}</div>
                </div>
                <a href="${base}contingence.html" class="nav-tab-btn ${currentPage === 'contingence' ? 'active' : ''}">Contingence</a>
            </nav>

            <div class="header-actions-end">
                <a href="https://github.com/reymann-dylan" target="_blank" class="icon-social-link" title="GitHub" rel="noopener">
                    <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/dylan-reymann/" target="_blank" class="icon-social-link" title="LinkedIn" rel="noopener">
                    <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <button class="btn-contact-gold" id="triggerContact">CONTACT &gt;_</button>
                <button class="btn-burger-menu" id="burgerToggle">MENU ☰</button>
            </div>
        </div>

        <div class="mobile-drawer-pane" id="mobileNavPane">
            <a href="${base}index.html" class="nav-tab-btn">Accueil</a>
            <a href="${base}portfolio.html" class="nav-tab-btn">Portfolio</a>
            <a href="${base}projets.html" class="nav-tab-btn">Projets</a>
            <a href="${base}contingence.html" class="nav-tab-btn">Contingence</a>
        </div>
    `;

    const burger = document.getElementById('burgerToggle');
    const drawer = document.getElementById('mobileNavPane');
    if (burger && drawer) {
        burger.addEventListener('click', () => drawer.classList.toggle('open'));
    }

    const existingFooter = document.querySelector('footer');
    if (!existingFooter) {
        const footerEl = document.createElement('footer');
        footerEl.className = 'site-bottom-footer';
        footerEl.innerHTML = `
            <div class="footer-container">
                <div class="footer-col-credits">
                    <p>DESIGN OPEN SOURCE DISPONIBLE SUR <a href="https://github.com/reymann-dylan" target="_blank" rel="noopener">GITHUB</a></p>
                    <p>DESIGNÉ SUR PHOTOSHOP, CONÇU EN PARTIE AVEC GEMINI (IA)</p>
                </div>
                <div class="footer-col-copyright">
                    <p>&copy; 2026 REYMANN DYLAN — PORTFOLIO</p>
                </div>
            </div>
        `;
        document.body.appendChild(footerEl);
    }
});