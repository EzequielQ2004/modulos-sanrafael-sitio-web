// ===== MENU TOGGLE PARA MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
});

// ===== FORMULARIO DE CONTACTO =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Aquí podrías enviar los datos a un servidor
            // Por ahora, mostramos una alerta
            alert('¡Mensaje enviado con éxito!\n\nNombre: ' + name + '\nEmail: ' + email + '\nTeléfono: ' + phone + '\n\nGracias por contactarnos. Te responderemos pronto.');

            // Limpiar formulario
            contactForm.reset();
        });
    }
});

// ===== SCROLL SUAVE =====
document.addEventListener('DOMContentLoaded', function() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== ANIMACIONES AL SCROLLEAR =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .product-card, .location-info, .schedule-info, .contact-info, .contact-option'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===== BOTÓN WHATSAPP FLOTANTE =====
document.addEventListener('DOMContentLoaded', function() {
    // Ya está incluido en el HTML como enlace en el footer
});

// ===== VALIDACIÓN DE FORMULARIO =====
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                alert('Por favor, ingresa un email válido');
                this.focus();
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Permitir solo números y símbolos de teléfono
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
    }
});

// ===== CARRUSEL DE PRODUCTOS =====
document.addEventListener('DOMContentLoaded', function() {
    const productsWrapper = document.querySelector('.products-wrapper');
    const productsTrack = document.querySelector('.products-track');
    const productCards = document.querySelectorAll('.product-card:not(.clone)');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (productsWrapper) {
        const cardWidth = productCards[0].offsetWidth + 20; // Ancho + gap
        let currentIndex = 0;
        const totalCards = productCards.length;
        const visibleCards = Math.floor(productsWrapper.offsetWidth / cardWidth);
        const maxIndex = totalCards - visibleCards;

        // Crear indicadores
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const indicator = document.createElement('span');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Actualizar indicadores
        function updateIndicators() {
            const indicators = indicatorsContainer.querySelectorAll('span');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Ir a slide específica
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            const offset = -currentIndex * cardWidth;
            productsTrack.style.transform = `translateX(${offset}px)`;
            updateIndicators();
        }

        // Siguiente slide
        function nextSlide() {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                // Efecto loop infinito
                productsTrack.style.transition = 'none';
                productsTrack.style.transform = 'translateX(0)';
                setTimeout(() => {
                    currentIndex = 1;
                    productsTrack.style.transition = 'transform 0.5s ease';
                    const offset = -currentIndex * cardWidth;
                    productsTrack.style.transform = `translateX(${offset}px)`;
                }, 50);
            }
            updateIndicators();
        }

        // Slide anterior
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                const offset = -currentIndex * cardWidth;
                productsTrack.style.transform = `translateX(${offset}px)`;
                updateIndicators();
            }
        }

        // Eventos de botones
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }

        // Swipe para móvil
        let touchStartX = 0;
        let touchEndX = 0;

        productsWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        productsWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
            }
            if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
            }
        }

        // Auto-scroll (opcional)
        let autoScrollInterval;
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Detener auto-scroll al hacer hover
        productsWrapper.addEventListener('mouseenter', stopAutoScroll);
        productsWrapper.addEventListener('mouseleave', startAutoScroll);

        // Inicializar
        createIndicators();
        // startAutoScroll(); // Descomentar si querés auto-scroll

        // Scroll suave con rueda del mouse
        productsWrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            productsWrapper.scrollLeft += e.deltaY;
        });
    }
});