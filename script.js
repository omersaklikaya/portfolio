/* ═══════════════════════════════════════════════════
   TERMINAL — BUTON ETKİLEŞİMLERİ
═══════════════════════════════════════════════════ */
const storyLines = [
  { html: `<span class="t-comment">// startup.log — 2024, İstanbul</span>` },
  { html: `` },
  { html: `<span class="t-key">"başlangıç"</span>: <span class="t-str">"Bir masada, iki ekran, sonsuz fikir."</span>` },
  { html: `<span class="t-key">"inanç"</span>  : <span class="t-str">"Her büyük ürün cesur bir adımla başlar."</span>` },
  { html: `<span class="t-key">"hedef"</span>  : <span class="t-str">"İstanbul'dan dünyaya — bir proje, bir adım."</span>` },
  { html: `` },
  { html: `<span class="t-comment">// Müşterilerimize sadece yazılım değil,</span>` },
  { html: `<span class="t-comment">// dijital kimlik ve büyüme veriyoruz.</span>` },
  { html: `` },
  { html: `<span class="t-bool">// şimdi sıra sizin fikrinizde.</span>` },
];

(function initTerminalButtons() {
  const terminal    = document.getElementById('hero-terminal');
  const closed      = document.getElementById('terminal-closed');
  const bodyEl      = document.getElementById('terminal-body');
  const minimized   = document.getElementById('terminal-minimized');
  const expanded    = document.getElementById('terminal-expanded');
  const filename    = document.getElementById('terminal-filename');
  const btnClose    = document.getElementById('btn-close');
  const btnMinimize = document.getElementById('btn-minimize');
  const btnExpand   = document.getElementById('btn-expand');
  const btnReopen   = document.getElementById('btn-reopen');

  if (!terminal || !btnClose) return;

  let state = 'normal'; // 'normal' | 'minimized' | 'expanded' | 'closed'
  let storyTyping = false;

  function setState(s) {
    state = s;
    bodyEl.style.display    = 'none';
    minimized.style.display = 'none';
    expanded.style.display  = 'none';
    terminal.style.display  = '';
    closed.style.display    = 'none';
    terminal.classList.remove('state-expanded');

    if (s === 'normal') {
      bodyEl.style.display = '';
      filename.textContent = 'company.json';
    } else if (s === 'minimized') {
      minimized.style.display = '';
      filename.textContent = 'company.json — minimized';
    } else if (s === 'expanded') {
      expanded.style.display = '';
      terminal.classList.add('state-expanded');
      filename.textContent = 'startup.log';
      if (!storyTyping) typeStory();
    } else if (s === 'closed') {
      terminal.style.display = 'none';
      closed.style.display   = '';
    }
  }

  btnMinimize.addEventListener('click', () => setState(state === 'minimized' ? 'normal' : 'minimized'));
  btnClose.addEventListener('click',    () => setState('closed'));
  btnReopen.addEventListener('click',   () => setState('normal'));
  btnExpand.addEventListener('click',   () => setState(state === 'expanded' ? 'normal' : 'expanded'));

  async function typeStory() {
    storyTyping = true;
    const container = document.getElementById('story-typed');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < storyLines.length; i++) {
      const line = storyLines[i];
      if (state !== 'expanded') { storyTyping = false; return; }

      if (line.html === '') {
        container.insertAdjacentHTML('beforeend', '<br>');
        await new Promise(r => setTimeout(r, 20));
        continue;
      }

      const rawText = line.html.replace(/<[^>]+>/g, '');
      const tempSpan = document.createElement('span');
      container.appendChild(tempSpan);

      for (let c = 0; c < rawText.length; c++) {
        if (state !== 'expanded') { storyTyping = false; return; }
        tempSpan.textContent += rawText[c];
        await new Promise(r => setTimeout(r, 12));
      }
      tempSpan.outerHTML = line.html;
      container.insertAdjacentHTML('beforeend', '<br>');
      await new Promise(r => setTimeout(r, 25));
    }
    storyTyping = false;
  }
})();

