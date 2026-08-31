const researchSummaries = {
    espace: {
        ref: "DOSSIER | GÉOPOLITIQUE DE L'ESPACE",
        text: "Ce mémoire analyse la structure conflictuelle de l'espace extra-atmosphérique et redéfinit la conflictualité moderne à travers le prisme de l'environnement spatial. L'étude démontre que cette conflictualité est inévitable et dépasse largement la seule question de l'armement : elle englobe la guerre économique, la souveraineté et l'interdépendance technologique critique. La recherche d'une limite éthique à ne pas franchir s'avère centrale, bien que le mémoire établisse l'absence de frontière nette. Face aux asymétries croissantes et aux risques tactiques des puissances établies et émergentes, ce travail pose la nécessité impérieuse de refondre les doctrines de défense spatiale et de remettre en question des logiques économiques qui, par leur propre dynamique, engendrent de nouvelles conflictualités et des pertes majeures à long terme."
    },
    information: {
        ref: "DOSSIER | GUERRE DE L'INFORMATION",
        text: "Ce mémoire de recherche analyse le pouvoir inhérent et structurant des narratifs sur la géopolitique et l'environnement politique à l'ère de la désinformation et de la post-vérité. En décortiquant les mécanismes d'emprise narrative, ce travail établit que la manipulation informationnelle représente un danger systémique pour la stabilité internationale et la survie des démocraties. L'étude démontre que l'avènement d'un environnement de post-vérité permanent [ apparu concrètement à partir de 2016 ] trouve sa cause première dans la structure même des plateformes numériques et médiatiques contemporaines, dont elle préconise une refonte et une régulation globales indispensables."
    },
    goldendome: {
        ref: "DOSSIER | GOLDEN DOME & IDS",
        text: "Analyse comparative entre l'Initiative de Défense Stratégique (IDS) de Reagan des années 1980 et le bouclier multicouche contemporain Golden Dome. Ce dossier examine la faisabilité économique et technologique du dispositif, sa vulnérabilité face aux planeurs hypersoniques et les risques doctrinaux associés à la défense antimissile. L'étude démontre que le Golden Dome est nettement plus réaliste et mature que l'IDS grâce à un écosystème spatial et technologique commercial accessible. Loin d'être un bouclier hermétique parfait, ce système constitue un outil de défense mesuré mais décisif : il réintroduit une incertitude critique chez les adversaires face aux frappes saturantes ou disproportionnées, renforçant considérablement l'effet de dissuasion conventionnelle et nucléaire sans prétendre à une invulnérabilité absolue."
    }
};

function handleAssetError(img) {
    const parent = img.parentElement;
    if (!parent) return;

    const src = img.getAttribute('src') || '';
    const parts = src.split('/');
    const fileName = parts.pop() || 'fichier-inconnu';
    const folderPath = parts.join('/') + '/';

    parent.innerHTML = `
        <div class="missing-asset-notice">
            <span class="missing-tag">[ ASSET MANQUANT ]</span>
            <span class="missing-path">EMPLACEMENT : ${folderPath}</span>
            <span class="missing-file">FICHIER : ${fileName}</span>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Animation au scroll
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Animation Résumé Profil Top (Phrase captivante & pluridisciplinaire)
    const trigger = document.getElementById('summaryTrigger');
    const badge = document.getElementById('summaryBadge');
    const output = document.getElementById('summaryTextOutput');

    const fullIntroText = "Analyste des dynamiques géopolitiques et stratégiques, je déploie une approche résolument pluridisciplinaire au croisement des relations internationales, de la philosophie politique, de l'éthique et du management. Ma méthodologie éprouve les vulnérabilités structurelles contemporaines : guerre économique, confrontation informationnelle, militarisation des espaces critiques et logiques de contingence face aux chocs imprévus.\n\nVous trouverez ici mes analyses, mes travaux de recherches, mes projets et mes artworks.";

    let hasIntroRun = false;

    if (trigger && badge && output) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasIntroRun) {
                    hasIntroRun = true;
                    obs.unobserve(entry.target);
                    setTimeout(() => {
                        badge.classList.add('flipped');
                        setTimeout(() => {
                            badge.textContent = "Résumé";
                            badge.style.color = "var(--color-gold)";
                            
                            let index = 0;
                            output.innerHTML = '';
                            function step() {
                                if (index < fullIntroText.length) {
                                    const char = fullIntroText.charAt(index);
                                    output.innerHTML += char === '\n' ? '<br>' : char;
                                    index++;
                                    setTimeout(step, 6);
                                }
                            }
                            step();
                        }, 180);
                    }, 300);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(trigger);
    }

    // 3. Cartes de Recherche 100% Cliquables
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('click', () => {
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    });

    // 4. Gestionnaire de Résumé Dynamique
    const summaryDock = document.getElementById('researchSummaryDock');
    const docBadge = document.getElementById('docSummaryBadge');
    const docRef = document.getElementById('docBadgeTitle');
    const docOutput = document.getElementById('docSummaryTextOutput');
    const closeDocBtn = document.getElementById('closeDocSummary');
    const triggerButtons = document.querySelectorAll('.btn-trigger-summary');

    let typingTimer = null;

    triggerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            const docKey = btn.getAttribute('data-doc');
            const data = researchSummaries[docKey];
            if (!data) return;

            triggerButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            summaryDock.classList.add('open');

            if (typingTimer) clearTimeout(typingTimer);
            docBadge.classList.remove('flipped');
            docBadge.textContent = "Analyse";
            docBadge.style.color = "#ffffff";
            docRef.textContent = data.ref;
            docOutput.innerHTML = "";

            setTimeout(() => {
                docBadge.classList.add('flipped');
                setTimeout(() => {
                    docBadge.textContent = "Résumé";
                    docBadge.style.color = "var(--color-gold)";

                    let i = 0;
                    function typeDoc() {
                        if (i < data.text.length) {
                            docOutput.innerHTML += data.text.charAt(i);
                            i++;
                            typingTimer = setTimeout(typeDoc, 6);
                        }
                    }
                    typeDoc();
                }, 180);
            }, 250);
        });
    });

    if (closeDocBtn) {
        closeDocBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            summaryDock.classList.remove('open');
            triggerButtons.forEach(b => b.classList.remove('active'));
            if (typingTimer) clearTimeout(typingTimer);
        });
    }
});