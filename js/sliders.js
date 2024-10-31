const heroSection = document.querySelector('.hero'),
  images = [
    'img/project-6-1.webp',
    'img/project-5-1.webp',
    'img/project-3-3.webp',
    'img/project-4-1.webp',
  ];
let currentImageIndex = 0;
function changeBackgroundImage() {
  heroSection.classList.add('zoom-out'),
    setTimeout(() => {
      (currentImageIndex = (currentImageIndex + 1) % images.length),
        (heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`),
        heroSection.classList.remove('zoom-out');
    }, 800);
}
setInterval(changeBackgroundImage, 5e3);
function initializeSlider(sliderId, intervalTime = 3000) {
  const slider = document.getElementById(sliderId);
  const slides = slider.querySelectorAll(".slide");
  const prevButton = slider.querySelector(".prev-slide");
  const nextButton = slider.querySelector(".next-slide");
  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  setInterval(nextSlide, intervalTime);
}

// Инициализация нескольких слайдеров
initializeSlider("slider-1");
initializeSlider("slider-2");
initializeSlider("slider-3");
initializeSlider("slider-4");