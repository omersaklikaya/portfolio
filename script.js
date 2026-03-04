// ─── ORBIT ANİMASYONU ────────────────────────────────────────────────────────
const orbitCfg = [
  { id: 'on0', ring: 95,  speed: 22000,  startDeg: 0   },
  { id: 'on1', ring: 95,  speed: 22000,  startDeg: 90  },
  { id: 'on2', ring: 95,  speed: 22000,  startDeg: 180 },
  { id: 'on3', ring: 95,  speed: 22000,  startDeg: 270 },
  { id: 'on4', ring: 150, speed: -34000, startDeg: 30  },
  { id: 'on5', ring: 150, speed: -34000, startDeg: 150 },
  { id: 'on6', ring: 150, speed: -34000, startDeg: 270 },
];
const cx = 160, cy = 160;

function animateOrbits() {
  const t = Date.now();
  orbitCfg.forEach(cfg => {
    const el = document.getElementById(cfg.id);
    if (!el) return;
    const deg = cfg.startDeg + (t / Math.abs(cfg.speed)) * 360 * Math.sign(cfg.speed);
    const rad = deg * Math.PI / 180;
    const x = cx + Math.cos(rad) * cfg.ring;
    const y = cy + Math.sin(rad) * cfg.ring;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.querySelector('.orbit-node-inner').style.transform =
      `rotate(${-deg + cfg.startDeg}deg) rotate(${deg - cfg.startDeg}deg)`;
  });
  requestAnimationFrame(animateOrbits);
}
animateOrbits();

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
    ring.style.opacity     = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity     = '0.5';
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// ─── AKTİF NAV LİNK ─────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : 'var(--muted)';
  });
});

