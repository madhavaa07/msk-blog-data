/* ==============================================
   Madhavaa Sai Portfolio — Script
   Interactive cursor-responsive particle system
   ============================================== */

// ── Experience Data ──
const experiences = [
  {
    company: 'Alipro',
    role: 'Sr. Information Security Analyst',
    years: 'Sep 2025 — Present',
    details: [
      'Took ownership of the full SSP for an Azure-hosted project management platform from day one, documenting every control from access management to encryption — auditors came back with zero follow-up questions after the first review cycle.',
      'Drove end-to-end NIST RMF activities from FIPS 199 security categorization through continuous monitoring, which directly helped the application clear its ATO milestone two weeks ahead of schedule.',
      'Mapped over 200 implemented security controls to NIST SP 800-53 families and built a traceability matrix that cut audit prep time by roughly 40% compared to the previous cycle.',
      'Took charge of the POA&M register and worked hand-in-hand with engineering to close out 15 open findings in under two months, bringing the remediation backlog down to near zero.',
      'Designed system boundary diagrams, data flow diagrams, and trust boundary visuals in Visio and Draw.io that became the go-to reference for both technical teams and leadership.',
      'Led FedRAMP-aligned audit readiness assessments by personally collecting and validating evidence across Azure resources — RBAC configs, Key Vault access policies, storage encryption.',
      'Set up continuous monitoring dashboards in Power BI that gave leadership real-time visibility into control effectiveness, open risks, and remediation status.',
      'Facilitated weekly risk review meetings with cross-functional stakeholders, turning vague security concerns into documented action items that reduced average finding resolution time by 25%.',
      '<b>Environment:</b> Azure (VMs, App Services, Key Vault, Entra ID, Application Insights), Power BI, Draw.io, MS Visio, NIST SP 800-53.'
    ]
  },
  {
    company: 'UnitedHealth Group (Optum)',
    role: 'Sr. Information Security Engineer Analyst',
    years: 'Dec 2021 — Sep 2025',
    details: [
      'Authored and maintained System Security Plans for FISMA-regulated enterprise healthcare platforms across cloud and on-prem environments, covering NIST SP 800-53, MARS-E, and ARC-AMPE requirements for multiple state customer programs.',
      'Developed golden templates with pre-built control descriptions for cloud and non-cloud environments, standardizing SSP drafting and cutting drafting time by about 30%.',
      'Created an SOP that walked new team members through the full documentation lifecycle, cutting ramp-up time for new analysts from weeks to days.',
      'Led risk assessments and gap analyses across information systems, identifying real control deficiencies and working directly with system owners to build actionable remediation plans.',
      'Documented risks and mitigation strategies in RSA Archer, keeping everything traceable and audit-ready so compliance reviews went smoothly every time.',
      'Tracked and drove POA&M remediation activities — personally closed out 90%+ of findings within their target timelines.',
      'Worked closely with CISOs, ISSOs, and system engineers to gather control evidence and validate security implementations against production deployments.',
      'Supported A&A processes by preparing authorization package artifacts including SSPs, SARs, and POA&M updates, helping three major systems achieve ATO approvals on time with no rework.',
      'Built a technical writing style guide that standardized security documentation across the entire program.',
      'Partnered with cloud infrastructure teams to validate secure configurations across Azure, AWS, and GCP, ensuring alignment with MARS-E, HIPAA, and NIST frameworks.',
      'Stood up a quarterly control effectiveness review process that caught configuration drift early, preventing two potential audit findings before they reached assessors.',
      '<b>Environment:</b> RSA Archer, Azure, AWS, GCP, Power BI, ServiceNow, JIRA, NIST SP 800-53, FISMA, MARS-E, ARC-AMPE, HIPAA.'
    ]
  },
  {
    company: 'Infinity Education Consultants',
    role: 'IT Security Analyst',
    years: 'Jul 2020 — Sep 2021',
    details: [
      'Owned identity and access governance for an Azure PaaS-hosted CRM, designing RBAC models and enforcing least-privilege across Dev, Test, and Production — eliminated two segregation-of-duty violations that had gone unnoticed for months.',
      'Implemented Conditional Access policies and MFA enforcement through Azure Entra ID, reducing unauthorized access attempts by over 60% within the first quarter.',
      'Monitored authentication events and identity-related alerts using Microsoft Sentinel and Log Analytics, catching privilege escalation attempts before they turned into real incidents.',
      'Ran periodic user access certifications with business stakeholders, cleaning up inactive accounts and privilege creep across multiple release cycles.',
      'Prepared IAM evidence packages and control effectiveness documentation for internal audits, resulting in zero critical findings across two consecutive audit cycles.',
      'Embedded secure identity controls into the CRM development lifecycle, working alongside DevOps to maintain secure configuration baselines for Azure PaaS components.',
      'Built an automated access review dashboard in Power BI that cut the quarterly review process from two weeks down to three days.',
      '<b>Environment:</b> Azure (Entra ID, Sentinel, Defender for Cloud), Microsoft 365, IAM, RBAC, Log Analytics, Power BI.'
    ]
  },
  {
    company: 'Jxtapose',
    role: 'Security Analyst',
    years: 'May 2019 — Jul 2020',
    details: [
      'Led technology and information security governance across cloud applications, CRM platforms, payment systems, and physical security infrastructure for a growing co-working space business.',
      'Wrote security policies, SOPs, and governance documentation covering data protection, access control, and incident response that became the foundation every team operated from.',
      'Conducted internal risk assessments across IT systems and SaaS tools, identifying real vulnerabilities and implementing mitigations that brought overall risk exposure score down by 35%.',
      'Managed RBAC and access lifecycle for HubSpot CRM and Mailchimp, running periodic access reviews that eliminated privilege creep across sales, marketing, and operations teams.',
      'Led the company\'s first formal incident response tabletop exercise, which exposed three gaps in the escalation process and resulted in a revised playbook that cut average response time by 40%.',
      '<b>Environment:</b> Azure, Sentinel, NIST SP 800-53, IAM, HubSpot, Power BI, Incident Response.'
    ]
  },
  {
    company: 'Storyqube / Voiceqube',
    role: 'Security Analyst',
    years: 'Oct 2018 — Apr 2019',
    details: [
      'Developed and enforced access control policies for the Voiceqube application platform, defining role-based permissions for end users, story builders, and administrators governing onboarding workflows and content access.',
      'Built security policies covering both the application layer and underlying AWS infrastructure — S3 bucket hardening, IAM policy tightening, and encryption standards that eliminated three critical exposure risks flagged during a penetration test.',
      'Created compliance-aligned documentation for user onboarding and story builder onboarding processes, ensuring data handling, consent, and access provisioning met internal security standards.',
      'Contributed to product strategy discussions from a security and compliance perspective, embedding privacy-by-design principles into new feature rollouts for the voice-based mobile platform.',
      'Set up centralized logging and monitoring using CloudTrail and CloudWatch, giving the team real visibility into access patterns and suspicious activity for the first time since the platform launched.',
      '<b>Environment:</b> AWS (S3, IAM, CloudTrail, CloudWatch), SIEM (Splunk, QRadar), Nessus.'
    ]
  },
  {
    company: 'Wipro / Google',
    role: 'Associate — Geospatial Data Operations',
    years: 'Oct 2017 — Oct 2018',
    details: [
      'Verified and enriched geospatial datasets across 5+ map enhancement projects, consistently hitting top-tier quality and production scores that earned recognition from project leadership.',
      'Validated raw data accuracy, assigned addresses to building polygons, and classified properties — ensuring mapped data matched ground realities and met strict compliance targets.',
      'Identified recurring data quality patterns across projects and proposed a validation checklist that the team adopted, reducing error rates by 20% across subsequent project cycles.',
      '<b>Environment:</b> Google Internal Mapping Tools, Data Quality Assurance.'
    ]
  }
];

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  lucide.createIcons();
  initParticles();
  initTypewriter();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initCountUp();
  initProgressBars();
  initClocks();
  initYear();
  initSmoothScroll();
});

