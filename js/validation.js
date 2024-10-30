document.addEventListener("DOMContentLoaded", function () {
  var phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function () {
    var input = phoneInput.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

    // Ограничиваем длину до 11 цифр (формат: +7XXXXXXXXXX)
    if (input.length > 11) {
      input = input.slice(0, 11);
    }

    // Добавляем префикс +7 автоматически
    if (input.startsWith('7')) {
      input = '+' + input;
    } else if (!input.startsWith('+7')) {
      input = '+7' + input;
    }

    phoneInput.value = input; // Устанавливаем форматированное значение
  });

  // Валидация при отправке формы
  document.getElementById("consultation-form").addEventListener("submit", function (event) {
    var isValid = true; // Флаг для проверки валидности

    var nameInput = document.getElementById("name");
    var nameError = document.getElementById("name-error");
    var phoneError = document.getElementById("phone-error");
    var phoneInputField = document.getElementById("phone").value.replace(/\D/g, ""); // Убираем все нецифровые символы для проверки

    // Очистка предыдущих ошибок
    nameInput.classList.remove("input-error");
    nameError.style.display = "none";
    nameError.textContent = "";
    phoneError.style.display = "none";
    phoneError.textContent = "";

    // Валидация имени (только буквы)
    var namePattern = /^[a-zA-ZА-Яа-яЁё\s]+$/;
    if (!namePattern.test(nameInput.value)) {
      nameInput.classList.add("input-error"); // Добавляем класс с красной рамкой
      nameError.textContent = "Укажите, пожалуйста, имя"; // Текст ошибки
      nameError.style.display = "block"; // Показываем сообщение об ошибке
      isValid = false; // Форма невалидна
    }

    // Валидация телефона (ровно 11 цифр после +7)
    if (phoneInputField.length !== 11) {
      phoneError.textContent = "Номер телефона должен содержать ровно 10 цифр после +7."; // Текст ошибки
      phoneError.style.display = "block"; // Показываем сообщение об ошибке
      isValid = false; // Форма невалидна
    }

    // Если есть хотя бы одна ошибка, форма не отправляется
    if (!isValid) {
      console.log("Валидация не пройдена, форма не отправляется"); // Выводим в консоль, что форма невалидна
      event.preventDefault(); // Предотвращаем отправку формы
    } else {
      console.log("Валидация пройдена, форма отправляется");
    }
  });
});
