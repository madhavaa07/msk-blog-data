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
      'Written, reviewed, and maintained the full SSP and IT control documentation for an Azure-hosted project management platform, partnering with development and business stakeholders to ensure governance across IAM, vulnerability management, patching, firewall configurations, and secure application lifecycle practices — auditors raised only minor clarifications during the first review cycle, with over 95% of controls accepted as-is.',
      'Managed and supported end-to-end Azure cloud environments including provisioning, configuration, monitoring, and security validation of VMs, App Services, Storage Accounts, Key Vault, Azure Communication Services, Entra ID, and Application Insights, ensuring secure and compliant operations.',
      'Drove end-to-end NIST RMF activities from FIPS 199 security categorization through continuous monitoring, which directly helped the application clear its ATO milestone two weeks ahead of schedule.',
      'Mapped over 200 implemented security controls to NIST SP 800-53 families and built a traceability matrix that cut audit prep time by roughly 40% compared to the previous cycle.',
      'Took charge of the POA&M register and worked hand-in-hand with engineering to close out 15 open findings in under two months, with only 2-3 items requiring extended remediation timelines.',
      'Created and maintained system boundary, high-level architecture, trust boundary, and information flow diagrams using Draw.io and MS Visio, clearly illustrating application components, Azure services, data flows, and applied security controls for stakeholder and audit review.',
      'Led FedRAMP-aligned audit readiness and compliance assessments by collecting, validating, and organizing evidence related to Azure resources, application deployments, architecture reviews, and cloud security controls.',
      'Developed security, audit, and compliance dashboards using Power BI and Excel, consolidating incident, change, access review, and remediation data to provide leadership visibility into KPIs and overall security posture.',
      'Facilitated weekly risk review meetings with cross-functional stakeholders, turning vague security concerns into documented action items that reduced the average finding resolution time by 25%.',
      '<b>Environment:</b> Azure (VMs, App Services, Key Vault, ACS, Entra ID, Application Insights), Power BI, Draw.io, MS Visio, MS Project, MS-Suite, NIST SP 800-53.'
    ]
  },
  {
    company: 'UnitedHealth Group (Optum)',
    role: 'Sr. Information Security Engineer Analyst',
    years: 'Dec 2021 — Sep 2025',
    details: [
      'Written, developed, and maintained System Security Plans (SSPs) for FISMA-regulated enterprise healthcare platforms across cloud and on-prem environments, compliant with NIST SP 800-53, NIST SP 800-55 rev5, MARS-E, and ARC-AMPE for multiple state customer programs.',
      'Gathered technical configurations, control evidence, and system documentation required for security and privacy control writing by working with CISOs, ISSOs, system owners, developers, and infrastructure teams.',
      'Conducted gap assessments to evaluate implementation and effectiveness of security and privacy controls across information systems, identifying real deficiencies and building remediation plans that actually got executed.',
      'Documented risks, remediation plans, and mitigation strategies within RSA Archer, ensuring traceability and audit readiness — used RSA Archer to verify policies and procedures and update them in the SSP as per control requirements.',
      'Tracked and managed POA&M remediation activities by coordinating across engineering teams to resolve identified control deficiencies — personally closed out 90%+ of findings within their target timelines.',
      'Supported A&A processes by preparing authorization package artifacts including SSPs, SARs, and POA&M updates, helping three major systems achieve their ATO approvals on time with under 5% of artifacts requiring revision.',
      'Developed golden templates with pre-built control descriptions for cloud and non-cloud environments, standardizing how the documentation team wrote SSPs and cutting drafting time by about 30%.',
      'Created an SOP that walked new team members through the full documentation lifecycle from onboarding to final delivery, cutting ramp-up time for new analysts from weeks to days.',
      'Built a technical writing style guide that standardized security documentation across the entire program, so every SSP and control description read consistently regardless of which analyst wrote it.',
      'Partnered with cloud infrastructure teams to validate secure configurations across Azure, AWS, and GCP, ensuring adherence to MARS-E, ARC-AMPE, HIPAA, and NIST frameworks.',
      'Created automation solutions and structured reports using MS Office and Power BI to showcase documentation progress and compliance status to leadership.',
      '<b>Environment:</b> RSA Archer, Azure, AWS, GCP, Power BI, MS-Suite, ServiceNow, JIRA, NIST SP 800-53, FISMA, MARS-E, ARC-AMPE, HIPAA.'
    ]
  },
  {
    company: 'Infinity Education Consultants',
    role: 'Sr. Reporting Analyst',
    years: 'Jul 2020 — Sep 2021',
    details: [
      'Managed end-to-end identity and access governance for a company-owned CRM hosted on Azure PaaS, ensuring secure role design, provisioning, and deprovisioning aligned with least-privilege and Zero Trust principles.',
      'Designed and maintained Azure Entra ID RBAC models for CRM users, service principals, and integrated PaaS components, enforcing segregation of duties across Dev, Test, and Production environments.',
      'Implemented and enforced MFA and Conditional Access policies, strengthening authentication controls for internal users, remote employees, and privileged accounts — reducing unauthorized access attempts by over 60%.',
      'Monitored authentication activity and identity-related alerts using Microsoft Sentinel, Azure Activity Logs, and Log Analytics, identifying anomalous login behavior, privilege escalation, and suspicious access patterns.',
      'Conducted periodic user access certifications with business stakeholders to eliminate privilege creep, inactive accounts, and excessive permissions that had quietly accumulated over multiple release cycles.',
      'Supported internal audits by preparing IAM evidence packages, documenting control effectiveness, and remediating identified access gaps — resulting in only low-risk observations and no critical or high-severity findings across two consecutive audit cycles.',
      'Collaborated with DevOps and cloud teams to embed secure identity controls into the CRM SDLC, maintaining secure configuration baselines for all Azure PaaS components.',
      '<b>Environment:</b> Azure (Entra ID, Sentinel, Defender for Cloud), Microsoft 365, MS-Suite, IAM, RBAC, Log Analytics, Power BI.'
    ]
  },
  {
    company: 'Jxtapose',
    role: 'Sr. Reporting Analyst',
    years: 'May 2019 — Jul 2020',
    details: [
      'Led end-to-end technology and information security governance for Jxtapose co-working spaces, overseeing cloud applications, CRM platforms, marketing systems, payment processing, and physical security infrastructure.',
      'Administered and secured HubSpot CRM and Mailchimp, managing user provisioning and deprovisioning, enforcing RBAC, and ensuring least-privilege access across sales, marketing, and operations teams.',
      'Developed and maintained security policies, SOPs, and governance documentation covering data protection, access control, and incident response that became the operational foundation for every team.',
      'Conducted internal risk assessments across IT systems, SaaS tools, and physical infrastructure, identifying vulnerabilities and implementing mitigations that brought risk exposure down by 35%.',
      'Performed vendor security assessments for third-party SaaS providers, evaluating data protection controls and operational risk exposure before approving integrations.',
      'Led reporting, compliance, and digital marketing documentation projects for 8 clients across industries.',
      'Developed Power BI dashboards and SQL-based reports to track campaign performance and operational KPIs.',
      'Automated reporting workflows using Excel VBA, reducing errors and manual workload.',
      'Configured SharePoint Online sites and workflows for client reporting, document management, and collaboration.',
      'Applied Agile methodologies (Sprint planning, stand-ups, retrospectives) to manage multiple client projects simultaneously.',
      '<b>Environment:</b> Azure, Sentinel, NIST SP 800-53, IAM, HubSpot, SQL, Power BI, MS-Suite, Incident Response.'
    ]
  },
  {
    company: 'Storyqube / Voiceqube',
    role: 'AWS Cloud Security Engineer',
    years: 'Oct 2018 — Apr 2019',
    details: [
      'Engineered and enforced cloud security controls for a voice-based mobile application platform hosted in AWS, securing core services including S3, IAM, API integrations, and logging infrastructure.',
      'Hardened AWS S3 buckets by implementing encryption at rest (SSE-S3/SSE-KMS), bucket policies, access control lists, and public access blocking to prevent data exposure.',
      'Designed and maintained secure IAM role and policy architectures, enforcing least-privilege access for developers, service accounts, and third-party integrations.',
      'Implemented centralized logging and monitoring using AWS CloudTrail and CloudWatch, enabling detection of anomalous access patterns, privilege escalation, and suspicious activity.',
      'Conducted threat modeling and security reviews for new voice application features, mobile integrations, and content onboarding workflows, identifying attack surfaces and mitigating risks prior to production release.',
      'Supported incident and problem management processes for AWS cloud environments using Agile and ITIL frameworks.',
      'Conducted root cause analysis to address recurring security and performance issues.',
      'Created security documentation, reports, and workflows to support leadership and compliance teams.',
      'Configured monitoring dashboards using Power BI, Power Query, and Excel for real-time reporting.',
      '<b>Environment:</b> AWS (S3, IAM, CloudTrail, CloudWatch), SIEM (Splunk, QRadar), Nessus, SQL, Power BI, MS-Suite, NIST RMF, FISMA, ISO 27001.'
    ]
  },
  {
    company: 'Wipro / Google',
    role: 'Associate',
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
