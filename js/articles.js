//аккордеон
document.querySelectorAll('.faq__item').forEach(item => {
  item.addEventListener('click', function() {
    const text = item.querySelector('.faq__text');
    const btn = item.querySelector('.faq__btn');
    // Переключаем текущее состояние
    text.classList.toggle('faq__text--active');
    btn.classList.toggle('faq__btn--active');
  });
});
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