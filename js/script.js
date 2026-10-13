// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reading progress =====
const scrollProgress = document.getElementById('scrollProgress');
let progressTicking = false;
window.addEventListener('scroll', () => {
  if (progressTicking) return;
  progressTicking = true;
  requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
    progressTicking = false;
  });
}, { passive: true });

// ===== Desktop cursor glow =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.setAttribute('aria-hidden', 'true');
  document.body.append(cursorGlow);

  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursorGlow.style.setProperty('--cursor-y', `${event.clientY}px`);
    cursorGlow.classList.add('is-visible');
    cursorGlow.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, input, textarea')));
  });

  window.addEventListener('pointerleave', () => cursorGlow.classList.remove('is-visible'));
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navTabs = document.getElementById('navTabs');
const navIndicator = document.createElement('span');
navIndicator.className = 'tabbar__indicator';
navIndicator.setAttribute('aria-hidden', 'true');
navTabs.append(navIndicator);

const moveNavIndicator = () => {
  const activeTab = navTabs.querySelector('.tab.is-active');
  if (!activeTab || window.matchMedia('(max-width: 720px)').matches) return;
  navIndicator.style.width = `${activeTab.offsetWidth}px`;
  navIndicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
};

requestAnimationFrame(moveNavIndicator);
window.addEventListener('resize', moveNavIndicator);

navToggle.addEventListener('click', () => {
  const isOpen = navTabs.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
  if (isOpen) requestAnimationFrame(moveNavIndicator);
});

// Close mobile menu after clicking a link
navTabs.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    navTabs.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active tab highlight on scroll =====
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab');

const setActiveTab = (id) => {
  tabs.forEach(tab => {
    tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
  });
  moveNavIndicator();
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTab(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Contact form (front-end only placeholder) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: connect this to a real backend (PHP mail script, Formspree, etc.)
  formNote.textContent = "Thanks! This form isn't wired up to a backend yet — connect it to PHP or a form service.";
  contactForm.reset();
});
