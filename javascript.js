// Sve čekamo da se DOM učita
document.addEventListener('DOMContentLoaded', () => {
document.body.classList.add('page-loaded');
    // === 1) KLIK NA USLUGU → SKROL NA ODGOVARAJUĆI GALERIJA BLOK ===
    const uslugeCards = document.querySelectorAll('.usluga');

    uslugeCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (!target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });


    // === 2) LIGHTBOX ZA SLIKE U GALERIJI ===
    const galleryImages = Array.from(document.querySelectorAll('.galerija .grid img'));

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const btnPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const btnNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    const btnClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    let currentIndex = 0;

    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        if (!galleryImages.length) return;

        currentIndex = index;
        const img = galleryImages[currentIndex];

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function changeImage(delta) {
        if (!galleryImages.length) return;
        currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
        openLightbox(currentIndex);
    }

    // klik na slike
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    // dugmad
    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', () => changeImage(-1));
    if (btnNext) btnNext.addEventListener('click', () => changeImage(1));

    // klik na tamni overlay
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // tastatura
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
    });


    // === 3) ACTIVE LINK U MENIJU NA SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink(id) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(sec => sectionObserver.observe(sec));


    // === 4) SCROLL REVEAL (usluge, galerija, kontakt boxevi) ===
    const revealElements = [
        ...document.querySelectorAll('.usluge h2'),
        ...document.querySelectorAll('.usluga'),
        ...document.querySelectorAll('.galerija h2'),
        ...document.querySelectorAll('.gallery-block'),
        ...document.querySelectorAll('.info-boxes .box')
    ];

    revealElements.forEach(el => {
        el.classList.add('reveal-up');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));


    // === 5) BACK TO TOP DUGME ===
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