// ─── i18n ────────────────────────────────────────────────────────────────────
const translations = {
  tr: {
    nav_about:         `Hakkımızda`,
    nav_projects:      `Projeler`,
    nav_services:      `Hizmetler`,
    nav_contact:       `İletişim`,
    hero_label:        `— İstanbul merkezli yazılım girişimi`,
    hero_title:        `Fikirleri<br>Ürüne<br>Dönüştürüyoruz<span class="accent">.</span>`,
    hero_desc:         `Web & mobil uygulama geliştirme, SEO ve tasarım alanlarında genç ve enerjik bir ekiple projelerinizi hayata geçiriyoruz.`,
    hero_cta1:         `Projelerimiz →`,
    hero_cta2:         `Bize Ulaşın`,
    terminal_comment:  `// şirket profili`,
    terminal_k1:       `"şirket"`,
    terminal_k2:       `"konum"`,
    terminal_k3:       `"kuruluş"`,
    terminal_k4:       `"müsait"`,
    terminal_k5:       `"hizmetler"`,
    terminal_s1:       `"Web Geliştirme"`,
    terminal_s2:       `"Mobil Uygulama"`,
    terminal_s3:       `"UI/UX Tasarım"`,
    orbit_badge:       `Yeni Proje Alıyoruz`,
    about_tag:         `Hakkımızda`,
    about_title:       `Biz kimiz<span style="color:var(--accent)">?</span>`,
    about_p1:          `İstanbul'dan dünyaya açılmayı hedefleyen, <strong>genç ve tutkulu bir yazılım girişimiyiz.</strong> Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.`,
    about_p2:          `Her projede sadece kod yazmıyoruz; <strong>markanızın dijital kimliğini</strong> birlikte inşa ediyoruz. Hızlı iletişim, şeffaf süreç ve kalıcı sonuçlar bizim çalışma biçimimizin özü.`,
    about_p3:          `Startup ruhunu kaybetmeden <strong>kurumsal kalitede</strong> iş çıkarmak için buradayız. Haydi birlikte bir şeyler üretelim. 🚀`,
    stat1:             `Kuruluş Yılı`,
    stat2:             `Tamamlanan Proje`,
    stat3:             `Hizmet Alanı`,
    proj_tag:          `Projeler`,
    proj_title:        `Ürettiklerimiz`,
    proj_sub:          `Müşterilerimiz için geliştirdiğimiz bazı projeler.`,
    p1_name:           `E-Ticaret Platformu`,
    p1_desc:           `React ve Node.js ile geliştirilen tam kapsamlı bir e-ticaret platformu. Ödeme entegrasyonu, stok yönetimi ve gerçek zamanlı bildirimler.`,
    p2_name:           `Analitik Dashboard`,
    p2_desc:           `Gerçek zamanlı veri görselleştirmesi yapan bir analitik paneli. WebSocket ile canlı güncelleme, D3.js ile etkileşimli grafikler.`,
    p3_name:           `AI Asistan API`,
    p3_desc:           `OpenAI entegrasyonu ile oluşturulan akıllı asistan API'ı. Rate limiting, caching ve kullanıcı oturum yönetimi içeriyor.`,
    svc_tag:           `Hizmetler`,
    svc_title:         `Ne Yapıyoruz?`,
    svc_sub:           `Projenizin her aşamasında yanınızdayız.`,
    svc_web:           `⟨/⟩ Web Geliştirme`,
    svc_mob:           `📱 Mobil Uygulama`,
    svc_des:           `🎨 Tasarım & SEO`,
    svc_ecom:          `E-Ticaret Siteleri`,
    svc_appstore:      `App Store Yayınlama`,
    svc_push:          `Push Bildirim & API`,
    svc_uiux:          `UI / UX Tasarımı`,
    svc_brand:         `Marka Kimliği`,
    svc_content:       `İçerik Stratejisi`,
    contact_tag:       `İletişim`,
    contact_title:     `Projenizi konuşalım<span style="color:var(--accent)">.</span>`,
    contact_sub:       `Yeni bir ürün mü çıkarmak istiyorsunuz? Mevcut sitenizi mi yenilemek istiyorsunuz? Fikrinizi bize anlatın, gerisi bizde.`,
    contact_email_btn: `✉ E-posta Gönder`,
    contact_direct:    `Ya da direkt ulaşın: <a href="mailto:email@ornek.com">email@ornek.com</a>`,
    footer_copy:       `© 2025 StartUp Co. — Tüm hakları saklıdır.`,
  },
  en: {
    nav_about:         `About`,
    nav_projects:      `Projects`,
    nav_services:      `Services`,
    nav_contact:       `Contact`,
    hero_label:        `— Istanbul-based software startup`,
    hero_title:        `Turning Ideas<br>Into<br>Products<span class="accent">.</span>`,
    hero_desc:         `We bring your projects to life with a young and energetic team specializing in web & mobile development, SEO and design.`,
    hero_cta1:         `Our Projects →`,
    hero_cta2:         `Get in Touch`,
    terminal_comment:  `// company profile`,
    terminal_k1:       `"company"`,
    terminal_k2:       `"location"`,
    terminal_k3:       `"founded"`,
    terminal_k4:       `"available"`,
    terminal_k5:       `"services"`,
    terminal_s1:       `"Web Development"`,
    terminal_s2:       `"Mobile Apps"`,
    terminal_s3:       `"UI/UX Design"`,
    orbit_badge:       `Now Accepting Projects`,
    about_tag:         `About Us`,
    about_title:       `Who are we<span style="color:var(--accent)">?</span>`,
    about_p1:          `We are a <strong>young and passionate software startup</strong> based in Istanbul, aiming to reach global markets. We deliver end-to-end solutions in web, mobile, SEO and design.`,
    about_p2:          `We don't just write code — we <strong>build your brand's digital identity</strong> together. Fast communication, transparent process and lasting results are at the core of how we work.`,
    about_p3:          `We're here to deliver <strong>enterprise-quality work</strong> without losing the startup spirit. Let's build something great together. 🚀`,
    stat1:             `Founded`,
    stat2:             `Projects Done`,
    stat3:             `Service Areas`,
    proj_tag:          `Projects`,
    proj_title:        `Our Work`,
    proj_sub:          `A selection of projects we've built for our clients.`,
    p1_name:           `E-Commerce Platform`,
    p1_desc:           `A full-featured e-commerce platform built with React and Node.js. Includes payment integration, inventory management and real-time notifications.`,
    p2_name:           `Analytics Dashboard`,
    p2_desc:           `A real-time data visualization dashboard. Live updates via WebSocket and interactive charts powered by D3.js.`,
    p3_name:           `AI Assistant API`,
    p3_desc:           `A smart assistant API built with OpenAI integration. Features rate limiting, caching and user session management.`,
    svc_tag:           `Services`,
    svc_title:         `What We Do`,
    svc_sub:           `We're with you at every stage of your project.`,
    svc_web:           `⟨/⟩ Web Development`,
    svc_mob:           `📱 Mobile Apps`,
    svc_des:           `🎨 Design & SEO`,
    svc_ecom:          `E-Commerce Sites`,
    svc_appstore:      `App Store Publishing`,
    svc_push:          `Push Notifications & API`,
    svc_uiux:          `UI / UX Design`,
    svc_brand:         `Brand Identity`,
    svc_content:       `Content Strategy`,
    contact_tag:       `Contact`,
    contact_title:     `Let's talk about your project<span style="color:var(--accent)">.</span>`,
    contact_sub:       `Launching a new product? Redesigning your website? Tell us your idea — we'll handle the rest.`,
    contact_email_btn: `✉ Send an Email`,
    contact_direct:    `Or reach us directly: <a href="mailto:email@ornek.com">email@ornek.com</a>`,
    footer_copy:       `© 2025 StartUp Co. — All rights reserved.`,
  }
};

let currentLang = 'tr';

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });
  document.documentElement.lang = lang;
}