// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navTabs = document.getElementById('navTabs');

navToggle.addEventListener('click', () => {
  const isOpen = navTabs.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
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
