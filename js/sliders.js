const heroSection = document.querySelector('.hero');
const images = [
  'img/project-6-1.png',
  'img/project-5-1.png',
  'img/project-3-3.png',
  'img/project-4-1.png',
];

let currentImageIndex = 0;

function changeBackgroundImage() {
  // Добавляем класс для анимации обратного зума
  heroSection.classList.add('zoom-out');

  // Через 800 мс меняем изображение и убираем класс
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;
    heroSection.classList.remove('zoom-out');
  }, 800); // Длительность анимации
}

// Меняем изображение каждые 3 секунды
setInterval(changeBackgroundImage, 5000);

// Массивы изображений для каждого слайдера
const slidersData = {
  'slider-1': [
    'img/project-1-1.png',
    'img/project-1-2.png',
    'img/project-1-3.png',
  ],
  'slider-2': [
    'img/project-2-1.png',
    'img/project-2-2.png',
  ],
  'slider-3': [
    'img/project-3-1.png',
    'img/project-3-2.png',
    'img/project-3-3.png',
  ],
  'slider-4': [
    'img/project-4-1.png',
    'img/project-4-2.png',
  ]
};

// Функция для инициализации слайдера
function initializeSlider(sliderId, images) {
  const slider = document.querySelector(`#${sliderId}`);
  const prevButton = slider.querySelector('.prev-slide');
  const nextButton = slider.querySelector('.next-slide');
  let currentImageIndex = 0;

  function changeBackgroundImage() {
    slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
  }

  function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeBackgroundImage();
    resetSlideInterval();
  }

  function prevSlide() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeBackgroundImage();
    resetSlideInterval();
  }

  let slideInterval = setInterval(nextSlide, 2500);

  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 2500);
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Устанавливаем первое изображение
  changeBackgroundImage();
}

// Инициализация всех слайдеров
Object.keys(slidersData).forEach(sliderId => {
  initializeSlider(sliderId, slidersData[sliderId]);
});
