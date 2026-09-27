/* ============================================
   SHAKERSSS — Roster Page Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.creator-card');
    const grid = document.getElementById('roster-grid');

    // --- Compute columns from CSS grid ---
    function getColumns() {
        const style = getComputedStyle(grid);
        return style.gridTemplateColumns.split(' ').length;
    }

    // --- Apply brick-pattern offset to odd rows ---
    function applyBrickOffset() {
        if (!grid) return;
        const currentCards = grid.querySelectorAll('.creator-card');
        if (!currentCards.length) return;
        const cols = getColumns();
        const gap = parseFloat(getComputedStyle(grid).gap) || 20;
        const firstCard = currentCards[0];
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth;
        const offset = (cardWidth + gap) / 2;

        currentCards.forEach((card, i) => {
            const row = Math.floor(i / cols);
            const isOffsetRow = row % 2 === 1;
            gsap.set(card, {
                x: isOffsetRow ? offset : 0,
            });
        });
    }

    applyBrickOffset();

    // --- Header title entrance animation: opacity first, then color shift ---
    gsap.fromTo('.roster-page-title', 
        { opacity: 0, y: -25, color: '#7ED4C8' },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
    gsap.to('.roster-page-title', {
        color: '#483C32', duration: 0.9, delay: 0.5, ease: 'power2.out'
    });

    gsap.fromTo('.roster-page-subtitle',
        { opacity: 0, y: -15, color: '#7ED4C8' },
        { opacity: 0.85, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out' }
    );
    gsap.to('.roster-page-subtitle', {
        color: '#483C32', duration: 0.9, delay: 0.6, ease: 'power2.out'
    });

    // --- Staggered entrance animation function ---
    function animateCardsIn() {
        const currentCards = grid ? grid.querySelectorAll('.creator-card') : [];
        if (!currentCards.length) return;
        gsap.fromTo(currentCards,
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power3.out',
                stagger: {
                    each: 0.02,
                    from: 'start',
                },
                overwrite: 'auto'
            }
        );
    }

    animateCardsIn();

    // --- Hover effects ---
    function attachCardHovers() {
        const currentCards = grid ? grid.querySelectorAll('.creator-card') : [];
        currentCards.forEach(card => {
            if (card._hasHoverAttached) return;
            card._hasHoverAttached = true;
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.04,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            });
        });
    }

    attachCardHovers();

    // Re-run brick offset, hover attachments & animation when roster is hydrated dynamically
    window.addEventListener('shakersss:roster-hydrated', () => {
        applyBrickOffset();
        attachCardHovers();
        animateCardsIn();
    });

    // --- Recalculate on resize ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            applyBrickOffset();
        }, 200);
    });

    // ============================================
    // CREATOR DETAIL MODAL INTERACTIVITY
    // ============================================
    const modal = document.getElementById('creator-detail-modal');
    const modalCard = document.getElementById('creator-modal-card');
    const modalClose = document.getElementById('creator-detail-close');
    const modalOverlay = document.getElementById('creator-detail-overlay');
    const photoEl = document.getElementById('modal-creator-photo');
    const nameEl = document.getElementById('modal-creator-name');
    const categoryEl = document.getElementById('modal-creator-category');
    const metricsEl = document.getElementById('modal-creator-metrics');
    const bioEl = document.getElementById('modal-creator-bio');
    const cerealBadge = document.getElementById('modal-creator-cereal-badge');
    const cerealText = document.getElementById('modal-creator-cereal-text');
    const igEl = document.getElementById('modal-creator-ig');
    const igText = document.getElementById('modal-creator-ig-text');
    const ttEl = document.getElementById('modal-creator-tt');
    const ttText = document.getElementById('modal-creator-tt-text');
    const ytEl = document.getElementById('modal-creator-yt');
    const ytText = document.getElementById('modal-creator-yt-text');
    const ctaBtn = document.getElementById('modal-creator-cta');
    const ctaText = document.getElementById('modal-creator-cta-text');

    function openCreatorDetailModal(creator, index) {
        if (!modal || !creator) return;

        const accentColor = creator.color || '#7ED4C8';
        modalCard.style.setProperty('--creator-accent-color', accentColor);
        modalCard.style.setProperty('--creator-accent-glow', `${accentColor}33`);

        photoEl.src = creator.photo;
        photoEl.alt = creator.name;
        nameEl.textContent = creator.name;
        categoryEl.textContent = creator.category || 'Lifestyle & Trends';
        metricsEl.textContent = creator.metrics || '+1.2M Seguidores · 9.4% Engagement';
        bioEl.textContent = creator.bio || 'Creador exclusivo de SHAKERSSS Agency. Especialista en campañas de alto impacto y contenido viral.';

        // Cereal badge logic
        if (creator.inBoxes !== false && typeof index === 'number' && index < 20) {
            cerealText.textContent = `CEREAL BOX CREATOR #${index + 1}`;
            cerealBadge.style.display = 'inline-flex';
        } else if (creator.inBoxes !== false) {
            cerealText.textContent = 'CEREAL BOX CREATOR';
            cerealBadge.style.display = 'inline-flex';
        } else {
            cerealText.textContent = 'SHAKERSSS ROSTER';
            cerealBadge.style.display = 'inline-flex';
        }

        // Instagram
        if (creator.instagram) {
            const igHandle = creator.instagram.replace('@', '').trim();
            igEl.href = creator.instagram.startsWith('http') ? creator.instagram : `https://instagram.com/${igHandle}`;
            igText.textContent = `@${igHandle}`;
            igEl.style.display = 'inline-flex';
        } else {
            igEl.style.display = 'none';
        }

        // TikTok
        if (creator.tiktok) {
            const ttHandle = creator.tiktok.replace('@', '').trim();
            ttEl.href = creator.tiktok.startsWith('http') ? creator.tiktok : `https://tiktok.com/@${ttHandle}`;
            ttText.textContent = `@${ttHandle}`;
            ttEl.style.display = 'inline-flex';
        } else {
            ttEl.style.display = 'none';
        }

        // YouTube
        if (creator.youtube) {
            const ytHandle = creator.youtube.replace('@', '').trim();
            ytEl.href = creator.youtube.startsWith('http') ? creator.youtube : `https://youtube.com/@${ytHandle}`;
            ytText.textContent = creator.youtube.startsWith('@') ? creator.youtube : `@${creator.youtube}`;
            ytEl.style.display = 'inline-flex';
        } else {
            ytEl.style.display = 'none';
        }

        // CTA
        if (ctaBtn) {
            ctaBtn.href = `contact.html?creator=${encodeURIComponent(creator.name)}`;
        }
        if (ctaText) {
            ctaText.textContent = `Trabajar con ${creator.name}`;
        }

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeCreatorDetailModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Grid Click Listener (Event Delegation for all cards)
    if (grid) {
        grid.addEventListener('click', async (e) => {
            const card = e.target.closest('.creator-card');
            if (!card) return;
            e.preventDefault();

            const creatorId = card.dataset.creator || card.id.replace('card-', '');
            const cardName = card.querySelector('.card-name')?.textContent.trim();

            const creators = await window.shakersssData.getCreators();
            let creator = creators.find(c => c.id === creatorId);
            let idx = creators.findIndex(c => c.id === creatorId);

            if (!creator && cardName) {
                creator = creators.find(c => c.name.toLowerCase() === cardName.toLowerCase());
                idx = creators.findIndex(c => c.name.toLowerCase() === cardName.toLowerCase());
            }

            if (creator) {
                openCreatorDetailModal(creator, idx >= 0 ? idx : 0);
            }
        });
    }

    if (modalClose) modalClose.addEventListener('click', closeCreatorDetailModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeCreatorDetailModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeCreatorDetailModal();
        }
    });

    // --- Search & Filter Logic ---
    const searchInput = document.getElementById('roster-search-input');
    const filterPills = document.querySelectorAll('.roster-filter-pill');
    let activeFilter = 'all';

    function filterCards() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const allCards = grid ? grid.querySelectorAll('.creator-card') : [];

        allCards.forEach(card => {
            const nameEl = card.querySelector('.card-name');
            const name = nameEl ? nameEl.textContent.toLowerCase() : '';
            const category = (card.dataset.category || '').toLowerCase();

            const matchesSearch = !query || name.includes(query);
            const matchesFilter = activeFilter === 'all' || category.includes(activeFilter);

            card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
        });

        // Re-apply brick offset after filtering
        applyBrickOffset();
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCards);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');
            activeFilter = pill.dataset.filter || 'all';
            filterCards();
        });
    });

});
