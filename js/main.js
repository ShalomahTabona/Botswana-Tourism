// Mobile navigation and demo contact form behaviour
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  const form = document.querySelector('#contactForm');
  const notice = document.querySelector('#formNotice');
  if (form && notice) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      notice.textContent = 'Thank you. This demonstration form is not connected to a live email service yet.';
      form.reset();
    });
  }
});


// Three-slide homepage carousel
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dots = Array.from(slider.querySelectorAll(".slider-dot"));
  const currentLabel = slider.querySelector("#current-slide");
  const progress = slider.querySelector(".hero-progress span");
  const previous = slider.querySelector(".slider-prev");
  const next = slider.querySelector(".slider-next");
  let current = 0;
  let timer;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-pressed", i === current ? "true" : "false");
    });
    if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2, "0");
    if (progress) progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  }

  function restartTimer() {
    window.clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => showSlide(current + 1), 6000);
    }
  }

  previous?.addEventListener("click", () => { showSlide(current - 1); restartTimer(); });
  next?.addEventListener("click", () => { showSlide(current + 1); restartTimer(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); restartTimer(); }));

  slider.addEventListener("mouseenter", () => window.clearInterval(timer));
  slider.addEventListener("mouseleave", restartTimer);
  slider.addEventListener("focusin", () => window.clearInterval(timer));
  slider.addEventListener("focusout", restartTimer);

  showSlide(0);
  restartTimer();
});
