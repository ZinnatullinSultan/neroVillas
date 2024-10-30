const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON данных
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статические файлы
app.use(express.static(__dirname));

// Маршрут для обработки формы
app.post('/send', (req, res) => {
    const { name, phone, service, contact_method, email } = req.body;

    // Простая серверная валидация
    const namePattern = /^[a-zA-ZА-Яа-яЁё\s]+$/;
    const phonePattern = /^\+7\d{10}$/;

    // Проверка имени
    if (!namePattern.test(name)) {
        return res.status(400).json({ success: false, message: 'Некорректное имя' });
    }

    // Проверка телефона
    if (!phonePattern.test(phone)) {
        return res.status(400).json({ success: false, message: 'Некорректный номер телефона' });
    }

    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const cleanPhone = phone.replace(/[^\d+]/g, ''); // Оставляем только цифры и +

    const whatsappUrl = `https://wa.me/${cleanPhone}`;

    const msg = `Заявка от: ${name}\nТелефон: ${phone}\nПочта: ${email}\nТип услуги: ${service}\nТип связи: ${contact_method}\nНаписать в WhatsApp: [WhatsApp](${whatsappUrl})\n`;

    axios.post(TELEGRAM_URL, {
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: 'Markdown',
    })
        .then(response => {
            res.json({ success: true });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false });
        });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
