/* ─────────────────────────────────────────────
   i18n
───────────────────────────────────────────── */
const translations = {
  tr: {
    nav_about:'Hakkımızda', nav_projects:'Projeler', nav_services:'Hizmetler', nav_contact:'İletişim',
    hero_badge:'İstanbul merkezli yazılım girişimi',
    hero_title:'Dijitalde var olmanın<br><span class="hero-highlight">en kolay yolu.</span>',
    hero_desc:'Web & mobil uygulama geliştirme, SEO ve tasarım alanlarında genç ve enerjik bir ekiple projelerinizi hayata geçiriyoruz.',
    hero_cta1:'Projelerimize Bak →', hero_cta2:'Bize Ulaşın',
    stat1:'Kuruluş', stat2:'Proje', stat3:'Hizmet',
    about_tag:'// hakkımızda', about_title:'Biz kimiz?',
    about_p1:'İstanbul\'dan dünyaya açılmayı hedefleyen, <strong>genç ve tutkulu bir yazılım girişimiyiz.</strong> Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    about_p2:'Her projede sadece kod yazmıyoruz; <strong>markanızın dijital kimliğini</strong> birlikte inşa ediyoruz. Hızlı iletişim, şeffaf süreç ve kalıcı sonuçlar bizim çalışma biçimimizin özü.',
    about_p3:'Startup ruhunu kaybetmeden <strong>kurumsal kalitede</strong> iş çıkarmak için buradayız.',
    proj_tag:'// projeler', proj_title:'Ürettiklerimiz', proj_sub:'Müşterilerimiz için geliştirdiğimiz bazı projeler.',
    p1_name:'E-Ticaret Platformu', p1_desc:'React ve Node.js ile geliştirilen tam kapsamlı bir e-ticaret platformu. Ödeme entegrasyonu, stok yönetimi ve gerçek zamanlı bildirimler.',
    p2_name:'Analitik Dashboard', p2_desc:'Gerçek zamanlı veri görselleştirmesi yapan bir analitik paneli. WebSocket ile canlı güncelleme, D3.js ile etkileşimli grafikler.',
    p3_name:'AI Asistan API', p3_desc:'OpenAI entegrasyonu ile oluşturulan akıllı asistan API\'ı. Rate limiting, caching ve kullanıcı oturum yönetimi içeriyor.',
    svc_tag:'// nasıl_çalışıyoruz', svc_title:'Nasıl çalışıyoruz?', svc_sub:'Teknik Yetkinliklerimiz',
    rl_title_1:'Şeffaflık, her zaman.', rl_desc_1:'Projenizin her aşamasını sizinle paylaşıyoruz. Ne yapıldığını, neden yapıldığını ve ne zaman teslim edileceğini her zaman bilirsiniz.',
    rl_title_2:'Fikrinizi ciddiye alıyoruz.', rl_desc_2:'Fikirlerinizi sadece "müşteri isteği" olarak görmüyor, birlikte şekillendiriyor ve en iyi versiyonuna ulaştırıyoruz.',
    rl_title_3:'Hız ve kalite birbirini götürmez.', rl_desc_3:'Hızlı teslim ederiz — ama asla kaliteden taviz vermeyiz. Startup ruhuyla çalışır, kurumsal titizlikle teslim ederiz.',
    rl_title_4:'Proje biter. Ortaklık bitmez.', rl_desc_4:'Teslimat bir son değil, bir başlangıçtır. Ürününüz büyüdükçe biz de büyürüz — destek ve yeni hedeflerle yanınızda olmaya devam ederiz.',
    stat4:'Mutlu Müşteri',
    process_1:'Fikir', process_1_desc:'Projenizi dinliyor, hedeflerinizi anlıyor ve en iyi yaklaşımı birlikte belirliyoruz.',
    process_2:'Tasarım', process_2_desc:'Wireframe ve prototiplerle görsel kimliği oluşturuyoruz. Onayınız olmadan ilerlemiyoruz.',
    process_3:'Geliştirme', process_3_desc:'Temiz, ölçeklenebilir kod. Sprint bazlı ilerliyoruz, her adımda sizi bilgilendiriyoruz.',
    process_4:'Lansman', process_4_desc:'Test, optimizasyon ve canlıya alma. Sonrasında da yanınızdayız.',
    github_soon:'Yeni bir açık kaynak proje geliyor...',
    github_soon_name:'yakında',
    svc_web:'⟨/⟩ Web Geliştirme', svc_mob:'📱 Mobil Uygulama', svc_des:'🎨 Tasarım & SEO',
    svc_ecom:'E-Ticaret Siteleri', svc_appstore:'App Store Yayınlama', svc_push:'Push Bildirim & API',
    svc_uiux:'UI / UX Tasarımı', svc_brand:'Marka Kimliği', svc_content:'İçerik Stratejisi',
    github_tag:'// github', github_title:'Açık kaynak projelerimiz', github_sub:'GitHub üzerindeki herkese açık repolarımız.',
    contact_tag:'// iletişim', contact_title:'Projenizi konuşalım.',
    contact_sub:'Yeni bir ürün mü çıkarmak istiyorsunuz? Mevcut sitenizi mi yenilemek istiyorsunuz? Fikrinizi bize anlatın, gerisi bizde.',
    contact_info_loc_label:'Konum', contact_info_email_label:'E-posta', contact_info_hours_label:'Çalışma Saatleri',
    form_name:'Adınız', form_email:'E-posta', form_subject:'Konu', form_message:'Mesajınız',
    form_send:'Gönder →', form_note:'En kısa sürede size dönüş yapacağız.',
    form_success_title:'Mesajınız alındı!', form_success_sub:'En kısa sürede size dönüş yapacağız.',
    footer_desc:'İstanbul merkezli, genç ve tutkulu bir yazılım girişimi. Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    footer_nav_title:'// hızlı_linkler', footer_svc_title:'// hizmetler',
    footer_hours:'Pzt–Cum, 09:00–18:00', footer_copy:'© 2025 devBino — Tüm hakları saklıdır.',
  },
  en: {
    nav_about:'About', nav_projects:'Projects', nav_services:'Services', nav_contact:'Contact',
    hero_badge:'Istanbul-based software startup',
    hero_title:'The easiest way<br><span class="hero-highlight">to go digital.</span>',
    hero_desc:'We bring your projects to life with a young and energetic team specializing in web & mobile development, SEO, and design.',
    hero_cta1:'View Our Work →', hero_cta2:'Contact Us',
    stat1:'Founded', stat2:'Projects', stat3:'Services',
    about_tag:'// about_us', about_title:'Who we are',
    about_p1:'We are a <strong>young and passionate software startup</strong> based in Istanbul, aiming to go global. We offer end-to-end solutions in web, mobile, SEO, and design.',
    about_p2:'We don\'t just write code; we <strong>build your brand\'s digital identity</strong> together. Fast communication, transparent process, and lasting results are at the core of how we work.',
    about_p3:'We\'re here to deliver <strong>enterprise-quality work</strong> without losing our startup spirit.',
    proj_tag:'// projects', proj_title:'Our projects', proj_sub:'Some of the projects we developed for our clients.',
    p1_name:'E-Commerce Platform', p1_desc:'A full-featured e-commerce platform built with React and Node.js. Payment integration, inventory management, and real-time notifications.',
    p2_name:'Analytics Dashboard', p2_desc:'An analytics panel with real-time data visualization. Live updates via WebSocket and interactive charts with D3.js.',
    p3_name:'AI Assistant API', p3_desc:'An intelligent assistant API built with OpenAI integration. Includes rate limiting, caching, and user session management.',
    svc_tag:'// how_we_work', svc_title:'How we work?', svc_sub:'Technical Expertise',
    svc_web:'⟨/⟩ Web Development', svc_mob:'📱 Mobile Apps', svc_des:'🎨 Design & SEO',
    svc_ecom:'E-Commerce Sites', svc_appstore:'App Store Publishing', svc_push:'Push Notifications & API',
    svc_uiux:'UI / UX Design', svc_brand:'Brand Identity', svc_content:'Content Strategy',
    rl_title_1:'Transparency, always.', rl_desc_1:'We share every stage of your project with you. You always know what was done, why it was done, and when it will be delivered.',
    rl_title_2:'We take your idea seriously.', rl_desc_2:"We don't see your ideas as just a client request — we shape them together and bring them to their best version.",
    rl_title_3:'Speed and quality are not mutually exclusive.', rl_desc_3:'We deliver fast — but never compromise on quality. We work with a startup mindset and deliver with corporate precision.',
    rl_title_4:'The project ends. The partnership does not.', rl_desc_4:'Delivery is not an end, it\'s a beginning. As your product grows, we grow too — we stay by your side with support and new goals.',
    stat4:'Happy Clients',
    process_1:'Idea', process_1_desc:'We listen to your project, understand your goals, and determine the best approach together.',
    process_2:'Design', process_2_desc:'We build the visual identity with wireframes and prototypes. We never move forward without your approval.',
    process_3:'Development', process_3_desc:'Clean, scalable code. We work in sprints and keep you informed at every step.',
    process_4:'Launch', process_4_desc:'Testing, optimization, and going live. We stay by your side afterwards too.',
    github_soon:'A new open source project is coming...',
    github_soon_name:'coming soon',
    github_tag:'// github', github_title:'Our open source projects', github_sub:'Our public repositories on GitHub.',
    contact_tag:'// contact', contact_title:'Let\'s talk about your project.',
    contact_sub:'Want to launch a new product? Redesign your existing site? Tell us your idea — we\'ll handle the rest.',
    contact_info_loc_label:'Location', contact_info_email_label:'Email', contact_info_hours_label:'Working Hours',
    form_name:'Your Name', form_email:'Email', form_subject:'Subject', form_message:'Your Message',
    form_send:'Send →', form_note:'We\'ll get back to you as soon as possible.',
    form_success_title:'Message received!', form_success_sub:'We\'ll get back to you as soon as possible.',
    footer_desc:'Istanbul-based, young and passionate software startup. We offer end-to-end solutions in web, mobile, SEO, and design.',
    footer_nav_title:'// quick_links', footer_svc_title:'// services',
    footer_hours:'Mon–Fri, 09:00–18:00', footer_copy:'© 2025 devBino — All rights reserved.',
  }
};

