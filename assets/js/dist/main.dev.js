"use strict";

//header
// const header = document.querySelector('header');
// window.addEventListener('scroll', function() {
//   const scrollDistance = window.scrollY;
//   const threshold = 30;
//   if (scrollDistance > threshold) {
//     header.classList.add('scrolled');
//   } else {
//     header.classList.remove('scrolled');
//   }
// });
document.addEventListener("mousemove", function (e) {
  var cursor = document.querySelector(".cursor-light");
  cursor.style.left = "".concat(e.pageX, "px"); // Використовуємо pageX

  cursor.style.top = "".concat(e.pageY, "px"); // Використовуємо pageY
}); //reviews

document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.review-slide');
  var totalSlides = slides.length;
  if (totalSlides === 0) return; // Слайдів немає — нічого не робимо

  var currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].style.display = 'block';
  } // Початкове відображення


  slides.forEach(function (slide, index) {
    slide.style.display = index === 0 ? 'block' : 'none';
  });
  setInterval(showNextSlide, 3000);
}); //faq

var faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function (item) {
  item.querySelector('.faq-title').addEventListener('click', function () {
    // Змінюємо клас активності для кожного елемента FAQ
    item.classList.toggle('active');
  });
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
}); //lazy
// var lazyLoadInstance = new LazyLoad({});
//wow

new WOW().init(); // модальне вікно

