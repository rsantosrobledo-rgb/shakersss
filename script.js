/* ============================================
   SHAKERSSS — GSAP Scroll Animations & Timeline
   ============================================ */

// Ensure scroll restoration is manual and resets to initial point (0, 0)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);
    if (ScrollTrigger.clearScrollMemory) {
        ScrollTrigger.clearScrollMemory('manual');
    }
    window.scrollTo(0, 0);

    // --- Initialize Lenis Smooth Scroll ---
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        const isMobile = window.innerWidth <= 600;
        lenis = new Lenis({
            duration: isMobile ? 0.9 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.85,
            touchMultiplier: 1.0,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(500, 33);
        lenis.scrollTo(0, { immediate: true });
        window.lenis = lenis;
    }

    // --- DOM Elements ---
    const mainStage = document.getElementById('main-experience');
    const heroVideo = document.querySelector('.hero-video');
    const heroHeadline = document.getElementById('hero-headline');
    const marquee = document.getElementById('marquee');
    const heroScrollBtn = document.getElementById('hero-scroll-btn');

    // About Us Elements
    const aboutSection = document.getElementById('about-us');
    const aboutContainer = document.getElementById('about-container');
    const aboutHeader = document.getElementById('about-header');
    const aboutHeadline = document.getElementById('about-headline');
    const aboutBioWrap = document.getElementById('about-bio-wrap');

    // Cereal Boxes Roster Shelf Elements (now inside About Us)
    const rosterWrapper = document.getElementById('roster-wrapper');
    const rosterHeadline = document.getElementById('roster-headline');
    const roster = document.getElementById('roster');
    const rosterViewport = document.getElementById('roster-viewport');
    const arrowLeft = document.getElementById('arrow-left');
    const arrowRight = document.getElementById('arrow-right');
    const boxes = document.querySelectorAll('.cereal-box');
    const boxInners = document.querySelectorAll('.box-inner');

    // Contact Elements
    const contactSection = document.getElementById('contact');

    // --- Hero Headline Typewriter Effect on Load ---
    function initHeroTypewriter() {
        const headline = document.getElementById('hero-headline');
        if (!headline) return;

        const part1 = "we sell creators, ";
        const part2 = "not cereals";
        let isDone = false;

        headline.setAttribute('aria-label', 'we sell creators, not cereals');
        headline.innerHTML = '<span class="tw-part1"></span><span class="highlight tw-part2"></span>';

        const span1 = headline.querySelector('.tw-part1');
        const span2 = headline.querySelector('.tw-part2');

        function finishImmediately() {
            if (isDone) return;
            isDone = true;
            if (span1) span1.textContent = part1;
            if (span2) span2.textContent = part2;
        }

        window.addEventListener('scroll', finishImmediately, { once: true, passive: true });

        let i1 = 0;
        let i2 = 0;

        function typeP1() {
            if (isDone) return;
            if (i1 < part1.length) {
                span1.textContent += part1[i1];
                i1++;
                setTimeout(typeP1, 40);
            } else {
                setTimeout(typeP2, 90);
            }
        }

        function typeP2() {
            if (isDone) return;
            if (i2 < part2.length) {
                span2.textContent += part2[i2];
                i2++;
                setTimeout(typeP2, 45);
            } else {
                isDone = true;
            }
        }

        setTimeout(typeP1, 350);
    }
    initHeroTypewriter();

    // ==========================================
    // SCREEN SHAKE EFFECT ON FIRST SCROLL
    // Tactile, high-energy shaker vibration
    // ==========================================
    let hasShakenOnScroll = false;
    let isShaking = false;

    function triggerScreenShake() {
        if (isShaking) return;
        isShaking = true;
        hasShakenOnScroll = true;

        const stage = mainStage || document.body;

        const tlShake = gsap.timeline({
            onComplete: () => {
                isShaking = false;
            }
        });

        tlShake
            .to(stage, { x: -16, y: 9, rotation: -1.4, duration: 0.045, ease: 'power2.inOut' })
            .to(stage, { x: 18, y: -11, rotation: 1.5, duration: 0.045, ease: 'power2.inOut' })
            .to(stage, { x: -14, y: 7, rotation: -1.1, duration: 0.045, ease: 'power2.inOut' })
            .to(stage, { x: 12, y: -6, rotation: 0.9, duration: 0.05, ease: 'power2.inOut' })
            .to(stage, { x: -8, y: 4, rotation: -0.5, duration: 0.05, ease: 'power2.inOut' })
            .to(stage, { x: 4, y: -2, rotation: 0.3, duration: 0.06, ease: 'power2.inOut' })
            .to(stage, { x: 0, y: 0, rotation: 0, duration: 0.14, ease: 'elastic.out(1, 0.35)' });

        if (heroVideo) {
            gsap.fromTo(heroVideo, { scale: 1.05 }, { scale: 1.0, duration: 0.45, ease: 'power2.out' });
        }
    }

    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerScreenShake();
            if (typeof window.navigateToAboutUs === 'function') {
                window.navigateToAboutUs();
            }
        });
    }

    // --- Arrow Navigation & Layout for Creators Roster ---
    let arrowsVisible = false;
    let currentOffset = 0;

    // --- Read box dimensions from CSS ---
    const rootStyles = getComputedStyle(document.documentElement);
    const isMobileScreen = window.innerWidth <= 600;
    const boxW = parseInt(rootStyles.getPropertyValue('--box-w')) || (isMobileScreen ? 236 : 320);
    const boxD = parseInt(rootStyles.getPropertyValue('--box-d')) || (isMobileScreen ? 80 : 120);
    const scrollAmount = isMobileScreen ? (boxW + 4) : (boxW + 28) * 2;

    // --- Tight packing: spines neatly side-by-side with clean visible separation ---
    const spineGap = isMobileScreen ? 12 : 35; // clean visible separation between spines
    const initialMargin = -(boxW - boxD - spineGap);

    // Center the packed group in the viewport
    function computeRosterShift() {
        const vw = rosterViewport ? (rosterViewport.clientWidth || window.innerWidth) : window.innerWidth;
        const n = boxes.length;
        const effectiveSpineWidth = boxD + spineGap;
        const totalVisualWidth = n * effectiveSpineWidth;
        const visualOffset = (vw - totalVisualWidth) / 2;
        const spineInternalOffset = (boxW - boxD) / 2;
        return visualOffset - spineInternalOffset;
    }

    const rosterShift = computeRosterShift();

    // --- Initial state: boxes standing upright on shelf with uniform parallel alignment de canto / de lado ---
    boxInners.forEach((inner) => {
        gsap.set(inner, {
            rotateY: 85,
            rotateZ: 0,
        });
    });

    // Pack boxes neatly & center
    gsap.set(boxes, { marginRight: initialMargin });
    gsap.set(roster, { x: rosterShift });

    function showArrows() {
        if (window.innerWidth <= 600) return; // Hidden on mobile matching User Image 2
        arrowsVisible = true;
        centerRoster();
        gsap.to('.roster-arrow', {
            opacity: 1, duration: 0.4, stagger: 0.08,
        });
        document.querySelectorAll('.roster-arrow').forEach(a => {
            a.style.pointerEvents = 'auto';
        });
        updateArrowState();
    }

    function hideArrows() {
        arrowsVisible = false;
        gsap.to('.roster-arrow', { opacity: 0, duration: 0.2 });
        document.querySelectorAll('.roster-arrow').forEach(a => {
            a.style.pointerEvents = 'none';
        });
    }

    function centerRoster() {
        if (!rosterViewport || !roster) return;
        const vw = rosterViewport.clientWidth;
        const rw = roster.scrollWidth;
        const isMobile = window.innerWidth <= 600;
        if (isMobile) {
            const rootStyles = getComputedStyle(document.documentElement);
            const boxW = parseInt(rootStyles.getPropertyValue('--box-w')) || 236;
            const margin = 4;
            const centerIndex = Math.floor(boxes.length / 2);
            const boxCenter = centerIndex * (boxW + margin) + boxW / 2;
            currentOffset = Math.round(boxCenter - vw / 2);
            gsap.set(roster, { x: -currentOffset });
            return;
        }
        const maxOffset = Math.max(0, rw - vw);
        currentOffset = maxOffset / 2;
        gsap.set(roster, { x: -currentOffset });
    }

    function updateArrowState() {
        if (!rosterViewport || !roster || !arrowLeft || !arrowRight) return;
        const vw = rosterViewport.clientWidth;
        const rw = roster.scrollWidth;
        const maxOffset = Math.max(0, rw - vw);

        arrowLeft.classList.toggle('is-disabled', currentOffset <= 10);
        arrowRight.classList.toggle('is-disabled', currentOffset >= maxOffset - 10);
    }

    if (arrowLeft) {
        arrowLeft.addEventListener('click', () => {
            if (!arrowsVisible) return;
            currentOffset = Math.max(0, currentOffset - scrollAmount);
            gsap.to(roster, {
                x: -currentOffset, duration: 0.6, ease: 'power2.out',
                onComplete: updateArrowState,
            });
        });
    }

    if (arrowRight) {
        arrowRight.addEventListener('click', () => {
            if (!arrowsVisible) return;
            const vw = rosterViewport.clientWidth;
            const rw = roster.scrollWidth;
            const maxOffset = Math.max(0, rw - vw);
            currentOffset = Math.min(maxOffset, currentOffset + scrollAmount);
            gsap.to(roster, {
                x: -currentOffset, duration: 0.6, ease: 'power2.out',
                onComplete: updateArrowState,
            });
        });
    }

    // --- Touch Swipe Navigation for Mobile ---
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    if (rosterViewport) {
        rosterViewport.addEventListener('touchstart', (e) => {
            if (!arrowsVisible) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });

        rosterViewport.addEventListener('touchend', (e) => {
            if (!arrowsVisible || !isSwiping) return;
            isSwiping = false;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                if (diffX < 0) {
                    if (arrowRight) arrowRight.click();
                } else {
                    if (arrowLeft) arrowLeft.click();
                }
            }
        }, { passive: true });
    }

    // --- Hover Effects for Cereal Boxes ---
    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            if (!arrowsVisible) return;
            gsap.to(box, { scale: 1.05, zIndex: 10, duration: 0.35, ease: 'back.out(1.4)' });
        });
        box.addEventListener('mouseleave', () => {
            if (!arrowsVisible) return;
            gsap.to(box, { scale: 1, zIndex: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Initial states for stage elements
    gsap.set('#transition-curtain', { y: '100%', visibility: 'hidden' });
    gsap.set('#transition-curtain-topo', { y: '100%', visibility: 'hidden' });
    gsap.set('#hero', { opacity: 1, zIndex: 10 });
    gsap.set('#about-us', { opacity: 0, zIndex: 20 });
    gsap.set('#creators', { opacity: 0, zIndex: 19 }); // Behind about-us, visible together
    gsap.set('#contact', { opacity: 0, zIndex: 5, pointerEvents: 'none' });
    gsap.set('#contact .footer-container', { y: 70, opacity: 0 });

    if (aboutHeader) gsap.set(aboutHeader, { y: 40, opacity: 0 });
    // About headline starts light blue, will animate to topo
    if (aboutHeadline) gsap.set(aboutHeadline, { color: '#7ED4C8' });
    // Boxes start completely off-screen (below viewport), will rise up into view
    if (rosterWrapper) gsap.set(rosterWrapper, { y: 500 });
    if (rosterHeadline) gsap.set(rosterHeadline, { opacity: 0 });
    gsap.set('.roster-arrow', { opacity: 0, pointerEvents: 'none' });

    // ==========================================
    // MASTER SCROLL-DRIVEN TIMELINE
    // Flow: 
    // 1. Home Hero
    // 2. Screen Shake on initial scroll
    // 3. Curtain wipe -> About Us + Boxes "de canto" appear SIMULTANEOUSLY
    //    (boxes are already at the bottom, no rising animation)
    // 4. Reading hold (about us + boxes de canto coexisting on same screen)
    // 5. On further scroll: about text fades UP + opacity down,
    //    boxes rotate "de frente" & center, "our creatorsss" appears
    // 6. Creators Browsing Hold (arrows active)
    // 7. Topo curtain to Contact
    // ==========================================
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#main-experience',
            start: 'top top',
            end: () => window.innerWidth <= 600 ? '+=480%' : '+=620%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                // 1. Trigger Screen Shake on first scroll from home (skip during nav jumps)
                if (self.progress > 0.015 && self.progress < 0.14 && !hasShakenOnScroll && !window._isNavigating) {
                    triggerScreenShake();
                } else if (self.progress <= 0.005) {
                    hasShakenOnScroll = false;
                }

                // 2. Creators arrows active ONLY during the creators browsing hold
                if (self.progress >= 0.46 && self.progress <= 0.55) {
                    if (!arrowsVisible) showArrows();
                } else {
                    if (arrowsVisible) hideArrows();
                }

                // 3. Visibility control for transition curtain 1 (Blue/Mint: Hero -> About Us)
                const curtain = document.getElementById('transition-curtain');
                if (curtain) {
                    if (self.progress >= 0.10 && self.progress <= 0.22) {
                        curtain.style.visibility = 'visible';
                    } else {
                        curtain.style.visibility = 'hidden';
                    }
                }

                // 4. Visibility control for transition curtain 2 (Topo: Creators -> Contact)
                const curtainTopo = document.getElementById('transition-curtain-topo');
                if (curtainTopo) {
                    if (self.progress >= 0.53 && self.progress <= 0.63) {
                        curtainTopo.style.visibility = 'visible';
                    } else {
                        curtainTopo.style.visibility = 'hidden';
                    }
                }

                // 5. Section pointer-events gating
                const heroEl = document.getElementById('hero');
                const aboutEl = document.getElementById('about-us');
                const creatorsEl = document.getElementById('creators');
                const contactEl = document.getElementById('contact');

                if (self.progress < 0.15) {
                    if (heroEl) heroEl.style.pointerEvents = 'auto';
                    if (aboutEl) aboutEl.style.pointerEvents = 'none';
                    if (creatorsEl) creatorsEl.style.pointerEvents = 'none';
                    if (contactEl) contactEl.style.pointerEvents = 'none';
                } else if (self.progress >= 0.15 && self.progress < 0.35) {
                    if (heroEl) heroEl.style.pointerEvents = 'none';
                    if (aboutEl) aboutEl.style.pointerEvents = 'auto';
                    if (creatorsEl) creatorsEl.style.pointerEvents = 'none';
                    if (contactEl) contactEl.style.pointerEvents = 'none';
                } else if (self.progress >= 0.35 && self.progress < 0.57) {
                    if (heroEl) heroEl.style.pointerEvents = 'none';
                    if (aboutEl) aboutEl.style.pointerEvents = 'none';
                    if (creatorsEl) creatorsEl.style.pointerEvents = 'auto';
                    if (contactEl) contactEl.style.pointerEvents = 'none';
                } else {
                    if (heroEl) heroEl.style.pointerEvents = 'none';
                    if (aboutEl) aboutEl.style.pointerEvents = 'none';
                    if (creatorsEl) creatorsEl.style.pointerEvents = 'none';
                    if (contactEl) contactEl.style.pointerEvents = 'auto';
                }

                // 5b. Hamburger color: yellow on dark contact section
                const menuBtn = document.querySelector('.menu-btn');
                if (menuBtn) {
                    if (self.progress >= 0.57) {
                        menuBtn.classList.add('is-on-dark');
                    } else {
                        menuBtn.classList.remove('is-on-dark');
                    }
                }

                // 6. Video optimization: pause when covered
                if (heroVideo) {
                    if (self.progress >= 0.15 && !heroVideo.paused) {
                        heroVideo.pause();
                    } else if (self.progress < 0.15 && heroVideo.paused) {
                        heroVideo.play().catch(() => {});
                    }
                }
            },
        }
    });

    // ==========================================
    // PHASE 1: Hero Exit on Scroll (0.00 - 0.10)
    // ==========================================
    tl.to('#hero-headline', {
        opacity: 0, y: -80, duration: 0.06, ease: 'power2.in',
    }, 0);

    tl.to('#marquee', {
        opacity: 0, y: -60, duration: 0.06, ease: 'power2.in',
    }, 0.02);

    tl.to('#hero-scroll-btn', {
        opacity: 0, y: 30, duration: 0.04, ease: 'power2.in',
    }, 0.01);

    tl.to('.hero-video', {
        opacity: 0.15, duration: 0.08, ease: 'power1.inOut',
    }, 0.03);

    // ==========================================
    // PHASE 2: Blue Curtain Wipe: Hero -> About Us + Creators (0.10 - 0.20)
    // Behind the curtain, BOTH about-us AND creators appear SIMULTANEOUSLY.
    // Boxes are already positioned at the bottom "de canto" — no rise animation.
    // ==========================================
    tl.fromTo('#transition-curtain', 
        { y: '100%' }, 
        { y: '0%', duration: 0.05, ease: 'power1.inOut' }, 
        0.10
    );

    // Behind curtain at 0.15: Show About Us AND Creators at the same time
    tl.to('#hero', { opacity: 0, duration: 0.01 }, 0.15);
    tl.to('#about-us', { opacity: 1, zIndex: 20, duration: 0.01 }, 0.15);
    tl.to('#creators', { opacity: 1, zIndex: 19, duration: 0.01 }, 0.15);

    tl.to('#transition-curtain', {
        y: '-100%', duration: 0.05, ease: 'power1.inOut',
    }, 0.15);

    // ==========================================
    // PHASE 3: About Us + Boxes de canto RISE FROM BELOW (0.19 - 0.30)
    // "about usss" headline: opacity 0->1 first, then color #7ED4C8 -> #483C32
    // Bio text fades in. Boxes RISE from below into bottom half of screen.
    // ==========================================
    
    // About header: opacity + slide up
    tl.fromTo(aboutHeader,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.06, ease: 'power2.out' },
        0.19
    );

    // Boxes rise from y:500 (off-screen) to bottom portion visible (proportional to box height)
    tl.to(rosterWrapper, {
        y: () => {
            const root = getComputedStyle(document.documentElement);
            const isMobile = window.innerWidth <= 600;
            const boxH = parseInt(root.getPropertyValue('--box-h')) || (isMobile ? 295 : 400);
            if (isMobile) {
                // Show top ~100px of the spine peeking from bottom, leaving clear room for KEEP SHAKING!!
                return Math.round(boxH - 100);
            }
            // Show ~200px of the spine (tabs, SSS logo, Talent Facts) peeking from bottom matching reference
            return Math.round(boxH - 200);
        },
        duration: 0.08,
        ease: 'power2.out',
    }, 0.19);

    // "about usss" headline: color animation from light blue to topo brown
    // (starts slightly after opacity so there's a visible gap)
    tl.to(aboutHeadline, {
        color: '#483C32',
        duration: 0.08,
        ease: 'power2.out',
    }, 0.24);

    // ==========================================
    // PHASE 4: Reading Hold — About Us + Boxes de Canto coexist (0.30 - 0.38)
    // User sees: "about usss" (topo color) + bio at top, boxes de canto at bottom.
    // This is the static hold before the box animation starts.
    // ==========================================
    tl.to({}, { duration: 0.08 }, 0.30);

    // ==========================================
    // PHASE 5: Box Animation Starts — About fades UP, Boxes rotate & center (0.38 - 0.52)
    // About text slides up and fades out smoothly with opacity.
    // Simultaneously, boxes rotate from "de canto" to "de frente" and rise to center.
    // "our creatorsss" headline appears.
    // ==========================================

    // About header & CTA smoothly fade UP and out with opacity (no abrupt cut, no sudden background flash)
    tl.to(['#about-header', '#keep-shaking-cta'], {
        y: -90,
        opacity: 0,
        duration: 0.11,
        ease: 'power2.out',
    }, 0.35);

    // Ensure #about-us container is hidden after fade completes so it doesn't block interactions
    tl.set('#about-us', { opacity: 0, pointerEvents: 'none' }, 0.47);

    // Boxes rise from bottom to vertical center of viewport
    tl.to(rosterWrapper, {
        y: () => {
            const vh = window.innerHeight;
            const rootStyles = getComputedStyle(document.documentElement);
            const isMobile = window.innerWidth <= 600;
            const boxH = parseInt(rootStyles.getPropertyValue('--box-h')) || (isMobile ? 295 : 400);
            const offset = isMobile ? 65 : 90;
            return -(vh - boxH) / 2 + offset;
        },
        duration: 0.10,
        ease: 'power2.inOut',
    }, 0.40);

    // Boxes spread apart (margin goes from packed to spaced)
    tl.to(boxes, {
        marginRight: window.innerWidth <= 600 ? 4 : 28,
        duration: 0.10,
        ease: 'power2.out',
        stagger: { each: 0.003, from: 'center' },
    }, 0.41);

    // Roster re-centers for spread layout
    tl.to(roster, {
        x: () => {
            const isMobile = window.innerWidth <= 600;
            if (isMobile) {
                const vw = rosterViewport ? rosterViewport.clientWidth : window.innerWidth;
                const rootStyles = getComputedStyle(document.documentElement);
                const boxW = parseInt(rootStyles.getPropertyValue('--box-w')) || 236;
                const margin = 4;
                const centerIndex = Math.floor(boxes.length / 2);
                const boxCenter = centerIndex * (boxW + margin) + boxW / 2;
                return Math.round(vw / 2 - boxCenter);
            }
            return -((roster.scrollWidth - rosterViewport.clientWidth) / 2);
        },
        duration: 0.10,
        ease: 'power2.out',
    }, 0.41);

    // Boxes rotate from de canto (85deg) to de frente (0deg)
    tl.to(boxInners, {
        rotateY: 0,
        rotateZ: 0,
        duration: 0.10,
        ease: 'power2.out',
        stagger: { each: 0.003, from: 'center' },
    }, 0.41);

    // Headline "our creatorsss" — opacity + slide first
    tl.fromTo(rosterHeadline,
        { opacity: 0, color: '#7ED4C8', y: 30 },
        { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' },
        0.44
    );

    // Headline "our creatorsss" — color change from mint to topo (slightly later)
    tl.to(rosterHeadline, {
        color: '#483C32',
        duration: 0.08,
        ease: 'power2.out',
    }, 0.49);

    // "click to discover all our creators" CTA appears below boxes
    const discoverCta = document.getElementById('discover-cta');
    if (discoverCta) {
        gsap.set(discoverCta, { opacity: 0, pointerEvents: 'none' });
        tl.to(discoverCta, {
            opacity: 0.7, pointerEvents: 'auto',
            duration: 0.06, ease: 'power2.out',
        }, 0.50);
    }

    // ==========================================
    // PHASE 6: Creators Browsing Hold (0.48 - 0.54)
    // Tighter hold so user reaches contact with minimal scrolling
    // ==========================================
    tl.to({}, { duration: 0.05 }, 0.49);

    // ==========================================
    // PHASE 7: Topo Transition Curtain Wipe: Creators -> Contact (0.54 - 0.62)
    // ==========================================
    tl.fromTo('#transition-curtain-topo',
        { y: '100%' },
        { y: '0%', duration: 0.04, ease: 'power1.inOut' },
        0.54
    );

    // Behind curtain at 0.58: Instant handoff from Creators to Contact
    tl.to('#creators', { opacity: 0, duration: 0.01 }, 0.58);
    tl.to('#contact', { opacity: 1, zIndex: 25, duration: 0.01 }, 0.58);

    tl.to('#transition-curtain-topo', {
        y: '-100%', duration: 0.04, ease: 'power1.inOut',
    }, 0.58);

    // ==========================================
    // PHASE 8: Contact Reveal (0.62 - 0.75)
    // ==========================================
    tl.fromTo('#contact .footer-container',
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.06, 
            ease: 'power2.out',
            onStart: () => {
                const c = document.getElementById('contact');
                if (c) c.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
                const c = document.getElementById('contact');
                if (c) c.style.pointerEvents = 'none';
            }
        },
        0.62
    );

    // Reading hold on contact to pad timeline totalDuration to exactly 1.0
    tl.to({}, { duration: 0.32 }, 0.68);

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.5 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // --- Window Resize Handler ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
            if (arrowsVisible) {
                centerRoster();
                updateArrowState();
            }
        }, 250);
    });

    // --- Header logo shrink on scroll ---
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        let isScrolled = false;
        window.addEventListener('scroll', () => {
            const shouldScroll = window.scrollY > 40;
            if (shouldScroll !== isScrolled) {
                isScrolled = shouldScroll;
                mainHeader.classList.toggle('is-scrolled', isScrolled);
            }
        }, { passive: true });
    }

    // --- Tab visibility listener ---
    document.addEventListener('visibilitychange', () => {
        if (!heroVideo) return;
        if (document.hidden) {
            if (!heroVideo.paused) heroVideo.pause();
        } else {
            if (window.scrollY < window.innerHeight * 1.5) {
                heroVideo.play().catch(() => {});
            }
        }
    });

    // --- Global Navigation Jump Handlers ---
    window.navigateToHome = () => {
        if (!tl || !tl.scrollTrigger) return;
        window._isNavigating = true;
        if (lenis) lenis.scrollTo(0, { duration: 1.2, onComplete: () => { window._isNavigating = false; } });
        else { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => { window._isNavigating = false; }, 1500); }
    };

    window.navigateToAboutUs = () => {
        if (!tl || !tl.scrollTrigger) return;
        window._isNavigating = true;
        const target = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * 0.24;
        if (lenis) lenis.scrollTo(target, { duration: 1.3, onComplete: () => { window._isNavigating = false; } });
        else { window.scrollTo({ top: target, behavior: 'smooth' }); setTimeout(() => { window._isNavigating = false; }, 1500); }
    };

    window.navigateToCreators = () => {
        if (!tl || !tl.scrollTrigger) return;
        window._isNavigating = true;
        const target = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * 0.50;
        if (lenis) lenis.scrollTo(target, { duration: 1.2, onComplete: () => { window._isNavigating = false; } });
        else { window.scrollTo({ top: target, behavior: 'smooth' }); setTimeout(() => { window._isNavigating = false; }, 1500); }
    };

    window.navigateToContact = () => {
        if (!tl || !tl.scrollTrigger) return;
        window._isNavigating = true;
        const target = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * 0.75;
        if (lenis) lenis.scrollTo(target, { duration: 1.2, onComplete: () => { window._isNavigating = false; } });
        else { window.scrollTo({ top: target, behavior: 'smooth' }); setTimeout(() => { window._isNavigating = false; }, 1500); }
    };

    if (window.location.hash === '#about-us' || window.location.search.includes('section=about')) {
        setTimeout(window.navigateToAboutUs, 400);
    } else if (window.location.hash === '#creators' || window.location.search.includes('section=creators')) {
        setTimeout(window.navigateToCreators, 400);
    } else if (window.location.hash === '#contact' || window.location.search.includes('section=contact')) {
        setTimeout(window.navigateToContact, 400);
    }

});