let currentLang = 'tr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent.trim().toLowerCase() === lang));
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
}

/* ─────────────────────────────────────────────
   NAV — scroll & hamburger
───────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 1px 12px rgba(0,0,0,0.08)'
    : 'none';
});

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function handleContactForm() {
  const name    = document.getElementById('cf-name')?.value.trim();
  const email   = document.getElementById('cf-email')?.value.trim();
  const subject = document.getElementById('cf-subject')?.value.trim();
  const message = document.getElementById('cf-message')?.value.trim();
  const btn     = document.getElementById('cf-submit');
  const btnText = document.getElementById('cf-btn-text');

  if (!name || !email || !message) {
    [['cf-name', name], ['cf-email', email], ['cf-message', message]].forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el && !val) {
        el.style.borderColor = '#ef4444';
        el.addEventListener('input', () => el.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  btn.disabled      = true;
  btnText.textContent = '...';

  const apiUrl = (typeof window !== 'undefined' && window.location.origin)
    ? window.location.origin + '/.netlify/functions/contact'
    : '/.netlify/functions/contact';
  fetch(apiUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, email, subject, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById('contact-form-box').style.display = 'none';
      document.getElementById('cf-success').style.display       = 'block';
    } else {
      btnText.textContent = data.error || 'Hata oluştu.';
      btn.disabled = false;
    }
  })
  .catch(() => {
    btnText.textContent = 'Bağlantı hatası, tekrar deneyin.';
    btn.disabled = false;
  });
}

/* ─────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});


/* ─────────────────────────────────────────────
   PARTİKEL SİSTEMİ (hero + siyah section'lar)
───────────────────────────────────────────── */
function createParticleSystem(canvas, count) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
  }

  function mkParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.25
    };
  }

  function init() { resize(); particles = Array.from({ length: count }, mkParticle); }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Önce çizgiler (ışın efekti)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const opacity = 0.35 * (1 - dist / maxDist);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(126,255,178,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Sonra noktalar
    particles.forEach(p => {
      // Mouse itkisi
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120 && dist > 0) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Nokta — glow efekti
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
      grd.addColorStop(0, `rgba(126,255,178,${p.alpha})`);
      grd.addColorStop(1, `rgba(126,255,178,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,255,220,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  window.addEventListener('resize', resize);
  init();
  draw();
}

// Hero particle
createParticleSystem(document.getElementById('hero-particles'), 80);

// Siyah section'lar: projects, github-repos
document.querySelectorAll('.section-particles').forEach(canvas => {
  const section = canvas.getAttribute('data-section');
  const blackSections = ['projects', 'github-repos'];
  if (blackSections.includes(section)) {
    createParticleSystem(canvas, 60);
  } else {
    canvas.remove();
  }
});

/* ─────────────────────────────────────────────
   ABOUT PROCESS ACCORDION
───────────────────────────────────────────── */
document.querySelectorAll('.about-process .process-step').forEach(step => {
  step.addEventListener('click', () => {
    if (step.classList.contains('open')) return;
    document.querySelectorAll('.about-process .process-step').forEach(s => s.classList.remove('open'));
    step.classList.add('open');
  });
});

/* ─────────────────────────────────────────────
   REVEAL LIST (Hizmetler)
───────────────────────────────────────────── */
const rlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('rl-in'), i * 120);
      rlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.rl-item').forEach(el => rlObserver.observe(el));

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
setLang('tr');