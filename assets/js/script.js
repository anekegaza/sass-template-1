////////////////////////////////////////////////
// Responsive header
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;
const nav = header.querySelector('.nav');
const navToggler = document.querySelector('.nav-toggler');
const heroSection = document.querySelector('.section-hero');

// Fixed header functionality
const fixedNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add('fixed');
  if (entry.isIntersecting) header.classList.remove('fixed');
};

const fixedNavOpt = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const heroObserver = new IntersectionObserver(fixedNav, fixedNavOpt);

heroObserver.observe(heroSection);

// Toggle haeder functionality
navToggler.addEventListener('click', function () {
  header.classList.toggle('open');
});

// Close header when clicked on nav-link (Visible only in mobile nav)
nav.addEventListener('click', function (e) {
  const el = e.target;

  if (!el.classList.contains('nav-link')) return;

  header.classList.remove('open');
});

////////////////////////////////////////////////
// Testimonial slider
const testimonailDps = document.querySelectorAll('.testimonial-dp');

const swiper = new Swiper('.testimonial-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  autoHeight: true,

  // Navigation arrows
  navigation: {
    nextEl: '.testimonial-button-next',
    prevEl: '.testimonial-button-prev',
  },
});

testimonailDps.forEach(dp => dp.classList.add('d-none'));
testimonailDps[swiper.realIndex].classList.remove('d-none');

swiper.on('activeIndexChange', function () {
  testimonailDps.forEach(dp => dp.classList.add('d-none'));
  testimonailDps[swiper.realIndex].classList.remove('d-none');
});

////////////////////////////////////////////////
// Theme toggler
const themeToggler = document.getElementById('theme-toggler');

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const setTheme = theme => {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

setTheme(getPreferredTheme());

themeToggler.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.bsTheme;
  const theme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
});