document.addEventListener('DOMContentLoaded', function () {
  var openModalBtn = document.getElementById('openModal');
  var closeModalBtn = document.getElementById('closeModal');
  var modalOverlay = document.getElementById('modalOverlay');
  var projectForm = document.getElementById('projectForm'); // Открытие модального окна

  openModalBtn.addEventListener('click', function () {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
  }); // Закрытие модального окна

  closeModalBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  }); // Закрытие при клике вне модального окна

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }); // Закрытие по клавише Esc

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }); // Обработка отправки формы
  // Відправка форми в Telegram з toast

  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('userName').value.trim();
    var email = document.getElementById('userEmail').value.trim();
    var phone = document.getElementById('userPhone').value.trim();
    var details = document.getElementById('projectDetails').value.trim(); // Простий regex для перевірки email

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error('Будь ласка, введіть коректний email.');
      return; // не відправляємо форму
    }

    if (!details) {
      toast.error('Опишіть ваш проект.');
      return;
    }

    if (!name) {
      toast.error('Введіть ім\'я.');
      return;
    }

    var phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length !== 12) {
      toast.error('Введіть коректний номер телефону.');
      return;
    }

    var BOT_TOKEN = '8381407677:AAGExZhSD11ScLEZHc9-GXMu0lqjUrhABxc';
    var CHAT_ID = '836622266';
    var message = "<b>\u041D\u043E\u0432\u0435 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u0437 \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0457 \u0444\u043E\u0440\u043C\u0438</b>\n\n" + "<b>\u0406\u043C'\u044F:</b> ".concat(name, "\n") + "<b>Email:</b> ".concat(email, "\n") + "<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</b> ".concat(phone, "\n") + "<b>\u0414\u0435\u0442\u0430\u043B\u0456:</b> ".concat(details);
    var url = "https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage");
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.ok) {
        toast.success("Ваш проект успішно відправлено. Ми зв'яжемося з вами найближчим часом.");
        projectForm.reset();
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        toast.error('Сталася помилка при відправленні.');
      }
    })["catch"](function (error) {
      toast.error('Помилка: ' + error.message);
    });
  }); // Маска для телефона (аналогично вашему коду)

  var phoneInput = document.getElementById('userPhone');

  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      var input = e.target.value.replace(/\D/g, '');
      var prefix = '38';
      var maxLength = 12;

      if (!input.startsWith(prefix)) {
        input = prefix + input;
      }

      if (input.length > maxLength) {
        input = input.substring(0, maxLength);
      }

      var formattedInput = '+38';

      if (input.length > 2) {
        formattedInput += ' (' + input.substring(2, 5);
      }

      if (input.length > 5) {
        formattedInput += ') ' + input.substring(5, 8);
      }

      if (input.length > 8) {
        formattedInput += '-' + input.substring(8, 10);
      }

      if (input.length > 10) {
        formattedInput += '-' + input.substring(10, 12);
      }

      var cursorPosition = e.target.selectionStart;
      var prevLength = e.target.value.length;
      var newLength = formattedInput.length;
      var diff = newLength - prevLength;
      e.target.value = formattedInput;

      if (diff > 0 && cursorPosition >= prevLength) {
        e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
      } else if (diff < 0 && cursorPosition > newLength) {
        e.target.setSelectionRange(newLength, newLength);
      } else {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }
}); // form

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('feedback_form');
  var nameFld = document.getElementById('exampleInputName');
  var telFld = document.getElementById('exampleInputTel');

  if (!form || !nameFld || !telFld) {
    console.error('Form or fields not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameFld.value ? nameFld.value.trim() : '';
    var tel = telFld.value ? telFld.value.trim() : '';
    var errors = []; // Очистка классов ошибок

    nameFld.classList.remove('is-invalid');
    telFld.classList.remove('is-invalid');

    if (name === '') {
      errors.push("Введіть, будь ласка, Ваше ім'я");
      nameFld.classList.add('is-invalid');
    } else if (name.length < 2) {
      errors.push('Ваше ім\'я занадто коротке');
      nameFld.classList.add('is-invalid');
    }

    if (tel === '' || tel.length < 17) {
      errors.push('Введіть, будь ласка, правильний номер телефону');
      telFld.classList.add('is-invalid');
    }

    if (errors.length > 0) {
      toast.error(errors.join('. '));
      return;
    }

    var BOT_TOKEN = '8381407677:AAGExZhSD11ScLEZHc9-GXMu0lqjUrhABxc';
    var CHAT_ID = '836622266';
    var message = "<b>\u0406\u043C'\u044F: </b> ".concat(name, "\r\n<b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D: </b>").concat(tel);
    var url = "https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=").concat(encodeURIComponent(message), "&parse_mode=HTML");
    fetch(url, {
      method: 'POST'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.ok) {
        nameFld.value = '';
        telFld.value = '';
        toast.success('Ваше повідомлення успішно надіслано.');
      } else {
        toast.error('Сталася помилка.');
      }
    })["catch"](function (error) {
      toast.error('Помилка: ' + error.message);
    });
  });

  if (telFld) {
    telFld.addEventListener('input', function (e) {
      var input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

      var prefix = '38'; // Префикс для Украины

      var maxLength = 12; // Максимальная длина номера

      if (!input.startsWith(prefix)) {
        input = prefix + input;
      }

      if (input.length > maxLength) {
        input = input.substring(0, maxLength);
      }

      var formattedInput = '+38';

      if (input.length > 2) {
        formattedInput += ' (' + input.substring(2, 5);
      }

      if (input.length > 5) {
        formattedInput += ') ' + input.substring(5, 8);
      }

      if (input.length > 8) {
        formattedInput += '-' + input.substring(8, 10);
      }

      if (input.length > 10) {
        formattedInput += '-' + input.substring(10, 12);
      }

      var cursorPosition = e.target.selectionStart;
      var prevLength = e.target.value.length;
      var newLength = formattedInput.length;
      var diff = newLength - prevLength;
      e.target.value = formattedInput;

      if (diff > 0 && cursorPosition >= prevLength) {
        e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
      } else if (diff < 0 && cursorPosition > newLength) {
        e.target.setSelectionRange(newLength, newLength);
      } else {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }

  nameFld.addEventListener('input', function (e) {
    var input = e.target.value;
    e.target.value = input.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
  });
  var currentYear = new Date().getFullYear();
  var yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = currentYear;
  }
}); //scroll

document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight / 2) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});