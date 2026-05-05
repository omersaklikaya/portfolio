/* ─────────────────────────────────────────────
   CODEGRID — SCRIPT.JS
   Yeni tasarıma (index.html + style.css) uyarlandı
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   NAV — scroll & sticky
───────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (nav) {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

/* ─────────────────────────────────────────────
   NAV — hamburger (mobile)
───────────────────────────────────────────── */
const navBurger   = document.getElementById('navBurger');
const mobileMenu  = document.getElementById('mobileMenu');

if (navBurger && mobileMenu) {
  navBurger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navBurger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL (fade-in-up, stagger 150ms per section)
───────────────────────────────────────────── */
const fadeUpEls = Array.from(document.querySelectorAll('.fade-in-up'))
  .filter(el => !el.closest('#hero'));

if (fadeUpEls.length) {
  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      fadeUpObserver.unobserve(entry.target);
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('section:not(#hero)').forEach(section => {
    const group = Array.from(section.querySelectorAll('.fade-in-up'));
    group.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 150}ms`;
      fadeUpObserver.observe(el);
    });
  });
}

/* ─────────────────────────────────────────────
   ICONS (lucide)
───────────────────────────────────────────── */
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleContactForm();
  });
}

function handleContactForm() {
  const nameEl    = contactForm.querySelector('[name="name"]');
  const emailEl   = contactForm.querySelector('[name="email"]');
  const subjectEl = contactForm.querySelector('[name="subject"]');
  const messageEl = contactForm.querySelector('[name="message"]');
  const submitBtn = contactForm.querySelector('.btn-submit');

  const name    = nameEl?.value.trim();
  const email   = emailEl?.value.trim();
  const subject = subjectEl?.value.trim();
  const message = messageEl?.value.trim();

  // Validasyon
  let hasError = false;
  [nameEl, emailEl, messageEl].forEach(el => {
    if (el && !el.value.trim()) {
      el.style.borderColor = '#FF5500';
      el.addEventListener('input', () => el.style.borderColor = '', { once: true });
      hasError = true;
    }
  });
  if (hasError) return;

  // Gönderme
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '...';
  }

  fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, email, subject, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      contactForm.style.display = 'none';
      const successEl = document.getElementById('contactSuccess');
      if (successEl) successEl.classList.add('show');
    } else {
      const errMsg = data.resendDetail || data.error || 'Hata oluştu, tekrar deneyin.';
      if (submitBtn) {
        submitBtn.textContent = errMsg.length < 60 ? errMsg : 'Hata oluştu, tekrar deneyin.';
        submitBtn.disabled = false;
      }
    }
  })
  .catch(() => {
    if (submitBtn) {
      submitBtn.textContent = 'Bağlantı hatası, tekrar deneyin.';
      submitBtn.disabled = false;
    }
  });
}

/* ─────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('nav')?.offsetHeight || 58;
    const offset = href === '#process' ? Math.round(navH / 2) : navH;
    window.scrollTo({ 
      top: target.offsetTop - offset, 
      behavior: 'smooth' 
    });
  });
});

/* ─────────────────────────────────────────────
   FAQ Accordion
───────────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const pane = b.nextElementSibling;
      if (pane) pane.classList.remove('open');
      const icon = b.querySelector('.faq-icon');
      if (icon) icon.textContent = '+';
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      const pane = btn.nextElementSibling;
      if (pane) pane.classList.add('open');
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.textContent = '\u00D7';
    }
  });
});

/* i18n kaldırıldı — site yalnızca Türkçe */