/* ═══════════════════════════════════════════════
   THEME TOGGLE (Dark / Light)
   ═══════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ═══════════════════════════════════════════════
   INTERACTIVE PARTICLE SYSTEM
   Cursor-responsive: repulsion, glow, connections
   ═══════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let particles = [];
  const mouse = { x: -9999, y: -9999, radius: 160 };

  // --- Resize ---
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    seed();
  }

  // --- Seed particles ---
  function seed() {
    particles = [];
    // Density: ~1 particle per 14000 sq px, cap 180
    const n = Math.min(Math.floor((W * H) / 14000), 180);
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6,
        o: Math.random() * 0.45 + 0.1
      });
    }
  }

  // --- Draw loop ---
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const len = particles.length;
    const mR = mouse.radius;
    const mx = mouse.x;
    const my = mouse.y;

    for (let i = 0; i < len; i++) {
      const p = particles[i];

      // -- Drift --
      p.x += p.vx;
      p.y += p.vy;

      // -- Wrap edges --
      if (p.x < -5) p.x = W + 5;
      else if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      else if (p.y > H + 5) p.y = -5;

      // -- Mouse interaction --
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion
      if (dist < mR && dist > 0) {
        const force = (mR - dist) / mR;
        const ang = Math.atan2(dy, dx);
        p.x -= Math.cos(ang) * force * 2.5;
        p.y -= Math.sin(ang) * force * 2.5;
      }

      // Glow factor (particles near cursor brighten + enlarge)
      let gf = 1;
      if (dist < mR * 1.8) {
        gf = 1 + (1 - dist / (mR * 1.8)) * 2.2;
      }

      // -- Draw dot --
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * Math.min(gf, 2.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,217,255,${Math.min(p.o * gf, 0.85)})`;
      ctx.fill();

      // -- Inter-particle connections --
      for (let j = i + 1; j < len; j++) {
        const q = particles[j];
        const ex = p.x - q.x;
        const ey = p.y - q.y;
        const eDist = ex * ex + ey * ey; // skip sqrt for perf
        if (eDist < 16900) { // 130^2
          const alpha = 0.1 * (1 - Math.sqrt(eDist) / 130);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // -- Mouse-to-particle connection --
      if (dist < mR * 0.75 && dist > 0) {
        const alpha = 0.18 * (1 - dist / (mR * 0.75));
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  // --- Events ---
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('touchmove', e => {
    if (e.touches.length) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
  }, { passive: true });
  window.addEventListener('touchend', () => { mouse.x = -9999; mouse.y = -9999; });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  draw();
}

/* ═══════════════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const strings = [
    'Sr. Information Security Analyst',
    'Security Engineer',
    'SOC Analyst & Threat Hunter',
    'GRC & Compliance Specialist',
    'Cloud Security — Azure & AWS'
  ];
  let si = 0, ci = 0, del = false;

  function tick() {
    const s = strings[si];
    if (!del) {
      el.textContent = s.slice(0, ++ci);
      if (ci >= s.length) { del = true; return setTimeout(tick, 2200); }
      return setTimeout(tick, 55);
    }
    el.textContent = s.slice(0, --ci);
    if (ci <= 0) { del = false; si = (si + 1) % strings.length; return setTimeout(tick, 350); }
    setTimeout(tick, 28);
  }
  setTimeout(tick, 600);
}

/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */
function initNav() {
  const di = document.getElementById('dynamicIsland');
  if (!di) return;
  const pill = document.getElementById('diPill');

  // Shrink/solidify on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    di.classList.toggle('scrolled', scrolled);
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const diLinks = di.querySelectorAll('.di-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    diLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

function initMobileMenu() {
  const btn = document.getElementById('navHamburger');
  const overlay = document.getElementById('mobileOverlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // stagger siblings slightly
        setTimeout(() => e.target.classList.add('visible'), i * 50);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '-30px' });

  targets.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   COUNT-UP ANIMATION
   ═══════════════════════════════════════════════ */
function initCountUp() {
  const nums = document.querySelectorAll('.stat-number');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const to = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.floor(to / 25));
      const iv = setInterval(() => {
        cur = Math.min(cur + step, to);
        el.textContent = cur;
        if (cur >= to) clearInterval(iv);
      }, 45);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

/* ═══════════════════════════════════════════════
   PROGRESS BARS
   ═══════════════════════════════════════════════ */
function initProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.setProperty('--progress', e.target.dataset.progress + '%');
        e.target.classList.add('animate');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => obs.observe(f));
}

