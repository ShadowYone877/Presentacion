(function () {
    'use strict';

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;

    const progressFill = document.getElementById('progressFill');
    const currentSlideEl = document.getElementById('currentSlide');
    const speakerName = document.getElementById('speakerName');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const keyboardHint = document.getElementById('keyboardHint');

    function updateUI() {
        progressFill.style.width = ((currentIndex + 1) / totalSlides * 100) + '%';
        currentSlideEl.textContent = String(currentIndex + 1).padStart(2, '0');

        const activeSlide = slides[currentIndex];
        speakerName.textContent = activeSlide.dataset.speaker || '';

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        const isDark = activeSlide.classList.contains('slide-dark');
        if (isDark) {
            progressFill.style.background = '#6366f1';
            document.querySelector('.slide-counter').style.color = 'rgba(255,255,255,0.5)';
            document.querySelector('.speaker-badge').style.borderColor = 'rgba(255,255,255,0.1)';
            document.querySelector('.speaker-badge').style.background = 'rgba(255,255,255,0.08)';
        } else {
            progressFill.style.background = '#4f46e5';
            document.querySelector('.slide-counter').style.color = 'rgba(255,255,255,0.5)';
            document.querySelector('.speaker-badge').style.borderColor = 'rgba(255,255,255,0.1)';
            document.querySelector('.speaker-badge').style.background = 'rgba(255,255,255,0.08)';
        }
    }

    function animateSlideIn(index) {
        const slide = slides[index];
        const items = slide.querySelectorAll('.conclusion-item');
        if (items.length > 0) {
            items.forEach(function (item) {
                item.classList.remove('visible');
            });
            items.forEach(function (item, i) {
                setTimeout(function () {
                    item.classList.add('visible');
                }, 400 + i * 400);
            });
        }
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides || index === currentIndex || isTransitioning) {
            return;
        }

        isTransitioning = true;
        const direction = index > currentIndex ? 'next' : 'prev';

        slides[currentIndex].classList.remove('active');
        slides[currentIndex].classList.add(direction === 'next' ? 'prev' : 'next');

        currentIndex = index;

        slides[currentIndex].classList.remove('prev', 'next');
        slides[currentIndex].classList.add('active');

        updateUI();

        setTimeout(function () {
            slides.forEach(function (slide, i) {
                if (i !== currentIndex) {
                    slide.classList.remove('prev', 'next');
                }
            });
            isTransitioning = false;
        }, 650);

        animateSlideIn(currentIndex);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(function () { });
        } else {
            document.exitFullscreen().catch(function () { });
        }
    }

    document.addEventListener('keydown', function (e) {
        if (keyboardHint && !keyboardHint.classList.contains('hidden')) {
            keyboardHint.classList.add('hidden');
        }

        switch (e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'Backspace':
                e.preventDefault();
                prevSlide();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });

    updateUI();

    setTimeout(function () {
        if (keyboardHint) {
            keyboardHint.classList.add('hidden');
        }
    }, 5000);

})();
