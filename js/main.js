// Форма попап
const overlay = document.querySelector('.overlay-site');
const form = document.querySelector('.form-container');
const btn = document.querySelectorAll('.btn-form');

btn.forEach((item) => {
  item.addEventListener('click', () => {
    overlay.classList.add('active');
    form.classList.add('active');
  });
});
overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  form.classList.remove('active');
});
// ^Форма попап

// Квиз
document.querySelectorAll('.next-step').forEach((button) => {
  button.addEventListener('click', () => {
    const currentStep = button.closest('.quiz-step');
    const nextStepId = button.getAttribute('data-next-step');
    const nextStep = document.getElementById(`step-${nextStepId}`);

    currentStep.classList.remove('active');
    nextStep.classList.add('active');
  });
});
document.querySelectorAll('.prev-step').forEach((button) => {
  button.addEventListener('click', () => {
    const currentStep = button.closest('.quiz-step');
    const prevStepId = button.getAttribute('data-prev-step');
    const prevStep = document.getElementById(`step-${prevStepId}`);

    currentStep.classList.remove('active');
    prevStep.classList.add('active');
  });
});
// ^Квиз

// Скролл наверх
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show-scroll-btn');
  } else {
    scrollToTopBtn.classList.remove('show-scroll-btn');
  }
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// ^Скролл наверх

// Отправка и валидация формы
document
  .getElementById('consultation-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы
    const formData = new FormData(this); // Собираем данные формы
    // Собираем все отмеченные значения чекбоксов для contact_method
    const contactMethods = [];
    document
      .querySelectorAll('input[name="contact_method"]:checked')
      .forEach((checkbox) => {
        contactMethods.push(checkbox.value);
      });
    // Проверяем, есть ли выбранные способы связи
    if (contactMethods.length === 0) {
      alert('Выберите хотя бы один способ связи.');
      return;
    }
    // Удаляем предыдущие значения 'contact_method', чтобы избежать дублирования
    formData.delete('contact_method');
    // Добавляем выбранные способы связи как одно поле (например, через запятую)
    formData.append('contact_method', contactMethods.join(', '));
    const jsonData = JSON.stringify(Object.fromEntries(formData)); // Преобразуем данные в JSON
    // Отправляем AJAX-запрос через fetch
    fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Показываем сообщение об успехе или ошибке
        const serverMessage = document.getElementById('serverMessage');
        if (data.success) {
          serverMessage.textContent = 'Заявка успешно отправлена!';
          serverMessage.style.color = 'green'; // Цвет для успешного сообщения
        } else {
          serverMessage.textContent = 'Ошибка при отправке заявки.';
          serverMessage.style.color = 'red'; // Цвет для ошибки
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        document.getElementById('serverMessage').textContent =
          'Произошла ошибка при отправке заявки.';
      });
  });
// ^Отправка и валидация формы
// Скролл в портфолио
document.addEventListener('scroll', function() {
  const portfolioSection = document.getElementById('portfolio');
  const rect = portfolioSection.getBoundingClientRect();
  const body = document.body;

  // Проверяем, находится ли секция видимой на экране
  if (rect.top <= window.innerHeight && rect.bottom > window.innerHeight) {
    body.classList.add('scrolled');
  } else {
    body.classList.remove('scrolled');
  }
});
// ^Скролл в портфолио

//аккордеон
document.querySelectorAll('.faq__item').forEach(item => {
  item.addEventListener('click', function() {
    const text = item.querySelector('.faq__text');
    const btn = item.querySelector('.faq__btn');

    // Закрываем все остальные активные элементы
    document.querySelectorAll('.faq__text').forEach(otherText => {
      if (otherText !== text) {
        otherText.classList.remove('faq__text--active');
        otherText.previousElementSibling.querySelector('.faq__btn').classList.remove('faq__btn--active');
      }
    });

    // Переключаем текущее состояние
    text.classList.toggle('faq__text--active');
    btn.classList.toggle('faq__btn--active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Выбираем все элементы с классами .item__title и .item__content
  const elements = document.querySelectorAll('.item__title, .item__content, .hero__title, .hero__subtitle, .hero__btn, .portfolio-section__title, .faq__title, .priorities__item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.5 });

  // Запускаем наблюдение для каждого элемента
  elements.forEach((element) => {
    observer.observe(element);
  });
});

document.querySelector('.burger').addEventListener('click', function () {
  this.classList.toggle('burger--active');
  document.querySelector('.nav').classList.toggle('menu--active');
});