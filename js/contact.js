document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('contactDrawer');
    const overlay = document.getElementById('contactOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');

    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'triggerContact') {
            if (drawer && overlay) {
                drawer.classList.add('open');
                overlay.classList.add('open');
            }
        }
    });

    function dismissDrawer() {
        if (drawer && overlay) {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', dismissDrawer);
    if (overlay) overlay.addEventListener('click', dismissDrawer);

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    alert("Transmission effectuée avec succès.");
                    form.reset();
                    dismissDrawer();
                } else {
                    alert("Erreur lors de la transmission du message.");
                }
            } catch (err) {
                alert("Erreur réseau.");
            }
        });
    }
});