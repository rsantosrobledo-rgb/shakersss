/* ============================================
   SHAKERSSS — Contact Page Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Video source switcher for mobile ---
    const contactBgVideo = document.querySelector('.contact-bg-video');
    function updateContactVideoSource() {
        if (!contactBgVideo) return;
        const isMobile = window.innerWidth <= 600;
        const desiredSrc = isMobile ? 'bg_video_movil.webm' : 'bg_video.webm';
        const currentSrc = contactBgVideo.currentSrc || contactBgVideo.src || '';
        if (!currentSrc.includes(desiredSrc)) {
            contactBgVideo.src = desiredSrc;
            contactBgVideo.load();
            contactBgVideo.play().catch(() => {});
        }
    }
    updateContactVideoSource();
    window.addEventListener('resize', updateContactVideoSource);

    // --- Profile Tabs ---
    const tabs = document.querySelectorAll('.profile-tab');
    const profileInput = document.getElementById('selected-profile');
    const brandInputLabel = document.getElementById('label-brand-or-channel');
    const brandInputField = document.getElementById('input-brand-or-channel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');
            const profile = tab.dataset.profile;
            if (profileInput) profileInput.value = profile;

            if (brandInputLabel && brandInputField) {
                if (profile === 'creator') {
                    brandInputLabel.textContent = 'Canal / Cuenta Principal (@usuario)';
                    brandInputField.placeholder = '@usuario en TikTok / Instagram / YouTube';
                } else if (profile === 'press') {
                    brandInputLabel.textContent = 'Medio / Organización';
                    brandInputField.placeholder = 'Nombre del medio de comunicación o evento';
                } else {
                    brandInputLabel.textContent = 'Empresa o Marca';
                    brandInputField.placeholder = 'Nombre de tu marca o empresa';
                }
            }
        });
    });

    // --- Form Submission & Feedback ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const toast = document.getElementById('contact-success-toast');

    if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Button loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                </svg>
                <span>Enviando propuesta...</span>
            `;
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px;">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>¡Propuesta Enviada!</span>
                `;
                submitBtn.style.background = '#4ade80';

                // Show toast
                if (toast) {
                    toast.classList.add('is-visible');
                    setTimeout(() => {
                        toast.classList.remove('is-visible');
                    }, 5000);
                }

                // Reset form after short delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 4000);

            }, 1200);
        });
    }

    // --- Entrance Animation with GSAP ---
    if (typeof gsap !== 'undefined') {
        gsap.from('.contact-hero > *', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
        });

        gsap.from('.contact-form-card', {
            opacity: 0,
            y: 40,
            duration: 0.9,
            delay: 0.25,
            ease: 'power3.out',
        });

        gsap.from('.contact-info-column > *', {
            opacity: 0,
            x: 30,
            duration: 0.8,
            stagger: 0.18,
            delay: 0.4,
            ease: 'power2.out',
        });
    }

});
