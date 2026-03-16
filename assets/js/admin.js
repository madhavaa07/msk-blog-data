/* ==============================================
   Blog Admin Dashboard — CRUD + Scheduling
   Rich Text Editor + Image Upload
   Uses GitHub as CMS backend
   ============================================== */

// ── Default credentials ──
const ADMIN_USER = 'madhavaa';
const ADMIN_PASS = 'Ytsan@2026';
const SESSION_KEY = 'blogAdminAuth';
const POSTS_KEY   = 'blogPosts';

// ── GitHub CMS Config ──
const GH_REPO  = 'madhavaa07/msk-blog-data';
const GH_FILE  = 'posts.json';
const GH_API   = 'https://api.github.com/repos/' + GH_REPO + '/contents/' + GH_FILE;
const GH_RAW   = 'https://raw.githubusercontent.com/' + GH_REPO + '/main/' + GH_FILE;
const GH_TOKEN_KEY = 'ghCmsToken';
let ghFileSha  = null; // SHA needed for GitHub API updates

// ── State ──
let posts = [];
let editingId = null;
let deleteId = null;
let currentFilter = 'all';
let coverImageData = null; // base64 data for cover image

// ── Boot ──
document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();

  // Load GitHub token from localStorage if present
  if (!localStorage.getItem(GH_TOKEN_KEY)) {
    // Auto-set the token on first load (user can change in settings)
    // Token is stored in browser localStorage, never exposed publicly
  }

  await loadPosts();
  checkScheduledPosts();

  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    showDashboard();
  } else {
    showLogin();
  }

  bindEvents();
  initRichTextEditor();
  initCoverUpload();
});

// ═══════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════
function showLogin() {
  document.getElementById('loginScreen').style.display = '';
  document.getElementById('dashboardScreen').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = '';
  renderPosts();
  updateStats();
  lucide.createIcons();
}

function handleLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    err.textContent = '';
    showDashboard();
  } else {
    err.textContent = 'Invalid username or password';
    err.style.display = 'block';
    document.getElementById('loginPass').value = '';
  }
}

function handleLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

// ═══════════════════════════════════════════════
//  RICH TEXT EDITOR
// ═══════════════════════════════════════════════
function initRichTextEditor() {
  const toolbar = document.getElementById('rteToolbar');
  if (!toolbar) return;

  // Toolbar button commands
  toolbar.querySelectorAll('.rte-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;

      if (cmd === 'formatBlock' && val) {
        document.execCommand(cmd, false, val);
      } else {
        document.execCommand(cmd, false, null);
      }

      document.getElementById('postContent').focus();
      updateToolbarState();
    });
  });

  // Code block button
  document.getElementById('rteCodeBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.execCommand('formatBlock', false, 'PRE');
    document.getElementById('postContent').focus();
  });

  // Link button
  document.getElementById('rteLinkBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    document.getElementById('postContent').focus();
  });

  // Inline image button
  document.getElementById('rteImageBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('rteInlineImage').click();
  });

  document.getElementById('rteInlineImage')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      document.execCommand('insertImage', false, reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // Update toolbar active states on selection change
  const editor = document.getElementById('postContent');
  editor.addEventListener('mouseup', updateToolbarState);
  editor.addEventListener('keyup', updateToolbarState);

  // Keyboard shortcuts
  editor.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); document.execCommand('bold'); break;
        case 'i': e.preventDefault(); document.execCommand('italic'); break;
        case 'u': e.preventDefault(); document.execCommand('underline'); break;
      }
      updateToolbarState();
    }
  });
}

function updateToolbarState() {
  const cmds = ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList'];
  cmds.forEach(cmd => {
    const btn = document.querySelector(`.rte-btn[data-cmd="${cmd}"]`);
    if (btn) {
      btn.classList.toggle('rte-btn-active', document.queryCommandState(cmd));
    }
  });
}

// ═══════════════════════════════════════════════
//  COVER IMAGE UPLOAD
// ═══════════════════════════════════════════════
function initCoverUpload() {
  const area = document.getElementById('coverUploadArea');
  const fileInput = document.getElementById('postImageFile');
  const removeBtn = document.getElementById('coverRemoveBtn');
  if (!area || !fileInput) return;

  // Click to upload
  area.addEventListener('click', (e) => {
    if (e.target.closest('#coverRemoveBtn')) return;
    fileInput.click();
  });

  // File selected
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCoverFile(file);
  });

  // Drag & drop
  area.addEventListener('dragover', (e) => {
    e.preventDefault();
    area.classList.add('cover-drag-over');
  });
  area.addEventListener('dragleave', () => {
    area.classList.remove('cover-drag-over');
  });
  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.classList.remove('cover-drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleCoverFile(file);
  });

  // Remove
  removeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearCoverImage();
  });
}

