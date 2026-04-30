document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startOverlay = document.getElementById('start-overlay');
    const mainContent = document.getElementById('main-content');
    const videos = document.querySelectorAll('video');

    // Handle Start Button Click (Unmute and start experience)
    startBtn.addEventListener('click', () => {
        // Hide overlay and show content
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Initialize animations now that content is visible
            initIntersectionObserver();

            // Initialize Swipers
            initSwipers();

            // Setup video
            videos.forEach(video => {
                video.muted = false; // ensure sound is on
            });
        }, 1000);
    });

    function initSwipers() {
        const swiperOptions = {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            spaceBetween: 10,
        };
        new Swiper('.welcome-swiper', swiperOptions);
        new Swiper('.departure-swiper', swiperOptions);
    }

    // Intersection Observer for scroll animations (fade-in and ken-burns)
    function initIntersectionObserver() {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        const mediaContainers = document.querySelectorAll('.media-container');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
        mediaContainers.forEach(el => observer.observe(el));
    }
});
