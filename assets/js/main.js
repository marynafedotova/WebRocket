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


document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor-light");
  cursor.style.left = `${e.pageX}px`; // Використовуємо pageX
  cursor.style.top = `${e.pageY}px`;  // Використовуємо pageY
});
//reviews
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.review-slide');
  const totalSlides = slides.length;

  if (totalSlides === 0) return; // Слайдів немає — нічого не робимо

  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % totalSlides;
    slides[currentIndex].style.display = 'block';
  }

  // Початкове відображення
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });

  setInterval(showNextSlide, 3000);
});

//faq
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.querySelector('.faq-title').addEventListener('click', () => {
      // Змінюємо клас активності для кожного елемента FAQ
      item.classList.toggle('active');
    });
  });

//hamburger-menu
document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})

document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})
//lazy

// var lazyLoadInstance = new LazyLoad({});

//wow
new WOW().init();




// модальне вікно
 document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const projectForm = document.getElementById('projectForm');
    
    // Открытие модального окна
    openModalBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    });
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    });
    
    // Закрытие при клике вне модального окна
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие по клавише Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Обработка отправки формы
// Відправка форми в Telegram з toast
projectForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const details = document.getElementById('projectDetails').value.trim();

  // Простий regex для перевірки email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length !== 12) {
      toast.error('Введіть коректний номер телефону.');
      return;
  }


  const BOT_TOKEN = '8381407677:AAGExZhSD11ScLEZHc9-GXMu0lqjUrhABxc';
  const CHAT_ID = '836622266';

  const message =
    `<b>Нове повідомлення з модальної форми</b>\n\n` +
    `<b>Ім'я:</b> ${name}\n` +
    `<b>Email:</b> ${email}\n` +
    `<b>Телефон:</b> ${phone}\n` +
    `<b>Деталі:</b> ${details}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        toast.success("Ваш проект успішно відправлено. Ми зв'яжемося з вами найближчим часом.");
        projectForm.reset();
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        toast.error('Сталася помилка при відправленні.');
      }
    })
    .catch(error => {
      toast.error('Помилка: ' + error.message);
    });
});
    
    // Маска для телефона (аналогично вашему коду)
    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            const prefix = '38';
            const maxLength = 12;
        
            if (!input.startsWith(prefix)) {
                input = prefix + input;
            }
        
            if (input.length > maxLength) {
                input = input.substring(0, maxLength);
            }

            let formattedInput = '+38';
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

            const cursorPosition = e.target.selectionStart; 
            const prevLength = e.target.value.length; 
            const newLength = formattedInput.length;
            const diff = newLength - prevLength;
        
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
});


// form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback_form');
  const nameFld = document.getElementById('exampleInputName');
  const telFld = document.getElementById('exampleInputTel');

  if (!form || !nameFld || !telFld) {
    console.error('Form or fields not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameFld.value ? nameFld.value.trim() : ''; 
    const tel = telFld.value ? telFld.value.trim() : '';

    const errors = [];

    // Очистка классов ошибок
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
    const BOT_TOKEN = '8381407677:AAGExZhSD11ScLEZHc9-GXMu0lqjUrhABxc';
    const CHAT_ID = '836622266';    

    const message = `<b>Ім'я: </b> ${name}\r\n<b>Телефон: </b>${tel}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

    fetch(url, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        nameFld.value = '';
        telFld.value = '';
        toast.success('Ваше повідомлення успішно надіслано.');
        form.reset();
      } else {
        toast.error('Сталася помилка.');
      }
    })
    .catch(error => {
      toast.error('Помилка: ' + error.message);
    });
  });

  if (telFld) {
    telFld.addEventListener('input', function (e) {
      let input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
      const prefix = '38'; // Префикс для Украины
      const maxLength = 12; // Максимальная длина номера
  
      if (!input.startsWith(prefix)) {
        input = prefix + input;
      }
  
      if (input.length > maxLength) {
        input = input.substring(0, maxLength);
      }

      let formattedInput = '+38';
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

      const cursorPosition = e.target.selectionStart; 
      const prevLength = e.target.value.length; 
      const newLength = formattedInput.length;
      const diff = newLength - prevLength;
  
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
    let input = e.target.value;
    e.target.value = input.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
  });

  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
});


  //scroll
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
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

