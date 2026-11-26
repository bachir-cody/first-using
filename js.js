// === NAVBAR SCROLL ===
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        
        header.classList.remove('scrolled');
    }
});

// === MOBILE MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlayBg = document.getElementById('overlayBg');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlayBg.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlayBg.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleMenu();
    });
});

// === REVEAL ON SCROLL (Intersection Observer) ===
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
});

reveals.forEach(el => revealObserver.observe(el));

// === CONTACT FORM ===
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn');
    const originalText = btn.innerHTML;
    const currentLang = (document.documentElement.getAttribute('lang')) || 'en';
    const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : { form_sending: 'Sending...', form_sent: 'Sent!' };

    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${dict.form_sending}`;
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
        btn.innerHTML = `<i class="fas fa-check"></i> ${dict.form_sent}`;
        btn.style.background = '#2e7d32';
        btn.style.color = '#fff';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
            form.reset();
        }, 2000);
    }, 1500);
});

// === SMOOTH SCROLL FOR NAV LINKS (optional enhancement) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

// === COUNTER ANIMATION (hero stats) ===
function animateCounters() {
    const stats = document.querySelectorAll('.hero-stats .stat h3');
    stats.forEach(stat => {
        const text = stat.textContent;
        const num = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(num)) return;

        const suffix = text.replace(/[0-9]/g, '');
        let current = 0;
        const increment = Math.ceil(num / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }
            stat.textContent = current + suffix;
        }, 30);
    });
}

// Trigger counters when hero becomes visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);