/* ═══════════════════════════════════════════════════
   HERO — PARTICLE NETWORK
═══════════════════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const ACCENT  = '126,255,178';
  const ACCENT2 = '94,155,255';
  let W, H;
  let heroAnimating = true;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  // Hero görünür değilse animasyonu durdur
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObs = new IntersectionObserver(entries => {
      heroAnimating = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    heroObs.observe(heroSection);
  }

  let mouse = { x: -9999, y: -9999 };
  const heroEl = document.getElementById('hero');
  heroEl.addEventListener('mousemove', e => {
    const r = heroEl.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  heroEl.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  const NODE_COUNT   = 130;
  const CONNECT_DIST = 140;
  const MOUSE_DIST   = 160;
  let nodes = [];

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.35;
      this.vy    = (Math.random() - 0.5) * 0.35;
      this.r     = Math.random() * 1.5 + 0.8;
      this.color = Math.random() > 0.65 ? ACCENT2 : ACCENT;
    }
    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_DIST && d > 0) {
        const f = (MOUSE_DIST - d) / MOUSE_DIST * 0.6;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 1.8) { this.vx = (this.vx / speed) * 1.8; this.vy = (this.vy / speed) * 1.8; }
      this.vx *= 0.992;
      this.vy *= 0.992;
      this.x  += this.vx;
      this.y  += this.vy;
      if (this.x < 0) { this.x = 0;  this.vx *= -1; }
      if (this.x > W) { this.x = W;  this.vx *= -1; }
      if (this.y < 0) { this.y = 0;  this.vy *= -1; }
      if (this.y > H) { this.y = H;  this.vy *= -1; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},0.7)`;
      ctx.fill();
    }
  }

  function initParticles() { nodes = Array.from({ length: NODE_COUNT }, () => new Node()); }
  initParticles();

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          const alpha = (1 - d / CONNECT_DIST) * 0.22;
          const mdx   = (nodes[i].x + nodes[j].x) / 2 - mouse.x;
          const mdy   = (nodes[i].y + nodes[j].y) / 2 - mouse.y;
          const md    = Math.sqrt(mdx * mdx + mdy * mdy);
          const boost = md < MOUSE_DIST ? (1 - md / MOUSE_DIST) * 0.4 : 0;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${ACCENT},${alpha + boost})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    if (heroAnimating) {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      nodes.forEach(n => { n.update(); n.draw(); });
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ═══════════════════════════════════════════════════
   ABOUT — PARTICLE CANVAS
═══════════════════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const ACCENT = '#7effb2';
  const ACCENT2= '#5e9bff';
  const WORDS  = ['React', 'Node.js', 'Mobile', 'UI/UX', 'SEO', 'API', 'Design', 'Web'];
  const W = 460, H = 460;
  canvas.width  = W;
  canvas.height = H;

  let mouse = { x: W / 2, y: H / 2, active: false };
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * (W / r.width);
    mouse.y = (e.clientY - r.top)  * (H / r.height);
    mouse.active = true;
  });
  canvas.addEventListener('mouseleave', () => { mouse.active = false; });

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x       = Math.random() * W;
      this.y       = init ? Math.random() * H : H + 10;
      this.vx      = (Math.random() - 0.5) * 0.4;
      this.vy      = -(Math.random() * 0.6 + 0.2);
      this.r       = Math.random() * 1.8 + 0.4;
      this.alpha   = Math.random() * 0.5 + 0.2;
      this.color   = Math.random() > 0.7 ? ACCENT2 : ACCENT;
      this.life    = 0;
      this.maxLife = Math.random() * 260 + 140;
    }
    update() {
      if (mouse.active) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          const force = (90 - dist) / 90 * 1.2;
          this.vx += (dx / dist) * force * 0.08;
          this.vy += (dy / dist) * force * 0.08;
        }
      }
      this.vx *= 0.98; this.vy *= 0.99;
      this.x += this.vx; this.y += this.vy;
      this.life++;
      const t = this.life / this.maxLife;
      this.alpha = t < 0.1 ? t * 5 * 0.6 : t > 0.8 ? (1 - t) * 5 * 0.6 : 0.6;
      if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle    = this.color;
      ctx.globalAlpha  = this.alpha;
      ctx.fill();
    }
  }

  function drawConnections(particles) {
    const MAX_DIST = 80;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle  = ACCENT;
          ctx.globalAlpha  = (1 - d / MAX_DIST) * 0.18;
          ctx.lineWidth    = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  class FloatingWord {
    constructor(word, idx, total) {
      this.word    = word;
      const angle  = (idx / total) * Math.PI * 2;
      const rx = 155, ry = 130;
      this.bx      = W/2 + Math.cos(angle) * rx;
      this.by      = H/2 + Math.sin(angle) * ry;
      this.x       = this.bx; this.y = this.by;
      this.vx      = 0; this.vy = 0;
      this.elapsed = Math.random() * Math.PI * 2;
      this.speed   = (Math.random() * 0.00008 + 0.00005) * (Math.random() > 0.5 ? 1 : -1);
      this.rx      = rx; this.ry = ry;
      this.alpha   = 0;
      this.fontSize = Math.random() > 0.5 ? 11 : 10;
    }
    update() {
      this.elapsed += this.speed * 60;
      this.bx = W/2 + Math.cos(this.elapsed) * this.rx;
      this.by = H/2 + Math.sin(this.elapsed) * this.ry;
      if (mouse.active) {
        const dx = this.bx - mouse.x, dy = this.by - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) { this.vx += (dx / dist) * 0.6; this.vy += (dy / dist) * 0.6; }
      }
      this.vx = (this.vx + (this.bx - this.x) * 0.04) * 0.88;
      this.vy = (this.vy + (this.by - this.y) * 0.04) * 0.88;
      this.x += this.vx; this.y += this.vy;
      if (this.alpha < 1) this.alpha = Math.min(1, this.alpha + 0.015);
    }
    draw() {
      const dx   = this.x - W/2, dy = this.y - H/2;
      const dist = Math.sqrt(dx*dx + dy*dy);
      ctx.beginPath();
      ctx.moveTo(W/2, H/2);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle  = ACCENT;
      ctx.globalAlpha  = Math.max(0, (1 - dist / 220) * 0.12 * this.alpha);
      ctx.lineWidth    = 0.8;
      ctx.stroke();

      ctx.font = `${this.fontSize}px 'DM Mono', monospace`;
      const tw = ctx.measureText(this.word).width;
      ctx.globalAlpha = this.alpha * 0.9;
      ctx.fillStyle   = '#0d0d14';
      roundRect(ctx, this.x - tw/2 - 7, this.y - this.fontSize/2 - 5, tw + 14, this.fontSize + 10, 3);
      ctx.fill();
      ctx.strokeStyle  = ACCENT;
      ctx.globalAlpha  = this.alpha * 0.25;
      ctx.lineWidth    = 0.8;
      ctx.stroke();

      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = ACCENT;
      ctx.fillText(this.word, this.x - tw/2, this.y + this.fontSize * 0.35);
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  let coreAngle = 0;
  function drawCore() {
    coreAngle += 0.008;
    const cx = W/2, cy = H/2;

    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.strokeStyle  = ACCENT;
    ctx.globalAlpha  = 0.08;
    ctx.lineWidth    = 20;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(coreAngle);
    ctx.beginPath();
    ctx.arc(0, 0, 38, 0, Math.PI * 1.6);
    ctx.strokeStyle  = ACCENT;
    ctx.globalAlpha  = 0.5;
    ctx.lineWidth    = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-coreAngle * 1.5);
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 1.2);
    ctx.strokeStyle  = ACCENT2;
    ctx.globalAlpha  = 0.4;
    ctx.lineWidth    = 1;
    ctx.setLineDash([3, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
    grad.addColorStop(0, 'rgba(126,255,178,0.18)');
    grad.addColorStop(1, 'rgba(126,255,178,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle   = grad;
    ctx.globalAlpha = 1;
    ctx.fill();

    ctx.font          = "bold 11px 'DM Mono', monospace";
    ctx.fillStyle     = ACCENT;
    ctx.globalAlpha   = 0.9;
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.fillText('startUp', cx, cy);
    ctx.textAlign     = 'left';
    ctx.textBaseline  = 'alphabetic';
  }

  const particles = Array.from({ length: 55 }, () => new Particle());
  const words     = WORDS.map((w, i) => new FloatingWord(w, i, WORDS.length));
  const aboutEl   = document.getElementById('about');
  let running     = false;

  function loop() {
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.7);
    bg.addColorStop(0,   'rgba(22,22,31,1)');
    bg.addColorStop(0.6, 'rgba(17,17,24,1)');
    bg.addColorStop(1,   'rgba(10,10,15,1)');
    ctx.globalAlpha = 1;
    ctx.fillStyle   = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.globalAlpha = 0.06;
    ctx.fillStyle   = ACCENT;
    for (let gx = 20; gx < W; gx += 32)
      for (let gy = 20; gy < H; gy += 32) {
        ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI*2); ctx.fill();
      }

    drawConnections(particles);
    particles.forEach(p => { p.update(); p.draw(); });
    words.forEach(w    => { w.update(); w.draw(); });
    drawCore();
    requestAnimationFrame(loop);
  }

  if (aboutEl) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        loop();
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(aboutEl);
  } else {
    loop();
  }
})();

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════════════════
   PRENSİPLER — SCROLL REVEAL
═══════════════════════════════════════════════════ */
(function() {
  const items = document.querySelectorAll('.rl-item');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const i  = Array.from(items).indexOf(el);
        setTimeout(() => el.classList.add('rl-in'), i * 130);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════════
   AKTİF NAV LİNK
═══════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : 'var(--muted)';
  });
});

