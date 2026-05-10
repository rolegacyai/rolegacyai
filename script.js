'use strict';

// ─── LANGUAGE SWITCHER + LIGHTWEIGHT STATIC I18N ─────────────────────────────
(function initLanguageSwitcher() {
  const STORAGE_KEY = 'rolegacyai-language';
  const supported = ['en', 'zh-CN'];
  const defaultLang = 'en';

  const translations = {
    'How It Works': '工作原理',
    'Architecture': '架构',
    'Insights': '洞察',
    'The Report': '报告',
    'Prototype': '原型',
    'Join Discovery Cohort': '加入探索计划',
    'Institutional Memory Platform': '组织记忆平台',
    'The AI memory layer that stays\nwhen people leave.': '当人员离开时，\n仍然留下的 AI 记忆层。',
    'Every successor should inherit the decisions, lessons, workarounds, and institutional context of the people who held the role before them.': '每一位接任者都应继承前任在岗位中积累的决策、经验、变通方法和组织背景。',
    'People move on. The role gets stronger.': '人员会流动，岗位应更强。',
    'See How It Works': '查看工作原理',
    'Most organisations reset to zero every time someone leaves.': '大多数组织在关键人员离开时都会被迫归零。',
    'Critical knowledge disappears. New hires repeat old mistakes. Wikis go stale. Exit interviews are forgotten. SMEs become bottlenecks. Onboarding takes months.': '关键知识会消失，新员工会重复旧错误，知识库会过时，离职访谈会被遗忘，专家会成为瓶颈，入职适应可能持续数月。',
    'Critical knowledge walks out': '关键知识随人离开',
    'Years of operational context, undocumented decisions, and hard-won lessons leave with the person.': '多年的运营背景、未记录的决策和来之不易的经验，会随着人员离开而流失。',
    'New hires repeat old mistakes': '新员工重复旧错误',
    'Without access to prior decisions and rationale, successors rediscover the same problems from scratch.': '如果无法了解过往决策和原因，接任者只能从零开始重新踩坑。',
    'Wikis are abandoned': '知识库被遗忘',
    'Documentation platforms require discipline no one has time for. They grow stale within months of creation.': '文档平台需要持续维护，但现实中很少有人有时间做到。它们往往在几个月内过时。',
    'Exit interviews are too late': '离职访谈太晚',
    'By the time someone is leaving, the institutional context is already partially gone and hard to articulate.': '等到人员即将离开时，许多组织背景已经模糊，也很难完整表达。',
    'SMEs become bottlenecks': '专家成为瓶颈',
    "Subject matter experts become the single point of failure for operational decisions they've made a hundred times.": '主题专家会成为运营决策的单点依赖，即使这些决策他们已经做过上百次。',
    'Onboarding takes months': '入职适应耗时数月',
    'Without contextual role knowledge, new hires spend months learning what predecessors already figured out.': '没有岗位上下文，新员工往往要花数月时间重新理解前任已经解决的问题。',
    'Every successor makes the role stronger.': '每一次交接，都应让岗位更强。',
    'No context': '无上下文',
    'Capturing': '捕获中',
    'Inheriting': '继承中',
    'Validated': '已验证',
    'Institutional operator': '组织型岗位执行者',
    'How RolegacyAI Works': 'RolegacyAI 如何运作',
    'The full picture': '完整图景',
    'Register Interest': '登记兴趣',
    'Read the Insights →': '阅读洞察 →',
    'RolegacyAI Insights': 'RolegacyAI 洞察',
    'Practical writing on role memory, successor readiness, operational continuity, workflow intelligence, and preserving the knowledge that keeps work moving.': '关于岗位记忆、接任准备度、运营连续性、工作流智能，以及保留推动工作持续运转的知识的实用文章。',
    'Discovery cohort': '探索计划',
    'Contact': '联系',
    'Every role leaves one.': '每个岗位都应留下传承。',
    'Patent Pending': 'Patent Pending',
    'Role-scoped institutional memory platform — in discovery': '面向岗位的组织记忆平台 — 探索阶段',
    'Role-scoped institutional memory platform &mdash; in discovery': '面向岗位的组织记忆平台 — 探索阶段',
    'Role memory': '岗位记忆',
    'Successor readiness': '接任准备度',
    'Operational continuity': '运营连续性',
    'Institutional memory': '组织记忆',
    'Workflow intelligence': '工作流智能',
    'Capability transfer': '能力传承',
    'Role Skill Packs': '岗位技能包',
    'AI Uplift Capture': 'AI 提效沉淀',
    'Capture Engine': '捕获引擎',
    'Classification Engine': '分类引擎',
    'Sanitisation Engine': '脱敏引擎',
    'Personal Role Layer': '个人与岗位边界层',
    'RAG Engine': 'RAG 检索增强引擎',
    'Confidence Scoring': '置信度评分',
    'Coverage Scoring': '覆盖度评分',
    'Successor Brief Generator': '接任简报生成器',
    'Role Risk Score': '岗位风险评分',
    'AI Uplift Measurement': 'AI 增效衡量',
    'Multi-Tenant Security': '多租户安全',
    'Human Validation Loop': '人工验证闭环',
    'Knowledge Graph': '知识图谱',
    'Agentic Workflows': '智能体工作流',
    'Deduplication Engine': '去重引擎',
    'API Integrations': 'API 集成',
    'Vector Embeddings': '向量嵌入',
    'Memory Timeline': '记忆时间线',
    'Successor Readiness Score': '接任准备度评分',
    'Prompt Engineering': '提示词工程'
  };

  function normaliseText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function translateTextNode(node, lang) {
    const original = node.__rolegacyOriginalText ?? node.textContent;
    node.__rolegacyOriginalText = original;
    if (lang === 'en') {
      node.textContent = original;
      return;
    }

    const exact = translations[original];
    const normalised = translations[normaliseText(original)];
    const translated = exact || normalised;
    if (translated) {
      node.textContent = translated;
    }
  }

  function translateElement(element, lang) {
    if (!element || element.closest('.language-switcher')) return;

    Array.from(element.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE && normaliseText(child.textContent)) {
        translateTextNode(child, lang);
      }
    });
  }

  function applyLanguage(lang) {
    const nextLang = supported.includes(lang) ? lang : defaultLang;
    document.documentElement.lang = nextLang;
    document.documentElement.dataset.language = nextLang;
    localStorage.setItem(STORAGE_KEY, nextLang);

    document.querySelectorAll('h1, h2, h3, p, a, button, span, li, text, .btn, .nav__cta, .footer__tagline, .footer__legal').forEach(el => {
      translateElement(el, nextLang);
    });

    document.querySelectorAll('[data-lang-option]').forEach(button => {
      const active = button.getAttribute('data-lang-option') === nextLang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function ensureStyles() {
    if (document.getElementById('rolegacy-language-style')) return;
    const style = document.createElement('style');
    style.id = 'rolegacy-language-style';
    style.textContent = `
      .language-switcher {
        display: inline-flex;
        align-items: center;
        gap: 0.2rem;
        padding: 0.18rem;
        border: 1px solid var(--border, rgba(228, 229, 228, 0.12));
        border-radius: 999px;
        background: rgba(15,15,16,0.88);
        box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      .language-switcher--nav {
        flex-shrink: 0;
        margin-left: auto;
        margin-right: 1rem;
        z-index: 120;
      }
      .language-switcher--floating {
        position: fixed;
        top: 0.85rem;
        right: 1rem;
        z-index: 1000;
      }
      .language-switcher__option {
        border: 0;
        border-radius: 999px;
        padding: 0.35rem 0.55rem;
        background: transparent;
        color: var(--text-sec, #a1a1aa);
        font-family: var(--font-head, system-ui, sans-serif);
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .language-switcher__option:hover,
      .language-switcher__option:focus-visible {
        color: var(--text-primary, #f4f4f5);
        outline: none;
      }
      .language-switcher__option.active {
        background: var(--amber, #d4a373);
        color: #0f0f10;
      }
      html[data-language="zh-CN"] body {
        font-family: var(--font-body, system-ui, sans-serif), 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif;
      }
      html[data-language="zh-CN"] .hero__headline,
      html[data-language="zh-CN"] .section-title,
      html[data-language="zh-CN"] .page-hero__title,
      html[data-language="zh-CN"] .nav__logo-text,
      html[data-language="zh-CN"] .btn,
      html[data-language="zh-CN"] h1,
      html[data-language="zh-CN"] h2,
      html[data-language="zh-CN"] h3 {
        letter-spacing: -0.015em;
      }
      @media (max-width: 768px) {
        .language-switcher--nav {
          margin-left: auto;
          margin-right: 0.75rem;
        }
        .language-switcher__option {
          padding: 0.34rem 0.5rem;
          font-size: 0.72rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createSwitcher(extraClass) {
    const wrap = document.createElement('div');
    wrap.className = `language-switcher ${extraClass || ''}`.trim();
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Language selector');
    wrap.innerHTML = `
      <button type="button" class="language-switcher__option" data-lang-option="en" aria-label="Switch to English">EN</button>
      <button type="button" class="language-switcher__option" data-lang-option="zh-CN" aria-label="切换到中文">中文</button>
    `;
    wrap.querySelectorAll('[data-lang-option]').forEach(button => {
      button.addEventListener('click', () => applyLanguage(button.getAttribute('data-lang-option')));
    });
    return wrap;
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureStyles();
    const navInner = document.querySelector('.nav__inner');
    const menuToggle = document.querySelector('.nav__menu-toggle');

    if (navInner && !navInner.querySelector('.language-switcher')) {
      const switcher = createSwitcher('language-switcher--nav');
      navInner.insertBefore(switcher, menuToggle || null);
    }

    if (!document.querySelector('.language-switcher')) {
      document.body.appendChild(createSwitcher('language-switcher--floating'));
    }

    applyLanguage(localStorage.getItem(STORAGE_KEY) || defaultLang);
  });
})();

// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ─── NAV: SCROLL SHADOW + MOBILE TOGGLE ──────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__menu-toggle');
  const links = document.querySelector('.nav__links');

  // Scroll shadow
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      links.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
})();

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
(function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const options = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ─── HERO EVOLUTION ANIMATION ─────────────────────────────────────────────────
(function initEvolutionAnimation() {
  const frames = document.querySelectorAll('.evo-frame');
  const dots = document.querySelectorAll('.evo-dot');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!frames.length) return;

  let currentStage = 0;
  let autoTimer = null;
  const DURATION = 2800; // ms per stage

  function showStage(index) {
    frames.forEach((frame, i) => {
      frame.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Re-trigger fragment animations when frame-1 becomes active
    if (index === 1) {
      const frame = frames[1];
      const frags = frame.querySelectorAll('.frag');
      frags.forEach(frag => {
        frag.style.animation = 'none';
        frag.offsetHeight; // force reflow
        frag.style.animation = '';
      });
    }

    currentStage = index;
  }

  function nextStage() {
    const next = (currentStage + 1) % frames.length;
    showStage(next);
  }

  function startAuto() {
    if (prefersReducedMotion) return;
    stopAuto();
    autoTimer = setInterval(nextStage, DURATION);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Dot click handlers
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      showStage(i);
      // Resume auto after 6 seconds of inactivity
      setTimeout(startAuto, 6000);
    });

    dot.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dot.click();
      }
    });

    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `View evolution stage ${i + 1}`);
  });

  // Show first frame immediately
  showStage(0);

  // Pause animation when out of viewport
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAuto();
        } else {
          stopAuto();
        }
      });
    }, { threshold: 0.2 });

    heroObserver.observe(heroSection);
  } else {
    startAuto();
  }
})();

// ─── SMOOTH ANCHOR SCROLL ─────────────────────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

// ─── CARD HOVER PARALLAX (subtle) ────────────────────────────────────────────
(function initCardParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll(
    '.problem-card, .how__step, .privacy-card, .audience-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
      card.style.transform = `translateY(-2px) perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, border-color 0.3s';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
})();

// ─── PATENT PENDING MODAL ────────────────────────────────────────────────────
// NOTE: #patent-modal sits after <script src="script.js"> in the HTML, so the
// element is not yet parsed when this script runs synchronously.  Wrapping in
// DOMContentLoaded ensures all elements exist before we query them.
document.addEventListener('DOMContentLoaded', function initPatentModal() {
  const modal = document.getElementById('patent-modal');
  if (!modal) return;

  const openers = document.querySelectorAll('#patent-btn, #patent-badge-btn');
  const closeBtn = document.getElementById('patent-modal-close');
  const backdrop = document.getElementById('patent-modal-backdrop');

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openers.forEach(function(btn) {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
});

// ─── ACTIVE NAV LINK ─────────────────────────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          const isActive = href === entry.target.id;
          link.style.color = isActive ? 'var(--text-primary)' : '';
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
})();