function handleCoverFile(file) {
  if (file.size > 2 * 1024 * 1024) {
    alert('Image must be under 2MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    coverImageData = reader.result;
    showCoverPreview(reader.result);
  };
  reader.readAsDataURL(file);
}

function showCoverPreview(src) {
  document.getElementById('coverEmpty').style.display = 'none';
  document.getElementById('coverPreview').style.display = '';
  document.getElementById('coverPreviewImg').src = src;
  lucide.createIcons();
}

function clearCoverImage() {
  coverImageData = null;
  document.getElementById('postImageFile').value = '';
  document.getElementById('coverEmpty').style.display = '';
  document.getElementById('coverPreview').style.display = 'none';
  document.getElementById('coverPreviewImg').src = '';
  lucide.createIcons();
}

// ═══════════════════════════════════════════════
//  POSTS CRUD
// ═══════════════════════════════════════════════
async function loadPosts() {
  // Try GitHub first, fall back to localStorage cache
  try {
    const token = localStorage.getItem(GH_TOKEN_KEY);
    if (token) {
      const res = await fetch(GH_API, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        ghFileSha = data.sha;
        const decoded = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
        posts = JSON.parse(decoded);
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); // cache locally
        return;
      }
    }
    // Fallback: read from raw URL (no auth needed for public repo)
    const rawRes = await fetch(GH_RAW + '?t=' + Date.now());
    if (rawRes.ok) {
      posts = await rawRes.json();
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
      return;
    }
  } catch (e) {
    console.warn('GitHub fetch failed, using local cache:', e);
  }
  // Final fallback: localStorage cache
  try {
    posts = JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
  } catch { posts = []; }
}

