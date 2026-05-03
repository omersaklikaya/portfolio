/* ─────────────────────────────────────────────
   CODEGRID — SCRIPT.JS
   Yeni tasarıma (index.html + style.css) uyarlandı
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   i18n
───────────────────────────────────────────── */
const translations = {
  tr: {
    nav_about:'Hakkımızda', nav_projects:'Projeler', nav_services:'SSS', nav_contact:'İletişim', nav_cta:'Bize Ulaşın →',
    hero_badge:'// web & mobil geliştirme',
    hero_title:'Dijitalde var olmanın en<br><em>kolay</em> yolu.',
    hero_desc:'Web & mobil uygulama geliştirme, SEO ve tasarım alanlarında genç ve enerjik bir ekiple projelerinizi hayata geçiriyoruz.',
    hero_cta1:'Projelerimize Bak →', hero_cta2:'Bize Ulaşın',
    about_tag:'// hakkımızda', about_title:'Biz Kimiz?',
    about_p1:'İstanbul\'dan dünyaya açılmayı hedefleyen, <strong>genç ve tutkulu bir yazılım girişimiyiz.</strong> Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    about_p2:'Her projede sadece kod yazmıyoruz; <strong>markanızın dijital kimliğini</strong> birlikte inşa ediyoruz. Hızlı iletişim, şeffaf süreç ve kalıcı sonuçlar bizim çalışma biçimimizin özü.',
    about_p3:'Startup ruhunu kaybetmeden <strong>kurumsal kalitede</strong> iş çıkarmak için buradayız.',
    step_1:'Fikir', step_1_desc:'Projenizi dinliyor, hedeflerinizi anlıyor ve en iyi yaklaşımı birlikte belirliyoruz.',
    step_2:'Tasarım', step_2_desc:'Wireframe ve prototiplerle görsel kimliği oluşturuyoruz. Onayınız olmadan ilerlemiyoruz.',
    step_3:'Geliştirme', step_3_desc:'Temiz, ölçeklenebilir kod. Sprint bazlı ilerliyoruz, her adımda sizi bilgilendiriyoruz.',
    step_4:'Lansman', step_4_desc:'Test, optimizasyon ve canlıya alma. Sonrasında da yanınızdayız.',
    proj_tag:'// projeler', proj_title:'Projelerimiz', proj_sub:'Müşterilerimiz için geliştirdiğimiz bazı projeler.',
    proj_all:'Tüm projeleri gör →',
    skills_tag:'// hizmetler', skills_title:'Sık Sorulan Sorular',
    faq_q1:'Bir projeye başlamak için ne yapmalıyım?',
    faq_q2:'Proje ne kadar sürer?',
    faq_q3:'Fiyatlandırma nasıl işliyor?',
    faq_q4:'Proje tesliminden sonra destek veriyor musunuz?',
    faq_q5:'Mevcut sitemizi yenileyebilir misiniz?',
    faq_q6:'Hangi teknolojilerle çalışıyorsunuz?',
    faq_a1:'Bize e-posta veya iletişim formu üzerinden ulaşmanız yeterli. Projenizin kapsamını, hedeflerinizi ve varsa referans siteleri paylaşın, gerisi bizde.',
    faq_a2:'Kapsama göre değişir. Basit bir kurumsal site 1-2 haftada, orta ölçekli projeler 3-6 haftada, büyük ve kompleks ürünler 2-3 ayda teslim edilir. Görüşme aşamasında size net bir zaman çizelgesi sunarız.',
    faq_a3:'Her proje kendine özgü olduğu için sabit fiyat listemiz yok. Proje kapsamını dinledikten sonra size özel bir teklif hazırlıyoruz. İlk görüşme tamamen ücretsiz.',
    faq_a4:'Evet. Teslim sonrası bakım, güncelleme ve teknik destek için aylık paketlerimiz mevcut. Ayrıca teslimat sonrası ilk 30 gün içinde çıkan hataları ücretsiz düzeltiyoruz.',
    faq_a5:'Evet, redesign en sık aldığımız projelerden biri. Mevcut sitenizi analiz ediyor, neyin korunacağına neyin yenileneceğine birlikte karar veriyor ve sıfırdan daha iyi bir versiyon üretiyoruz.',
    svc_web:'⟨/⟩ Web Geliştirme', svc_mob:'📱 Mobil Uygulama', svc_des:'🎨 Tasarım & SEO',
    svc_ecom:'E-Ticaret Siteleri', svc_appstore:'App Store Yayınlama', svc_push:'Push Bildirim & API',
    svc_uiux:'UI / UX Tasarımı', svc_brand:'Marka Kimliği', svc_content:'İçerik Stratejisi',
    contact_tag:'İletişim', contact_title:'İletişime Geçin',
    contact_sub:'Yeni bir ürün mü çıkarmak istiyorsunuz? Mevcut sitenizi mi yenilemek istiyorsunuz? Fikrinizi bize anlatın, gerisi bizde.',
    contact_loc_label:'Konum', contact_email_label:'E-posta', contact_hours_label:'Çalışma Saatleri',
    form_name:'Adınız', form_email:'E-posta', form_subject:'Konu', form_message:'Mesajınız',
    form_send:'Gönder →',
    form_success_title:'Mesajınız alındı!', form_success_sub:'En kısa sürede size dönüş yapacağız.',
    form_err_retry:'Hata oluştu, tekrar deneyin.',
    form_err_network:'Bağlantı hatası, tekrar deneyin.',
    footer_desc:'İstanbul merkezli, genç ve tutkulu bir yazılım girişimi. Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    footer_nav_title:'Hızlı Linkler', footer_svc_title:'Hizmetler',
    footer_hours:'Pzt–Cum, 09:00–18:00', footer_copy:'© 2025 CodeGrid — Tüm hakları saklıdır.',
    contact_available:'Şu an yeni proje alıyoruz',
    contact_response:'Ortalama yanıt süresi: <strong>24 saat içinde</strong>',
    p4_name:'Bulls Burger',
    p4_desc:'Smash burger odaklı restoran markası web sitesi. Menü, şubeler, hikâye ve iletişim alanlarıyla marka deneyimini dijitale taşıyor.',
    p8_name:'Master Emlak',
    p8_desc:'Gayrimenkulde yeni nesil yaklaşım sunan emlak sitesi. Konut, ticari ve arsa kategorilerinde arama, portföy ve blog içerikleriyle kapsamlı bir deneyim sunuyor.',
    p9_name:'CodeGrid-Tools',
    p9_desc:'PDF, görsel, medya, veri, QR ve metin odaklı ücretsiz online araç platformu. Tüm işlemler tarayıcıda çalışır ve dosyalar sunucuya yüklenmeden güvenli şekilde işlenir.',
    p5_name:'yakında<span class="soon-cursor">_</span>',
    p5_desc:'Yeni bir proje kartı çok yakında burada olacak.',
    proj_back:'← Ana sayfaya dön',
    proj_all_title:'Tüm Projeler',
    proj_all_sub:'Geliştirdiğimiz tüm proje ve ürünleri bu sayfada bulabilirsiniz.',
    nav_how:'Süreç',
    nav_github:'GitHub',
    meta_desc:'CodeGrid — İstanbul merkezli yazılım girişimi. Web, mobil, SEO ve tasarım ile dijital ürünler geliştiriyoruz.',
    proj_tag_cg:'Çevrimiçi Araçlar · SaaS',
    proj_tag_me:'Gayrimenkul · Portföy',
    proj_tag_rk:'Oyun · Renk',
    renkle_name:'renkle',
    renkle_desc:'Günlük renk bulmacaları ve mini oyunlar: günün rengini tahmin et, renkleri karşılaştır ve renk odaklı keşif modları.',
    idx_badge_dev:'Geliştirici',
    idx_badge_daily:'Günlük görev',
  },
  en: {
    nav_about:'About', nav_projects:'Projects', nav_services:'FAQ', nav_contact:'Contact', nav_cta:'Contact Us →',
    hero_badge:'// web & mobile development',
    hero_title:'The easiest way<br>to exist <em>digitally.</em>',
    hero_desc:'We bring your projects to life with a young and energetic team specializing in web & mobile development, SEO, and design.',
    hero_cta1:'View Our Work →', hero_cta2:'Contact Us',
    about_tag:'// about_us', about_title:'Who We Are',
    about_p1:'We are a <strong>young and passionate software startup</strong> based in Istanbul, aiming to go global. We offer end-to-end solutions in web, mobile, SEO, and design.',
    about_p2:'We don\'t just write code; we <strong>build your brand\'s digital identity</strong> together. Fast communication, transparent process, and lasting results are at the core of how we work.',
    about_p3:'We\'re here to deliver <strong>enterprise-quality work</strong> without losing our startup spirit.',
    step_1:'Idea', step_1_desc:'We listen to your project, understand your goals, and determine the best approach together.',
    step_2:'Design', step_2_desc:'We build the visual identity with wireframes and prototypes. We never move forward without your approval.',
    step_3:'Development', step_3_desc:'Clean, scalable code. We work in sprints and keep you informed at every step.',
    step_4:'Launch', step_4_desc:'Testing, optimization, and going live. We stay by your side afterwards too.',
    proj_tag:'// projects', proj_title:'Our Projects', proj_sub:'Some of the projects we developed for our clients.',
    proj_all:'See all projects →',
    skills_tag:'// services', skills_title:'Frequently Asked Questions',
    faq_q1:'How do I start a project?',
    faq_q2:'How long does a project take?',
    faq_q3:'How does pricing work?',
    faq_q4:'Do you provide support after delivery?',
    faq_q5:'Can you redesign our existing website?',
    faq_q6:'What technologies do you work with?',
    faq_a1:'Simply email us or use the contact form. Share your project scope, goals, and any reference sites you like, we\'ll take it from there.',
    faq_a2:'It depends on scope. A simple corporate site may take 1–2 weeks, mid-sized projects 3–6 weeks, and larger, more complex products 2–3 months. After our discovery call we\'ll give you a clear timeline.',
    faq_a3:'Every project is different, so we don\'t publish a fixed price list. Once we understand the scope, we prepare a tailored quote. The first consultation is completely free.',
    faq_a4:'Yes. We offer monthly plans for maintenance, updates, and technical support after launch. We also fix bugs reported within the first 30 days after delivery at no extra charge.',
    faq_a5:'Yes, redesign is one of our most common project types. We review your current site, decide together what to keep and what to rebuild, and deliver a stronger version from the ground up.',
    svc_web:'⟨/⟩ Web Development', svc_mob:'Mobile App', svc_des:'🎨 Design & SEO',
    svc_ecom:'E-Commerce Sites', svc_appstore:'App Store Publishing', svc_push:'Push Notifications & API',
    svc_uiux:'UI / UX Design', svc_brand:'Brand Identity', svc_content:'Content Strategy',
    contact_tag:'Contact', contact_title:'Get in touch',
    contact_sub:'Want to launch a new product? Redesign your existing site? Tell us your idea — we\'ll handle the rest.',
    contact_loc_label:'Location', contact_email_label:'Email', contact_hours_label:'Working Hours',
    form_name:'Your Name', form_email:'Email', form_subject:'Subject', form_message:'Your Message',
    form_send:'Send →',
    form_success_title:'Message received!', form_success_sub:"We'll get back to you as soon as possible.",
    form_err_retry:'Something went wrong. Please try again.',
    form_err_network:'Connection error. Please try again.',
    footer_desc:'Istanbul-based, young and passionate software startup. We offer end-to-end solutions in web, mobile, SEO, and design.',
    footer_nav_title:'Quick Links', footer_svc_title:'Services',
    footer_hours:'Mon–Fri, 09:00–18:00', footer_copy:'© 2025 CodeGrid — All rights reserved.',
    p4_name:'Bulls Burger',
    p4_desc:'A brand website for a smash burger restaurant. Brings the menu, branches, story, and contact into a cohesive digital experience.',
    p8_name:'Master Emlak',
    p8_desc:'A real estate website with a next-gen approach. Complete experience across residential, commercial and land categories with listings and blog.',
    p9_name:'CodeGrid-Tools',
    p9_desc:'A free online tools platform for PDF, image, media, data, QR and text workflows. Everything runs in the browser — no server uploads.',
    p5_name:'coming soon<span class="soon-cursor">_</span>',
    p5_desc:'A new project card will be added here very soon.',
    proj_back:'← Back to home',
    proj_all_title:'All Projects',
    proj_all_sub:'All projects and products we have built, in one place.',
    contact_available:'Currently accepting new projects',
    contact_response:'Average response time: <strong>within 24 hours</strong>',
    nav_how:'Process',
    nav_github:'GitHub',
    meta_desc:'CodeGrid — Istanbul-based software studio. We build web, mobile, SEO and design projects end to end.',
    proj_tag_cg:'Online Tools · SaaS',
    proj_tag_me:'Real Estate · Portfolio',
    proj_tag_rk:'Game · Color',
    renkle_name:'renkle',
    renkle_desc:'Daily color puzzles and mini games: guess the color of the day, compare colors, and explore color-focused modes.',
    idx_badge_dev:'Developer',
    idx_badge_daily:'Daily challenge',
  }
};

let currentLang = 'tr';

function setLang(lang) {
  currentLang = lang;
  // Lang toggle butonunu güncelle
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'tr' ? 'TR / EN' : 'EN / TR';
  // Tüm data-i18n elementlerini güncelle
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
  // Placeholder'ları güncelle
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key] !== undefined) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang].meta_desc !== undefined) {
    metaDesc.setAttribute('content', translations[lang].meta_desc);
  }
  document.documentElement.lang = lang;
}

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
   LANG TOGGLE
───────────────────────────────────────────── */
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLang(currentLang === 'tr' ? 'en' : 'tr');
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL (fade-in)
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

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

  const t = (k) => (translations[currentLang] && translations[currentLang][k] !== undefined)
    ? translations[currentLang][k]
    : translations.tr[k];

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
      const errMsg = data.resendDetail || data.error || t('form_err_retry');
      if (submitBtn) {
        submitBtn.textContent = errMsg.length < 60 ? errMsg : t('form_err_retry');
        submitBtn.disabled = false;
      }
    }
  })
  .catch(() => {
    if (submitBtn) {
      submitBtn.textContent = t('form_err_network');
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
    window.scrollTo({ 
      top: target.offsetTop - navH, 
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

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
setLang('tr');