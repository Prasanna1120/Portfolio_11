/* ═══════════════════════════════════════════════════
   PRASANNA KUMAR BM — PORTFOLIO JAVASCRIPT
   Scroll animations, counters, interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Navigation ──
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // Update active nav link based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // ── Scroll Animations with Intersection Observer ──
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }

                // Trigger stat counters
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .slide-in-left, .slide-in-right, .drop-in-top, .rise-up, .stagger-in'
    );

    animatedElements.forEach(el => observer.observe(el));

    // ── Skill Bar Animations ──
    function animateSkillBars(category) {
        const bars = category.querySelectorAll('.skill-fill');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');

                // Animate percentage counter
                const skillItem = bar.closest('.skill-item');
                const percentEl = skillItem.querySelector('.skill-percent');
                if (percentEl) {
                    animateNumber(percentEl, parseInt(width));
                }
            }, index * 150);
        });
    }

    // ── Number Counter Animation ──
    function animateNumber(element, target) {
        const suffix = element.textContent.includes('%') ? '%' : '+';
        let current = 0;
        const duration = 1200;
        const increment = target / (duration / 16);

        function update() {
            current += increment;
            if (current >= target) {
                current = target;
                element.textContent = target + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // ── Stat Counters ──
    function animateCounter(element) {
        if (element.classList.contains('counted')) return;
        element.classList.add('counted');

        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const duration = 1500;
        const increment = target / (duration / 16);

        function update() {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
            } else {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // ── Contact Form ──
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const mailtoLink = `mailto:rajpruthvi020@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            window.location.href = mailtoLink;

            // Show success feedback
            const btn = contactForm.querySelector('.send-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#2d7d46';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ── Certification Card Tilt Effect ──
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ── Smooth reveal for landing elements ──
    const landingElements = document.querySelectorAll('.animate-fade-up');
    landingElements.forEach((el, i) => {
        el.style.animationDelay = `${0.2 + i * 0.2}s`;
    });

    // ── Send button pulse after form renders ──
    setTimeout(() => {
        const sendBtn = document.querySelector('.send-btn');
        if (sendBtn) {
            sendBtn.classList.add('pulse-once');
        }
    }, 2000);

    // ── Parallax-like subtle movement for landing shapes ──
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 8;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});