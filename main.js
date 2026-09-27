// ============================================================
// main.js
// All UI behaviour: nav dropdowns, hamburger, donate button,
// scroll-reveal, scroll-to-top, board flip cards, accordion.
// Requires translations.js to be loaded first (uses currentLang).
// ============================================================

// ── Donate button ───────────────────────────────────────────
(function () {
    const donateBtn = document.getElementById('donate-btn');
    if (!donateBtn) return;
    donateBtn.addEventListener('click', () => {
        window.location.href = 'participate.html#one-time';
    });
})();

// ── Nav dropdowns ───────────────────────────────────────────
(function () {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Close every other open dropdown
            document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                if (dropdown.parentElement.querySelector('.nav-btn') !== btn) {
                    dropdown.classList.remove('show');
                }
            });

            // Toggle this one
            const parentItem = btn.closest('.nav-item');
            const dropdown = parentItem && parentItem.querySelector('.dropdown');
            if (dropdown) dropdown.classList.toggle('show');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
    });

    // Keep dropdown open when clicking inside it
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    });
})();

// ── Hamburger / mobile nav ──────────────────────────────────
(function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close overlay when a nav link is tapped
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
})();

// ── Scroll-reveal ───────────────────────────────────────────
(function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
})();

// ── Scroll-to-top button ────────────────────────────────────
(function () {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ── Board member flip cards ─────────────────────────────────
(function () {
    document.querySelectorAll('.board-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        card.addEventListener('click', () => card.classList.toggle('flipped'));

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
})();

// ── Legal accordion ─────────────────────────────────────────
(function () {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const body = item.querySelector('.accordion-body');
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';

            // Collapse all items
            document.querySelectorAll('.accordion-item').forEach(other => {
                other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                other.querySelector('.accordion-body').style.maxHeight = null;
                other.classList.remove('open');
            });

            // Expand the clicked item if it was closed
            if (!isOpen) {
                trigger.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
                item.classList.add('open');
            }
        });
    });
})();
