document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('artworksViewport');
    const track = document.getElementById('artworksTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const modal = document.getElementById('imageModal');
    const targetImg = document.getElementById('lightboxTargetImg');
    const closeBtn = document.getElementById('closeLightboxBtn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => track.scrollBy({ left: -570, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => track.scrollBy({ left: 570, behavior: 'smooth' }));

        track.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                track.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }

    // Drag-to-scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDraggingMotion = false;

    if (viewport && track) {
        viewport.addEventListener('mousedown', (e) => {
            isDown = true;
            isDraggingMotion = false;
            viewport.classList.add('is-dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        viewport.addEventListener('mouseleave', () => {
            isDown = false;
            viewport.classList.remove('is-dragging');
        });

        viewport.addEventListener('mouseup', () => {
            isDown = false;
            viewport.classList.remove('is-dragging');
        });

        viewport.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) isDraggingMotion = true;
            track.scrollLeft = scrollLeft - walk;
        });
    }

    // Visionneuse Lightbox Plein Écran
    const zoomables = document.querySelectorAll('[data-zoomable="true"]');
    zoomables.forEach(el => {
        el.addEventListener('click', () => {
            if (isDraggingMotion) return;
            const img = el.querySelector('img');
            const fullSrc = el.getAttribute('data-full') || (img ? img.getAttribute('src') : null);
            if (modal && targetImg && fullSrc) {
                targetImg.src = fullSrc;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('open'), 10);
            }
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = 'none';
                if (targetImg) targetImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }, 300);
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});