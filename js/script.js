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

// ===== INTERACCIÓN DE TARJETAS DE SERVICIOS EN MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    // Solo en móviles (cuando el carrusel está visible)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const serviceCards = document.querySelectorAll('.services-carousel .service-card');
        
        serviceCards.forEach(card => {
            // Evitar que el clic en el botón active el overlay
            const button = card.querySelector('.btn-service');
            
            // Clic en la tarjeta (excepto el botón)
            card.addEventListener('click', function(e) {
                if (e.target !== button && !button.contains(e.target)) {
                    this.classList.toggle('show-details');
                }
            });
            
            // Clic en el botón: cerrar overlay si está abierto y permitir navegación
            if (button) {
                button.addEventListener('click', function(e) {
                    if (card.classList.contains('show-details')) {
                        e.preventDefault();
                        card.classList.remove('show-details');
                        // Redirigir después de cerrar
                        setTimeout(() => {
                            window.location.href = this.href;
                        }, 300);
                    }
                });
            }
            
            // Cerrar al tocar fuera (en otra tarjeta)
            document.addEventListener('click', function(e) {
                if (!card.contains(e.target) && !card.querySelector('.btn-service').contains(e.target)) {
                    card.classList.remove('show-details');
                }
            });
        });
    }
    
    // Cerrar overlay al cambiar de tarjeta en el carrusel
    const servicesWrapper = document.querySelector('.services-wrapper');
    if (servicesWrapper) {
        let isScrolling;
        
        servicesWrapper.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                document.querySelectorAll('.service-card.show-details').forEach(card => {
                    card.classList.remove('show-details');
                });
            }, 100);
        });
    }
});