/* ═══════════════════════════════════════════════════
   HAMBURGERler MENÜ
═══════════════════════════════════════════════════ */
(function() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════
   i18n
═══════════════════════════════════════════════════ */
const translations = {
  tr: {
    nav_about:               'Hakkımızda',
    nav_projects:            'Projeler',
    nav_services:            'Hizmetler',
    nav_contact:             'İletişim',
    hero_label:              '— İstanbul merkezli yazılım girişimi',
    hero_title:              'Fikirleri<br>Ürüne<br>Dönüştürüyoruz<span class="accent">.</span>',
    hero_desc:               'Web & mobil uygulama geliştirme, SEO ve tasarım alanlarında genç ve enerjik bir ekiple projelerinizi hayata geçiriyoruz.',
    hero_cta1:               'Projelerimiz →',
    hero_cta2:               'Bize Ulaşın',
    about_tag:               'Hakkımızda',
    about_title:             'Biz kimiz<span style="color:var(--accent)">?</span>',
    about_p1:                'İstanbul\'dan dünyaya açılmayı hedefleyen, <strong>genç ve tutkulu bir yazılım girişimiyiz.</strong> Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    about_p2:                'Her projede sadece kod yazmıyoruz; <strong>markanızın dijital kimliğini</strong> birlikte inşa ediyoruz. Hızlı iletişim, şeffaf süreç ve kalıcı sonuçlar bizim çalışma biçimimizin özü.',
    about_p3:                'Startup ruhunu kaybetmeden <strong>kurumsal kalitede</strong> iş çıkarmak için buradayız. Haydi birlikte bir şeyler üretelim. 🚀',
    stat1:                   'Kuruluş Yılı',
    stat2:                   'Tamamlanan Proje',
    stat3:                   'Hizmet Alanı',
    proj_tag:                'Projeler',
    proj_title:              'Ürettiklerimiz',
    proj_sub:                'Müşterilerimiz için geliştirdiğimiz bazı projeler.',
    p1_name:                 'E-Ticaret Platformu',
    p1_desc:                 'React ve Node.js ile geliştirilen tam kapsamlı bir e-ticaret platformu. Ödeme entegrasyonu, stok yönetimi ve gerçek zamanlı bildirimler.',
    p2_name:                 'Analitik Dashboard',
    p2_desc:                 'Gerçek zamanlı veri görselleştirmesi yapan bir analitik paneli. WebSocket ile canlı güncelleme, D3.js ile etkileşimli grafikler.',
    p3_name:                 'AI Asistan API',
    p3_desc:                 'OpenAI entegrasyonu ile oluşturulan akıllı asistan API\'ı. Rate limiting, caching ve kullanıcı oturum yönetimi içeriyor.',
    svc_tag:                 'Nasıl Çalışıyoruz?',
    svc_title:               'Nasıl Çalışıyoruz?',
    svc_sub:                 'Teknik Yetkinliklerimiz',
    svc_web:                 '⟨/⟩ Web Geliştirme',
    svc_mob:                 '📱 Mobil Uygulama',
    svc_des:                 '🎨 Tasarım & SEO',
    svc_ecom:                'E-Ticaret Siteleri',
    svc_appstore:            'App Store Yayınlama',
    svc_push:                'Push Bildirim & API',
    svc_uiux:                'UI / UX Tasarımı',
    svc_brand:               'Marka Kimliği',
    svc_content:             'İçerik Stratejisi',
    github_tag:              'GitHub',
    github_title:            'Açık Kaynak Projelerimiz',
    github_sub:              'GitHub üzerindeki herkese açık repolarımız.',
    contact_tag:             'İletişim',
    contact_title:           'Projenizi konuşalım<span style="color:var(--accent)">.</span>',
    contact_sub:             'Yeni bir ürün mü çıkarmak istiyorsunuz? Mevcut sitenizi mi yenilemek istiyorsunuz? Fikrinizi bize anlatın, gerisi bizde.',
    contact_info_loc_label:  'Konum',
    contact_info_email_label:'E-posta',
    contact_info_hours_label:'Çalışma Saatleri',
    form_name:               'Adınız',
    form_email:              'E-posta',
    form_subject:            'Konu',
    form_message:            'Mesajınız',
    form_send:               'Gönder →',
    form_note:               'En kısa sürede size dönüş yapacağız.',
    form_success_title:      'Mesajınız alındı!',
    form_success_sub:        'En kısa sürede size dönüş yapacağız.',
    footer_desc:             'İstanbul merkezli, genç ve tutkulu bir yazılım girişimi. Web, mobil, SEO ve tasarım alanlarında end-to-end çözümler sunuyoruz.',
    footer_nav_title:        'Hızlı Linkler',
    footer_svc_title:        'Hizmetler',
    footer_hours:            'Pzt–Cum, 09:00–18:00',
    footer_copy:             '© 2025 StartUp Co. — Tüm hakları saklıdır.',
  },
  en: {
    nav_about:               'About',
    nav_projects:            'Projects',
    nav_services:            'Services',
    nav_contact:             'Contact',
    hero_label:              '— Istanbul-based software startup',
    hero_title:              'Turning Ideas<br>Into<br>Products<span class="accent">.</span>',
    hero_desc:               'We bring your projects to life with a young and energetic team specializing in web & mobile development, SEO and design.',
    hero_cta1:               'Our Projects →',
    hero_cta2:               'Get in Touch',
    about_tag:               'About Us',
    about_title:             'Who are we<span style="color:var(--accent)">?</span>',
    about_p1:                'We are a <strong>young and passionate software startup</strong> based in Istanbul, aiming to reach global markets. We deliver end-to-end solutions in web, mobile, SEO and design.',
    about_p2:                'We don\'t just write code — we <strong>build your brand\'s digital identity</strong> together. Fast communication, transparent process and lasting results are at the core of how we work.',
    about_p3:                'We\'re here to deliver <strong>enterprise-quality work</strong> without losing the startup spirit. Let\'s build something great together. 🚀',
    stat1:                   'Founded',
    stat2:                   'Projects Done',
    stat3:                   'Service Areas',
    proj_tag:                'Projects',
    proj_title:              'Our Work',
    proj_sub:                'A selection of projects we\'ve built for our clients.',
    p1_name:                 'E-Commerce Platform',
    p1_desc:                 'A full-featured e-commerce platform built with React and Node.js. Includes payment integration, inventory management and real-time notifications.',
    p2_name:                 'Analytics Dashboard',
    p2_desc:                 'A real-time data visualization dashboard. Live updates via WebSocket and interactive charts powered by D3.js.',
    p3_name:                 'AI Assistant API',
    p3_desc:                 'A smart assistant API built with OpenAI integration. Features rate limiting, caching and user session management.',
    svc_tag:                 'How We Work',
    svc_title:               'How We Work',
    svc_sub:                 'Our Technical Expertise',
    svc_web:                 '⟨/⟩ Web Development',
    svc_mob:                 '📱 Mobile Apps',
    svc_des:                 '🎨 Design & SEO',
    svc_ecom:                'E-Commerce Sites',
    svc_appstore:            'App Store Publishing',
    svc_push:                'Push Notifications & API',
    svc_uiux:                'UI / UX Design',
    svc_brand:               'Brand Identity',
    svc_content:             'Content Strategy',
    github_tag:              'GitHub',
    github_title:            'Our Open Source Projects',
    github_sub:              'Our public repositories on GitHub.',
    contact_tag:             'Contact',
    contact_title:           'Let\'s talk about your project<span style="color:var(--accent)">.</span>',
    contact_sub:             'Launching a new product? Redesigning your website? Tell us your idea — we\'ll handle the rest.',
    contact_info_loc_label:  'Location',
    contact_info_email_label:'Email',
    contact_info_hours_label:'Working Hours',
    form_name:               'Your Name',
    form_email:              'Email',
    form_subject:            'Subject',
    form_message:            'Your Message',
    form_send:               'Send →',
    form_note:               'We\'ll get back to you as soon as possible.',
    form_success_title:      'Message received!',
    form_success_sub:        'We\'ll get back to you as soon as possible.',
    footer_desc:             'Istanbul-based young and passionate software startup delivering end-to-end solutions in web, mobile, SEO and design.',
    footer_nav_title:        'Quick Links',
    footer_svc_title:        'Services',
    footer_hours:            'Mon–Fri, 09:00–18:00',
    footer_copy:             '© 2025 StartUp Co. — All rights reserved.',
  }
};

let currentLang = 'tr';
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));

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