/* ═══════════════════════════════════════════════
   CLOCKS
   ═══════════════════════════════════════════════ */
function initClocks() {
  const zones = [
    { id: 'clock-cst', tz: 'America/Chicago', label: 'CST' },
    { id: 'clock-est', tz: 'America/New_York', label: 'EST' },
    { id: 'clock-pst', tz: 'America/Los_Angeles', label: 'PST' },
    { id: 'clock-mst', tz: 'America/Denver', label: 'MST' },
    { id: 'clock-ist', tz: 'Asia/Kolkata', label: 'IST' }
  ];
  function tick() {
    zones.forEach(({ id, tz, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = new Date().toLocaleTimeString('en-US', {
        timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }) + ` (${label})`;
    });
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════ */
function initYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════ */
function openModal(i) {
  const m = document.getElementById('expModal');
  const exp = experiences[i];
  if (!m || !exp) return;

  document.getElementById('modalCompany').textContent = exp.company;
  document.getElementById('modalRole').textContent = exp.role;
  document.getElementById('modalYears').textContent = exp.years;
  document.getElementById('modalDetails').innerHTML = exp.details.map(d => `<li>${d}</li>`).join('');

  m.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeModal() {
  const m = document.getElementById('expModal');
  if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeDownloadModal(); }
});
document.getElementById('expModal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.getElementById('downloadModal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeDownloadModal();
});

/* ═══════════════════════════════════════════════
   DOWNLOAD CHOICE POPUP
   ═══════════════════════════════════════════════ */
function downloadCV() {
  const m = document.getElementById('downloadModal');
  if (!m) return;
  m.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeDownloadModal() {
  const m = document.getElementById('downloadModal');
  if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}

function downloadFile(type) {
  const files = {
    pdf:  { href: 'Madhavaa_Sr. Info Sec_Analyst.pdf',  name: 'Madhavaa_Sr. Info Sec_Analyst.pdf' },
    docx: { href: 'Madhavaa_Sr. Info Sec_Analyst.docx', name: 'Madhavaa_Sr. Info Sec_Analyst.docx' }
  };
  const f = files[type];
  if (!f) return;
  const a = document.createElement('a');
  a.href = f.href;
  a.download = f.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  closeDownloadModal();
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}