// ── Seed LinkedIn blog posts as drafts ──
function seedDefaultDrafts() {
  const SEED_KEY = 'blogDraftsSeeded_v3';
  if (localStorage.getItem(SEED_KEY)) return;
  // Clear old seed keys
  localStorage.removeItem('blogDraftsSeeded_v2');

  const linkedInPosts = [
    {
      id: generateId(),
      title: 'Malware Education: The First Line of Cyber Defense',
      category: 'compliance',
      excerpt: 'Cybersecurity isn\'t just an IT team problem anymore. Every single one of us plays a role in keeping our company safe. Basic malware awareness is one of the easiest and most powerful ways to reduce cyber risk.',
      content: '<h2>Malware Education: The First Line of Cyber Defense</h2><p>Let\'s be honest — cybersecurity isn\'t just an IT team problem anymore. Every single one of us plays a role in keeping our company safe.</p><p>One of the easiest (and most powerful) ways to reduce cyber risk is basic malware awareness. Malware — which includes things like viruses, ransomware, and spyware — usually doesn\'t break in through some Hollywood-style hack. Most of the time, it gets in because someone clicked something they shouldn\'t have.</p><p>Here are some simple habits that make a huge difference:</p><h3>Keep your computer updated</h3><p>Updates aren\'t just annoying pop-ups. They fix security holes. Delaying updates gives attackers an open door.</p><h3>Avoid using admin accounts for daily work</h3><p>Admin access gives full control of a system. If malware hits an admin account, the damage spreads fast. Use standard accounts whenever possible.</p><h3>Think before you click</h3><p>Unexpected email? Strange link? Weird attachment? Pause for a second. Phishing emails are designed to look real. That extra moment of caution can save hours (or days) of recovery work.</p><h3>Be careful with attachments and images</h3><p>Even emails that look like they\'re from someone you know can be spoofed. If something feels off, verify first.</p><h3>Ignore random pop-ups asking you to download software</h3><p>Legitimate updates don\'t usually show up as flashy pop-ups. When in doubt, close it.</p><h3>Limit file sharing</h3><p>Sharing files freely might feel convenient, but it increases exposure. Stick to secure, approved tools.</p><h3>Use antivirus and endpoint protection</h3><p>Security software is your safety net. It helps detect and block threats before they cause damage.</p><p>At the end of the day, technology helps — but awareness is what really protects organizations. Cybersecurity isn\'t complicated. It\'s about small, consistent habits. If everyone does their part, malware has a much harder time getting in.</p><p>Let\'s stay alert and keep our systems safe.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/malware-education.png',
      tags: ['Malware', 'Education', 'Cybersecurity', 'Infosec', 'Vulnerabilities'],
      createdAt: '2026-03-04T10:00:00.000Z',
      updatedAt: '2026-03-04T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'Why Senior Cloud Security Roles Place Greater Emphasis on Judgment Alongside Technology',
      category: 'cloud-security',
      excerpt: 'Early in a cloud security career, progress is tied to technical expertise. But as professionals move into senior roles, the scope of responsibility expands far beyond technology alone.',
      content: '<h2>Why Senior Cloud Security Roles Place Greater Emphasis on Judgment Alongside Technology</h2><p>Early in a cloud security career, progress is closely tied to technical expertise. Learning cloud platforms, implementing identity and access controls, configuring network security, enabling encryption, and aligning with industry frameworks are all essential skills. This technical foundation remains critical at every stage of a security professional\'s journey.</p><p>As professionals move into senior cloud security roles, however, the scope of responsibility expands. Technology continues to matter, but it is no longer the only focus. Greater emphasis is placed on applying experience, understanding context, and making well-considered decisions within complex cloud environments.</p><p>Most organizations today already rely on robust cloud-native security capabilities. Cloud providers offer built-in tools for monitoring, logging, access control, and resilience. While these capabilities provide strong protection, they do not automatically account for business priorities, operational constraints, or evolving risk tolerance. Senior cloud security professionals play an important role in interpreting these factors and aligning security decisions with organizational objectives.</p><p>Cloud security decisions are rarely straightforward. Leaders must often balance agility with governance, innovation with stability, and security with business impact. Decisions such as approving new cloud services, prioritizing remediation efforts, or enabling cross-region access require a clear understanding of system criticality, data sensitivity, and compliance obligations. These situations benefit from experience-driven judgment rather than purely technical responses.</p><p>Context is especially important in cloud environments. The same control may be appropriate in one workload but unnecessary or excessive in another. Senior professionals evaluate these differences and apply security measures proportionately, supporting protection without introducing unnecessary friction.</p><p>Ultimately, senior cloud security roles are defined by a balanced combination of technical expertise, contextual awareness, and thoughtful decision-making. This balance enables organizations to build cloud security programs that are resilient, scalable, and aligned with long-term business goals.</p>',
      readTime: 6,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/senior-cloud-security.png',
      tags: ['Cloud Security', 'Cybersecurity', 'Information Security', 'Security Leadership', 'Cloud Computing', 'Risk Management'],
      createdAt: '2026-02-25T10:00:00.000Z',
      updatedAt: '2026-02-25T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'Why System Boundaries, Data Flows, and Cloud Diagrams Are Critical — Not Optional',
      category: 'cloud-security',
      excerpt: 'In cloud security, documentation isn\'t overhead — it\'s your map. System boundaries, data flows, network diagrams, and infrastructure diagrams each serve a distinct purpose in building secure systems.',
      content: '<h2>Why System Boundaries, Data Flows, and Cloud Diagrams Are Critical — Not Optional</h2><p>In cloud security, clear documentation isn\'t overhead — it\'s your map. System boundaries, data flows, network diagrams, and infrastructure diagrams each serve a distinct and essential purpose.</p><h3>System Boundaries</h3><p>A system boundary defines what\'s in scope and what\'s not. Without it, teams struggle to identify what they\'re responsible for protecting — and auditors can\'t assess what they can\'t see. A well-defined boundary supports compliance, accountability, and accurate risk assessments.</p><h3>Data Flow Diagrams</h3><p>Understanding how data moves is just as important as knowing where it lives. Data flow diagrams reveal where sensitive information enters, how it\'s processed, and where it exits the system. They help identify exposure points, encryption gaps, and unauthorized paths.</p><h3>Network Diagrams</h3><p>Many security incidents occur due to misunderstood or overly open network paths rather than poor code. A clear network diagram reduces exposure and speeds up troubleshooting.</p><h3>Infrastructure Diagrams</h3><p>Infrastructure diagrams provide a high-level view of deployed cloud resources and dependencies. They help teams understand availability, redundancy, and potential failure points while ensuring consistency across environments.</p><p>Reviewing these diagrams alongside actual configurations is just as important as creating them. Cloud environments change quickly, and diagrams help confirm that reality still matches design.</p><p>Together, these artifacts provide visibility, accountability, and control — making them essential for secure, stable, and scalable cloud systems.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/system-boundaries.png',
      tags: ['Cloud Security', 'System Design', 'Architecture', 'Information Security', 'DevSecOps', 'Compliance'],
      createdAt: '2026-02-18T10:00:00.000Z',
      updatedAt: '2026-02-18T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'AI-Powered GRC & Compliance Automation',
      category: 'grc',
      excerpt: 'Governance, Risk, and Compliance has traditionally been manual and time-consuming. AI is starting to make a real difference — from automated evidence collection to continuous compliance monitoring.',
      content: '<h2>AI-Powered GRC & Compliance Automation</h2><p>Governance, Risk, and Compliance (GRC) has traditionally been very manual and time-consuming. Teams often spend weeks collecting evidence, mapping controls to frameworks like NIST, ISO, and SOC, and getting ready for audits. In highly regulated environments, this same work repeats every quarter or year, adding pressure, slowing teams down, and increasing the chance of errors. This is where AI is starting to make a real difference.</p><h3>Automated Evidence Collection</h3><p>One of the biggest benefits of AI in GRC is automated evidence collection. Instead of manually gathering screenshots, logs, and configuration details, AI-enabled tools can continuously pull evidence from cloud platforms, IAM systems, ticketing tools, and monitoring solutions. This keeps evidence up to date and removes the stress of last-minute audit preparation.</p><h3>Control Mapping Across Frameworks</h3><p>AI also helps simplify control mapping across frameworks. Many organizations must follow multiple standards at the same time, such as NIST, ISO 27001, SOC 2, HIPAA, or state and federal requirements. AI can review existing controls, map them across frameworks, and highlight gaps or overlaps. This reduces duplicate work and gives teams a clearer picture of their overall compliance posture.</p><h3>Continuous Compliance Monitoring</h3><p>Another key advantage is continuous compliance monitoring. Traditional compliance checks happen at specific points in time, which means issues can go unnoticed between audits. AI can monitor configuration changes, access activity, and security events in near real time and flag potential compliance issues early. This allows teams to fix problems before they grow into audit findings.</p><h3>Improved Reporting and Audit Readiness</h3><p>AI-powered GRC tools also improve reporting and audit readiness. Evidence, remediation tasks, and risk data can be organized automatically, making it easier to generate reports for auditors and leadership. Dashboards can show high-risk areas, open findings, and trends in a way that is easy for both technical and non-technical teams to understand.</p><p>Most importantly, AI reduces manual effort and burnout. GRC teams can spend less time on repetitive tasks and more time on meaningful work like risk analysis, policy improvement, and strategic planning. With the right oversight, AI becomes a strong support system rather than a replacement for human judgment.</p><p>In today\'s regulated environments, AI-powered GRC automation is quickly becoming a must-have. Organizations that adopt it are better prepared for audits, more proactive about risk, and more flexible as regulations continue to evolve.</p>',
      readTime: 7,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/ai-powered-grc.png',
      tags: ['GRC', 'Compliance', 'AI', 'Risk Management', 'Audit Readiness', 'NIST', 'SOC2', 'ISO27001'],
      createdAt: '2026-02-11T10:00:00.000Z',
      updatedAt: '2026-02-11T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'Healthcare Cybersecurity: Every Clinician, Engineer, and Analyst as a Guardian of Patient Trust',
      category: 'compliance',
      excerpt: 'In healthcare, cybersecurity is more than protecting systems — it\'s about protecting patients. Every record, every test result, and every diagnosis represents a life.',
      content: '<h2>Healthcare Cybersecurity: Guardians of Patient Trust</h2><p>In healthcare, cybersecurity is more than protecting systems — it\'s about protecting patients. Every record, every test result, and every diagnosis represents a life. As information security professionals, our responsibility extends beyond networks and firewalls; it\'s about ensuring that trust and care go hand in hand.</p><p>After nearly 5 years in information security, I\'ve realized that true healthcare cybersecurity is built on people, not just technology. Clinicians, engineers, and analysts each play a role in defending the organization\'s most valuable asset — patient trust. When everyone sees data protection as part of patient care, compliance with frameworks like HIPAA, ISO 27001, and NIST naturally follows.</p><p>The biggest risk in healthcare security isn\'t a lack of tools — it\'s a lack of awareness. A single click, a weak password, or a missed update can create vulnerabilities that threaten not only data but patient safety. Building a culture of shared accountability turns every employee into a guardian of patient information.</p><p>Our goal should not just be to stop cyberattacks but to build resilience. When awareness meets collaboration, and leadership empowers teams to act proactively, that\'s when cybersecurity becomes part of the organization\'s DNA.</p><p>Healthcare organizations that prioritize security culture don\'t just meet regulations — they earn patient confidence. Because in the end, protecting information means protecting people.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/healthcare-cybersecurity.png',
      tags: ['Information Security', 'Cybersecurity', 'Healthcare', 'HIPAA', 'Safety', 'Data Protection'],
      createdAt: '2026-02-08T10:00:00.000Z',
      updatedAt: '2026-02-08T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'The SOC: Beating Heart of Modern Cybersecurity',
      category: 'threat-hunting',
      excerpt: 'A Security Operations Center serves as the beating heart of any modern organization\'s cybersecurity posture. After eight years in information security, one lesson stands out: technology alone isn\'t enough.',
      content: '<h2>The SOC: Beating Heart of Modern Cybersecurity</h2><p>A Security Operations Center (SOC) serves as the beating heart of any modern organization\'s cybersecurity posture. After eight years in information security, one lesson stands out: technology alone isn\'t enough to defend an organization.</p><p>A SOC combines advanced tools, defined processes, and skilled professionals to monitor, detect, and respond to security threats in real time. It\'s where threat intelligence meets operational action, and where every alert could be the early warning of a larger attack.</p><p>An effective SOC operates around the clock, analyzing security events from endpoints, networks, cloud infrastructure, and applications. It uses SIEM platforms, EDR solutions, and threat intelligence feeds to identify anomalies and potential threats before they escalate.</p><p>But the real strength of a SOC lies in its people. Analysts who understand the threat landscape, engineers who fine-tune detection rules, and leaders who prioritize resources are all critical to defending the organization.</p><p>Ultimately, SOC success depends on continual learning, adaptable teams, and strong leadership. As the threat landscape evolves, so must our approach — blending experience-driven insight with cutting-edge solutions.</p><p>Protecting information is a shared responsibility, and the SOC stands at the frontline, turning vigilance into organizational resilience.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/soc-beating-heart.png',
      tags: ['Cybersecurity', 'Information Security', 'SOC', 'SOC Audit', 'Monitoring'],
      createdAt: '2026-02-05T10:00:00.000Z',
      updatedAt: '2026-02-05T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'System Security Plans: More Than a Compliance Checklist',
      category: 'grc',
      excerpt: 'A System Security Plan (SSP) is more than a compliance checklist — it\'s the foundation of trust, accountability, and resilience. True cybersecurity is built through structure, documentation, and culture.',
      content: '<h2>System Security Plans: More Than a Compliance Checklist</h2><p>A System Security Plan (SSP) is more than a compliance checklist — it\'s the foundation of trust, accountability, and resilience. In my 5 years of working in information security, I\'ve learned that a well-maintained SSP is one of the most valuable documents an organization can have.</p><p>An SSP establishes a clear security baseline, ensuring that teams understand what is being protected and how. It provides a single source of truth for auditors, stakeholders, and leadership, promoting accountability across the organization. Beyond compliance, it drives continuous monitoring, helping security teams detect gaps, manage vulnerabilities, and plan remediation through POA&Ms (Plans of Action and Milestones).</p><p>Most importantly, an effective SSP reinforces trust. In sectors such as healthcare, where protecting sensitive data means protecting lives, a transparent and maintained security plan demonstrates ethical responsibility and operational maturity.</p><p>True cybersecurity isn\'t achieved through tools alone — it\'s built through structure, documentation, and culture. Maintaining an updated SSP ensures your organization not only meets regulatory expectations but sustains long-term data protection and patient trust.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/system-security-plans.png',
      tags: ['Information Security', 'Cybersecurity', 'Risk Management', 'SSP', 'HIPAA Compliance', 'NIST'],
      createdAt: '2026-02-02T10:00:00.000Z',
      updatedAt: '2026-02-02T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'AI in Cyber Security: Reshaping the Defense Landscape',
      category: 'tools',
      excerpt: 'Artificial Intelligence is no longer a futuristic idea — it\'s actively reshaping how organizations detect threats, respond to incidents, and build resilient security programs.',
      content: '<h2>AI in Cyber Security</h2><p>Artificial Intelligence (AI) is no longer a futuristic idea; it\'s actively reshaping how organizations detect threats, respond to incidents, and build resilient security programs. From automated threat detection to predictive analytics, AI is becoming an essential tool in the cybersecurity arsenal.</p><p>AI-powered security tools can analyze vast amounts of data in real time, identifying patterns that would take human analysts much longer to spot. This includes detecting anomalous network behavior, flagging suspicious login attempts, and correlating events across multiple systems to identify advanced persistent threats.</p><p>Machine learning models continuously improve their detection capabilities by learning from historical data and adapting to new attack techniques. This makes AI particularly effective against zero-day exploits and evolving malware variants that signature-based tools might miss.</p><p>However, AI in cybersecurity is not a silver bullet. It requires careful implementation, quality training data, and human oversight to avoid false positives and ensure accurate threat assessment. The most effective security programs combine AI automation with experienced human judgment.</p><p>As cyber threats grow in sophistication and volume, AI will continue to play an increasingly important role in helping security teams stay ahead of attackers while managing the growing complexity of modern IT environments.</p>',
      readTime: 5,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/ai-cyber-security.png',
      tags: ['AI', 'Cybersecurity', 'Machine Learning', 'Threat Detection', 'Security Automation'],
      createdAt: '2026-01-28T10:00:00.000Z',
      updatedAt: '2026-01-28T10:00:00.000Z',
      publishedAt: null
    },
    {
      id: generateId(),
      title: 'How AI and Analytics Are Transforming Identity & Access Management (IAM)',
      category: 'iam',
      excerpt: 'AI and analytics are revolutionizing IAM — from intelligent access provisioning to real-time anomaly detection, making identity management smarter and more adaptive than ever.',
      content: '<h2>How AI and Analytics Are Transforming Identity & Access Management (IAM)</h2><p>Identity and Access Management (IAM) has evolved far beyond simple username-password authentication. With AI and advanced analytics, organizations can now implement intelligent, adaptive access controls that respond to risk in real time.</p><p>AI-powered IAM systems can analyze user behavior patterns to detect anomalies — such as unusual login locations, access outside normal hours, or attempts to reach resources outside a user\'s typical scope. These systems can automatically trigger step-up authentication or temporarily restrict access when suspicious activity is detected.</p><p>Predictive analytics help organizations anticipate access needs based on role changes, project assignments, and organizational structure. This enables more efficient provisioning and deprovisioning, reducing the risk of privilege creep and orphaned accounts.</p><p>AI also enhances access reviews by automatically identifying high-risk entitlements, flagging excessive permissions, and recommending remediation actions. This transforms access certification from a tedious checkbox exercise into a meaningful security control.</p><p>As organizations adopt zero-trust architectures and expand their cloud footprints, AI-driven IAM becomes essential for maintaining security without sacrificing user experience. The future of IAM lies in continuous, context-aware access decisions powered by intelligent automation.</p>',
      readTime: 6,
      status: 'draft',
      scheduleDate: null,
      imageUrl: 'assets/images/blog/ai-iam.png',
      tags: ['IAM', 'AI', 'Analytics', 'Identity Management', 'Access Control', 'Zero Trust'],
      createdAt: '2026-01-25T10:00:00.000Z',
      updatedAt: '2026-01-25T10:00:00.000Z',
      publishedAt: null
    }
  ];

  // Clear old seed flag and posts, replace with LinkedIn posts
  localStorage.removeItem('blogDraftsSeeded');
  posts = [...linkedInPosts, ...posts.filter(p => !linkedInPosts.some(lp => lp.title === p.title))];
  savePosts();
  localStorage.setItem(SEED_KEY, 'true');
}

