"use strict";
const features = document.querySelector("#features");
const btnExplore = document.querySelector(".btn--explore");
const allSections = document.querySelectorAll(".section");
const header = document.querySelector(".main-header");
const mainNav = document.querySelector(".main-nav");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnRegister = document.querySelectorAll(".btn--register");
const btnClose = document.querySelector(".modal__close");
const navMenu = document.querySelector(".main-nav__menu");

// btn explore scroll to features
btnExplore.addEventListener("click", (e) => {
  features.scrollIntoView({ behavior: "smooth" });
});

//nav bar smooth scroll
navMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("main-nav__menu-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  } else {
    return;
  }
});

// navbar fade in animation
function fadeInNav(e) {
  if (e.target.classList.contains("main-nav__menu-link")) {
    const link = e.target;
    const siblings = link
      .closest(".main-nav")
      .querySelectorAll(".main-nav__menu-link");
    const logo = link.closest(".main-nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

mainNav.addEventListener("mouseover", fadeInNav.bind(0.5));
mainNav.addEventListener("mouseout", fadeInNav.bind(1));

// nav bar sticky on scroll
const navHeight = mainNav.getBoundingClientRect().height;
const navObserver = new IntersectionObserver(
  function ([entry]) {
    if (!entry.isIntersecting) mainNav.classList.add("sticky");
    else mainNav.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
navObserver.observe(header);

// register btn modal
const modalClose = function () {
  modal.classList.add("modal--hidden");
  overlay.classList.add("overlay--hidden");
};
const modalOpen = function () {
  modal.classList.remove("modal--hidden");
  overlay.classList.remove("overlay--hidden");
};

btnRegister.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modalOpen();
  });
});
btnClose.addEventListener("click", function () {
  modalClose();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("modal--hidden")) {
    modalClose();
  }
});
overlay.addEventListener("click", function () {
  modalClose();
});

// revealing sections on scroll
const revealSection = new IntersectionObserver(
  function (entries, observe) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("section--hidden");
      observe.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.15,
  }
);
allSections.forEach(function (section) {
  revealSection.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("image--lazy");
        observer.unobserve(entry.target);
      });
    });
  },
  {
    root: null,
    threshold: 0.15,
  }
);

imgTargets.forEach((img) => {
  lazyObserver.observe(img);
  img.classList.add("image--lazy");
});

// tab component functionality
const tabs = document.querySelector(".services__tabs");
tabs.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target.closest(".services__tab");
  if (!clicked) return;
  document.querySelectorAll(".services__tab").forEach((tab) => {
    tab.classList.remove("services__tab--active");
  });
  document.querySelectorAll(".services__content").forEach((content) => {
    content.classList.remove("services__content--active");
  });
  clicked.classList.add("services__tab--active");
  document
    .querySelector(`.services__content-${clicked.dataset.tab}`)
    .classList.add("services__content--active");
});

// slider functionality

const slides = document.querySelectorAll(".review-slider__slide");
const prevBtn = document.querySelector(".review-slider__btn--prev");
const nextBtn = document.querySelector(".review-slider__btn--next");
const dotsContainer = document.querySelector(".review-slider__dots");
let currentSlide = 0;

// Create dots based on the number of slides
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("review-slider__dot");
  if (index === 0) dot.classList.add("review-slider__dot--active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".review-slider__dot");

// Function to go to a specific slide with smooth transition
const goToSlide = (slideIndex) => {
  // Remove the active class from all slides
  slides.forEach((s, index) => {
    s.classList.remove("active");
  });

  // Add active class to the current slide
  slides[slideIndex].classList.add("active");

  // Update dots to reflect the active slide
  updateDots(slideIndex);
};

// Function to update the active dot
const updateDots = (activeIndex) => {
  dots.forEach((dot, index) => {
    dot.classList.toggle("review-slider__dot--active", index === activeIndex);
  });
};

// Go to the next slide
const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
};

// Go to the previous slide
const prevSlide = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
};

// Add event listeners for navigation buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Add event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    goToSlide(currentSlide);
  });
});

// Initialize the slider
goToSlide(0);
