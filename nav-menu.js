/* ============================================
   SHAKERSSS — Global Navigation Menu Drawer
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const navOverlay = document.getElementById('nav-drawer-overlay');
    const navCloseBtn = document.getElementById('nav-close-btn');

    if (!menuToggle || !navDrawer || !navOverlay) return;

    function openMenu() {
        navDrawer.classList.add('is-open');
        navOverlay.classList.add('is-open');
        menuToggle.classList.add('is-active');
        document.body.classList.add('nav-drawer-open');
        navDrawer.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        navDrawer.classList.remove('is-open');
        navOverlay.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        document.body.classList.remove('nav-drawer-open');
        navDrawer.setAttribute('aria-hidden', 'true');
    }

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (navDrawer.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    navOverlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Handle clicks on internal menu links
    const drawerLinks = navDrawer.querySelectorAll('.nav-link');
    drawerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            const targetSection = link.getAttribute('data-link');
            const isIndexPage = document.getElementById('main-experience') !== null;

            if (isIndexPage) {
                if (targetSection === 'home' || href === 'index.html' || href === '#') {
                    e.preventDefault();
                    closeMenu();
                    if (typeof window.navigateToHome === 'function') window.navigateToHome();
                    return;
                }
                if (targetSection === 'about' || href.includes('#about-us')) {
                    e.preventDefault();
                    closeMenu();
                    if (typeof window.navigateToAboutUs === 'function') window.navigateToAboutUs();
                    return;
                }
                if (targetSection === 'creators' || href.includes('#creators')) {
                    e.preventDefault();
                    closeMenu();
                    if (typeof window.navigateToCreators === 'function') window.navigateToCreators();
                    return;
                }
                if (targetSection === 'contact' || href.includes('#contact')) {
                    e.preventDefault();
                    closeMenu();
                    if (typeof window.navigateToContact === 'function') window.navigateToContact();
                    return;
                }
            }

            // Close menu before navigating away
            closeMenu();
        });
    });
});