async function savePosts() {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); // always cache locally
  const token = localStorage.getItem(GH_TOKEN_KEY);
  if (!token) { console.warn('No GitHub token — saved locally only'); return; }
  try {
    const jsonStr = JSON.stringify(posts, null, 2);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const body = { message: 'Update posts — ' + new Date().toISOString(), content: b64 };
    if (ghFileSha) body.sha = ghFileSha;
    const res = await fetch(GH_API, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const data = await res.json();
      ghFileSha = data.content.sha;
    } else {
      const err = await res.json();
      console.error('GitHub save failed:', err.message);
      // If SHA mismatch, re-fetch and retry
      if (res.status === 409 || (err.message && err.message.includes('sha'))) {
        await loadPosts(); // refresh SHA
        await savePosts(); // retry
      }
    }
  } catch (e) { console.error('GitHub save error:', e); }
}

function generateId() {
  return 'post_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

async function createPost(data) {
  const post = {
    id: generateId(),
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    content: data.content || '',
    readTime: data.readTime || 5,
    status: data.status || 'draft',
    scheduleDate: data.scheduleDate || null,
    imageUrl: data.imageUrl || '',
    tags: data.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: data.status === 'published' ? new Date().toISOString() : null
  };
  posts.unshift(post);
  await savePosts();
  renderPosts();
  updateStats();
  return post;
}

async function updatePost(id, data) {
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return;

  const post = posts[idx];
  post.title = data.title;
  post.category = data.category;
  post.excerpt = data.excerpt;
  post.content = data.content || '';
  post.readTime = data.readTime || 5;
  post.status = data.status;
  post.scheduleDate = data.scheduleDate || null;
  post.imageUrl = data.imageUrl || '';
  post.tags = data.tags || [];
  post.updatedAt = new Date().toISOString();

  if (data.status === 'published' && !post.publishedAt) {
    post.publishedAt = new Date().toISOString();
  }

  posts[idx] = post;
  await savePosts();
  renderPosts();
  updateStats();
}

async function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  await savePosts();
  renderPosts();
  updateStats();
}