/* ═══════════════════════════════════════════════════
   TERMINAL — TYPEWRITER
═══════════════════════════════════════════════════ */
const terminalLines = [
  { type: 'comment', text: '// şirket profili' },
  { type: 'plain',   text: '{' },
  { type: 'kv',  key: '"şirket"',    value: '"StartUp Co."',  valueClass: 't-str',  comma: true  },
  { type: 'kv',  key: '"konum"',     value: '"İstanbul, TR"', valueClass: 't-str',  comma: true  },
  { type: 'kv',  key: '"kuruluş"',   value: '2024',           valueClass: 't-num',  comma: true  },
  { type: 'kv',  key: '"müsait"',    value: 'true',           valueClass: 't-bool', comma: true  },
  { type: 'kv',  key: '"hizmetler"', value: '[',              valueClass: '',       comma: false },
  { type: 'arr', text: '"Web Geliştirme"',  comma: true  },
  { type: 'arr', text: '"Mobil Uygulama"',  comma: true  },
  { type: 'arr', text: '"SEO"',             comma: true  },
  { type: 'arr', text: '"UI/UX Tasarım"',   comma: false },
  { type: 'plain', text: '  ]' },
  { type: 'plain', text: '}' },
];

function buildLineHTML(line) {
  const i1 = '&nbsp;&nbsp;';
  const i2 = '&nbsp;&nbsp;&nbsp;&nbsp;';
  switch (line.type) {
    case 'comment': return `<span class="t-comment">${line.text}</span>`;
    case 'plain':   return line.text;
    case 'kv':      return `${i1}<span class="t-key">${line.key}</span>: ${line.valueClass ? `<span class="${line.valueClass}">${line.value}</span>` : line.value}${line.comma ? ',' : ''}`;
    case 'arr':     return `${i2}<span class="t-str">${line.text}</span>${line.comma ? ',' : ''}`;
    default:        return line.text;
  }
}

async function runTerminalTypewriter() {
  const container = document.getElementById('terminal-typed');
  if (!container) return;

  await new Promise(r => setTimeout(r, 500));

  for (let i = 0; i < terminalLines.length; i++) {
    const line = terminalLines[i];
    const rawText = line.type === 'kv'
      ? (line.key + ': ' + line.value + (line.comma ? ',' : ''))
      : line.type === 'arr'
        ? ('    ' + line.text + (line.comma ? ',' : ''))
        : line.text;

    const tempSpan = document.createElement('span');
    container.appendChild(tempSpan);

    for (let c = 0; c < rawText.length; c++) {
      tempSpan.textContent += rawText[c];
      await new Promise(r => setTimeout(r, 18));
    }
    tempSpan.outerHTML = buildLineHTML(line);
    container.insertAdjacentHTML('beforeend', '<br>');
    await new Promise(r => setTimeout(r, 70));
  }
}

runTerminalTypewriter();

/* ═══════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════ */
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
        el.style.borderColor = '#ff6b6b';
        el.addEventListener('input', () => el.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  btn.disabled = true;
  btnText.textContent = '...';

  fetch('http://localhost:3000/api/contact', {
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
