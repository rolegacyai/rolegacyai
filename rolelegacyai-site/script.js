'use strict';

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