// ═══════════════════════════════════════════════
//  SCHEDULING
// ═══════════════════════════════════════════════
async function checkScheduledPosts() {
  const now = new Date();
  let changed = false;
  posts.forEach(post => {
    if (post.status === 'scheduled' && post.scheduleDate) {
      const sched = new Date(post.scheduleDate);
      if (sched <= now) {
        post.status = 'published';
        post.publishedAt = post.scheduleDate;
        changed = true;
      }
    }
  });
  if (changed) {
    await savePosts();
    renderPosts();
    updateStats();
  }
  setTimeout(checkScheduledPosts, 60000);
}

// ═══════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════
function renderPosts() {
  const table = document.getElementById('postsTable');
  const empty = document.getElementById('emptyState');

  const filtered = currentFilter === 'all'
    ? posts
    : posts.filter(p => p.status === currentFilter);

  if (filtered.length === 0) {
    table.innerHTML = '';
    empty.style.display = 'flex';
    lucide.createIcons();
    return;
  }

  empty.style.display = 'none';

  const categoryLabels = {
    'cloud-security': 'Cloud Security',
    'grc': 'GRC',
    'iam': 'IAM',
    'threat-hunting': 'Threat Hunting',
    'compliance': 'Compliance',
    'career': 'Career',
    'tools': 'Tools & Tech'
  };

  const categoryIcons = {
    'cloud-security': 'cloud',
    'grc': 'shield-check',
    'iam': 'key-round',
    'threat-hunting': 'search',
    'compliance': 'clipboard-check',
    'career': 'briefcase',
    'tools': 'wrench'
  };

  const statusConfig = {
    published: { label: 'Published', class: 'status-published', icon: 'check-circle' },
    scheduled: { label: 'Scheduled', class: 'status-scheduled', icon: 'clock' },
    draft:     { label: 'Draft',     class: 'status-draft',     icon: 'file-edit' }
  };

  table.innerHTML = filtered.map(post => {
    const sc = statusConfig[post.status] || statusConfig.draft;
    const cat = categoryLabels[post.category] || post.category;
    const catIcon = categoryIcons[post.category] || 'file-text';
    const date = post.publishedAt
      ? formatDate(post.publishedAt)
      : post.scheduleDate
        ? 'Sched: ' + formatDate(post.scheduleDate)
        : formatDate(post.updatedAt);

    // Image area: cover image or gradient placeholder with category icon
    const imgArea = post.imageUrl
      ? `<img src="${post.imageUrl}" alt="">`
      : `<div class="admin-card-placeholder"><i data-lucide="${catIcon}" style="width:32px;height:32px"></i></div>`;

    return `
      <article class="admin-post-card" data-id="${post.id}">
        <div class="admin-card-img">
          ${imgArea}
          <div class="admin-card-badge">
            <span class="admin-status-badge ${sc.class}">
              <i data-lucide="${sc.icon}" style="width:11px;height:11px"></i>
              ${sc.label}
            </span>
          </div>
        </div>
        <div class="admin-card-body">
          <div class="admin-card-meta">
            <span class="admin-post-cat">${cat}</span>
            <span class="admin-post-date">
              <i data-lucide="calendar" style="width:12px;height:12px"></i>
              ${date}
            </span>
          </div>
          <h3 class="admin-post-title">${escapeHtml(post.title)}</h3>
          <p class="admin-card-excerpt">${escapeHtml(post.excerpt || '')}</p>
          <div class="admin-card-footer">
            <span class="admin-post-read">
              <i data-lucide="clock" style="width:12px;height:12px"></i>
              ${post.readTime} min read
            </span>
            <div class="admin-card-actions">
              <button class="admin-action-btn" onclick="editPost('${post.id}')" title="Edit">
                <i data-lucide="pencil" style="width:15px;height:15px"></i>
              </button>
              ${post.status === 'draft' || post.status === 'scheduled' ? `
              <button class="admin-action-btn admin-action-publish" onclick="quickPublish('${post.id}')" title="Publish Now">
                <i data-lucide="send" style="width:15px;height:15px"></i>
              </button>` : ''}
              <button class="admin-action-btn admin-action-crosspost" onclick="openCrossPost('${post.id}')" title="Share to LinkedIn">
                <i data-lucide="share-2" style="width:15px;height:15px"></i>
              </button>
              <button class="admin-action-btn admin-action-delete" onclick="confirmDelete('${post.id}')" title="Delete">
                <i data-lucide="trash-2" style="width:15px;height:15px"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  lucide.createIcons();
}

function updateStats() {
  document.getElementById('statTotal').textContent     = posts.length;
  document.getElementById('statPublished').textContent  = posts.filter(p => p.status === 'published').length;
  document.getElementById('statScheduled').textContent  = posts.filter(p => p.status === 'scheduled').length;
  document.getElementById('statDraft').textContent      = posts.filter(p => p.status === 'draft').length;
}

// ═══════════════════════════════════════════════
//  EDITOR
// ═══════════════════════════════════════════════
function openEditor(post) {
  const modal = document.getElementById('editorModal');
  editingId = post ? post.id : null;

  document.getElementById('editorTitle').textContent = post ? 'Edit Post' : 'New Post';
  document.getElementById('postTitle').value         = post ? post.title : '';
  document.getElementById('postCategory').value      = post ? post.category : 'cloud-security';
  document.getElementById('postExcerpt').value       = post ? post.excerpt : '';
  document.getElementById('postReadTime').value      = post ? post.readTime : 5;
  document.getElementById('postStatus').value        = post ? post.status : 'draft';
  document.getElementById('postTags').value          = post ? (post.tags || []).join(', ') : '';

  // Rich text editor content
  const editor = document.getElementById('postContent');
  if (post && post.content) {
    editor.innerHTML = post.content;
  } else {
    editor.innerHTML = '';
  }

  // Cover image
  if (post && post.imageUrl) {
    coverImageData = post.imageUrl;
    showCoverPreview(post.imageUrl);
  } else {
    clearCoverImage();
  }

  if (post && post.scheduleDate) {
    document.getElementById('postScheduleDate').value = post.scheduleDate.slice(0, 16);
  } else {
    document.getElementById('postScheduleDate').value = '';
  }

  toggleScheduleField();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeEditor() {
  const modal = document.getElementById('editorModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  editingId = null;
  coverImageData = null;
}

function getFormData() {
  const title    = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const excerpt  = document.getElementById('postExcerpt').value.trim();
  const editor   = document.getElementById('postContent');
  const content  = editor.innerHTML.trim();
  const readTime = parseInt(document.getElementById('postReadTime').value) || 5;
  const status   = document.getElementById('postStatus').value;
  const imageUrl = coverImageData || '';
  const tagsRaw  = document.getElementById('postTags').value.trim();
  const tags     = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const scheduleDate = status === 'scheduled'
    ? document.getElementById('postScheduleDate').value
    : null;

  return { title, category, excerpt, content, readTime, status, scheduleDate, imageUrl, tags };
}

function validateForm(data) {
  if (!data.title) { alert('Please enter a post title.'); return false; }
  if (!data.excerpt) { alert('Please enter an excerpt.'); return false; }
  if (data.status === 'scheduled' && !data.scheduleDate) {
    alert('Please select a publish date for scheduled posts.');
    return false;
  }
  return true;
}

async function savePost(overrideStatus) {
  const data = getFormData();
  if (overrideStatus) data.status = overrideStatus;
  if (!validateForm(data)) return;

  if (editingId) {
    await updatePost(editingId, data);
  } else {
    await createPost(data);
  }
  closeEditor();
}

function editPost(id) {
  const post = posts.find(p => p.id === id);
  if (post) openEditor(post);
}

async function quickPublish(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.status = 'published';
  post.publishedAt = new Date().toISOString();
  post.updatedAt = new Date().toISOString();
  await savePosts();
  renderPosts();
  updateStats();
}

function toggleScheduleField() {
  const status = document.getElementById('postStatus').value;
  const wrap = document.getElementById('scheduleDateWrap');
  wrap.style.display = status === 'scheduled' ? '' : 'none';
}

// ═══════════════════════════════════════════════
//  DELETE
// ═══════════════════════════════════════════════
function confirmDelete(id) {
  deleteId = id;
  const post = posts.find(p => p.id === id);
  document.getElementById('deleteMsg').textContent =
    `Are you sure you want to delete "${post ? post.title : 'this post'}"? This cannot be undone.`;
  document.getElementById('deleteModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('active');
  document.body.style.overflow = '';
  deleteId = null;
}

async function executeDelete() {
  if (deleteId) await deletePost(deleteId);
  closeDeleteModal();
}

// ═══════════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════════
function bindEvents() {
  // Login
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('loginPass').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('loginUser').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('loginPass').focus();
  });

  // Password toggle
  document.getElementById('passToggle').addEventListener('click', () => {
    const inp = document.getElementById('loginPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);

  // New post
  document.getElementById('newPostBtn').addEventListener('click', () => openEditor(null));
  document.getElementById('emptyNewBtn')?.addEventListener('click', () => openEditor(null));

  // Editor save/publish
  document.getElementById('publishBtn').addEventListener('click', () => savePost());
  document.getElementById('saveDraftBtn').addEventListener('click', () => savePost('draft'));

  // Status change → toggle schedule field
  document.getElementById('postStatus').addEventListener('change', toggleScheduleField);

  // Delete confirm
  document.getElementById('confirmDeleteBtn').addEventListener('click', executeDelete);

  // Filter pills
  document.querySelectorAll('.admin-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-filter').forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderPosts();
    });
  });

  // Close modals on overlay click
  document.getElementById('editorModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEditor();
  });
  document.getElementById('deleteModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeEditor();
      closeDeleteModal();
    }
  });
}

// ═══════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

function escapeHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

// ═══════════════════════════════════════════════
//  PLATFORM INTEGRATIONS — LinkedIn
// ═══════════════════════════════════════════════
const INTEGRATIONS_KEY = 'blogIntegrations';

function loadIntegrations() {
  try {
    return JSON.parse(localStorage.getItem(INTEGRATIONS_KEY)) || {};
  } catch { return {}; }
}

function saveIntegrations(data) {
  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(data));
}

// ── Settings Modal ──
function openSettings() {
  const modal = document.getElementById('settingsModal');
  const config = loadIntegrations();
  document.getElementById('linkedinSiteUrl').value = config.linkedinSiteUrl || '';
  // GitHub token field (inject if not present)
  let ghInput = document.getElementById('ghTokenInput');
  if (!ghInput) {
    const linkedinSection = document.querySelector('#settingsModal .settings-section');
    if (linkedinSection) {
      const ghSection = document.createElement('div');
      ghSection.className = 'settings-section';
      ghSection.style.marginTop = '1.5rem';
      ghSection.innerHTML = '<h3 style="margin-bottom:.5rem;">GitHub CMS</h3>' +
        '<p style="font-size:.85rem;opacity:.7;margin-bottom:.5rem;">Token for saving posts to GitHub repo</p>' +
        '<label style="font-size:.85rem;font-weight:500;">GitHub Personal Access Token</label>' +
        '<input type="password" id="ghTokenInput" style="width:100%;padding:.5rem;margin-top:.25rem;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);" placeholder="github_pat_...">';
      linkedinSection.parentNode.insertBefore(ghSection, linkedinSection.nextSibling);
    }
    ghInput = document.getElementById('ghTokenInput');
  }
  if (ghInput) ghInput.value = localStorage.getItem(GH_TOKEN_KEY) || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('active');
  document.body.style.overflow = '';
}

function saveSettings() {
  const siteUrl = document.getElementById('linkedinSiteUrl').value.trim();
  saveIntegrations({ linkedinSiteUrl: siteUrl });
  // Save GitHub token
  const ghInput = document.getElementById('ghTokenInput');
  if (ghInput) {
    const token = ghInput.value.trim();
    if (token) localStorage.setItem(GH_TOKEN_KEY, token);
    else localStorage.removeItem(GH_TOKEN_KEY);
  }
  closeSettings();
}

// Wire up settings buttons
document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

  const saveBtn = document.getElementById('saveSettingsBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveSettings);
});

// ── Cross-Post Modal ──
let crossPostId = null;

function openCrossPost(postId) {
  crossPostId = postId;
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const body = document.getElementById('crossPostBody');
  body.innerHTML = `
    <p style="font-size:.85rem;opacity:.7;margin-bottom:1rem">
      Share "<strong>${escapeHtml(post.title)}</strong>" to LinkedIn:
    </p>

    <!-- LinkedIn -->
    <div class="crosspost-platform">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="flex-shrink:0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
      </svg>
      <div class="crosspost-platform-info">
        <h4>LinkedIn</h4>
        <p>Opens share dialog in a new window</p>
      </div>
      <button class="crosspost-btn crosspost-btn-linkedin" onclick="shareToLinkedIn('${postId}')">
        <i data-lucide="external-link" style="width:13px;height:13px"></i>
        Share
      </button>
    </div>
    <div class="crosspost-result" id="linkedinResult"></div>
  `;

  document.getElementById('crossPostModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeCrossPost() {
  document.getElementById('crossPostModal').classList.remove('active');
  document.body.style.overflow = '';
  crossPostId = null;
}

// ── Share to LinkedIn ──
function shareToLinkedIn(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const config = loadIntegrations();
  const siteUrl = config.linkedinSiteUrl || '';

  // Build share text: title + excerpt + hashtags
  const hashtags = (post.tags || []).slice(0, 5).map(t => '#' + t.replace(/\s+/g, '')).join(' ');
  const shareText = `${post.title}\n\n${post.excerpt}\n\n${hashtags}`;

  // LinkedIn share URL
  let linkedinUrl;
  if (siteUrl) {
    // If we have a blog URL, share as a link post
    const postUrl = `${siteUrl}#post-${postId}`;
    linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  } else {
    // Text-only share via the feed
    linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
  }

  // Open in new window
  window.open(linkedinUrl, '_blank', 'width=600,height=600');

  showCrossPostResult('linkedinResult', 'success',
    'LinkedIn share window opened! Complete your post there.'
  );
}

// ── Helper ──
function showCrossPostResult(elementId, type, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.className = `crosspost-result ${type}`;
  el.innerHTML = message;
  el.style.display = 'block';
}

// Add spin animation for loading state
if (!document.getElementById('crosspost-spin-style')) {
  const style = document.createElement('style');
  style.id = 'crosspost-spin-style';
  style.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
}
