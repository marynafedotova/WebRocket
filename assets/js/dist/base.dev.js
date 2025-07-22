"use strict";

var urlMonoBank = 'https://api.monobank.ua/bank/currency';
var usdToUahRate = 37; // Базовый курс (на случай ошибки загрузки)

var cacheDuration = 5 * 60 * 1000; // 5 минут для кеширования
// Функция для получения курса валют

function fetchCurrencyRate() {
  var cachedRate = localStorage.getItem('usdToUahRate');
  var cachedTime = localStorage.getItem('usdToUahRateTime');
  var now = Date.now(); // Проверяем, есть ли кешированное значение и не истек ли срок его действия

  if (cachedRate && cachedTime && now - cachedTime < cacheDuration) {
    usdToUahRate = parseFloat(cachedRate);
    return Promise.resolve(); // Возвращаем кешированный курс
  }

  return fetch(urlMonoBank).then(function (response) {
    if (!response.ok) throw new Error('Ошибка загрузки курса валют');
    return response.json();
  }).then(function (data) {
    var usdToUah = data.find(function (item) {
      return item.currencyCodeA === 840;
    });

    if (usdToUah && usdToUah.rateSell) {
      usdToUahRate = usdToUah.rateSell;
      localStorage.setItem('usdToUahRate', usdToUahRate);
      localStorage.setItem('usdToUahRateTime', now);
    }
  })["catch"](function (error) {
    console.error('Ошибка получения курса валют:', error);
  });
} // Функция для обновления цен на странице


function updateProductPrices() {
  fetchCurrencyRate().then(function () {
    // Обновляем все цены в карточках товаров
    document.querySelectorAll('.product-price').forEach(function (priceElement) {
      var priceUsdStr = priceElement.getAttribute('data-price-usd') || priceElement.textContent.replace('USD', '').trim();
      priceUsdStr = priceUsdStr.replace(',', '.'); // Исправляем запятую

      var priceUsd = parseFloat(priceUsdStr);

      if (!isNaN(priceUsd) && typeof usdToUahRate !== 'undefined') {
        var priceUah = Math.ceil(priceUsd * usdToUahRate); // Округляем в большую сторону

        var priceUahElement = priceElement.querySelector('.price-uah');

        if (priceUahElement) {
          priceUahElement.textContent = "".concat(priceUah, " \u0433\u0440\u043D");
        }
      }
    }); // Обновляем цену в карточке товара на детальной странице

    document.querySelectorAll('.product-title-item.price').forEach(function (priceContainer) {
      var priceElement = priceContainer.querySelector('.product-price');
      var priceUahElement = priceContainer.querySelector('.product-price-uah');

      if (priceElement && priceUahElement) {
        var priceUsdStr = priceElement.textContent.replace('USD', '').trim();
        priceUsdStr = priceUsdStr.replace(',', '.'); // Исправляем формат

        var priceUsd = parseFloat(priceUsdStr);

        if (!isNaN(priceUsd) && typeof usdToUahRate !== 'undefined') {
          var priceUah = (priceUsd * usdToUahRate).toFixed(2); // Округляем до двух знаков

          priceUahElement.textContent = "".concat(priceUah, " \u0433\u0440\u043D");
        }
      }
    });
  });
} // Функция для округления цены в долларах


document.addEventListener("DOMContentLoaded", function () {
  var priceElement = document.querySelector(".product-price");
  if (!priceElement) return;
  var priceUSD = priceElement.dataset.priceUsd.replace(",", ".");
  var roundedPriceUSD = Math.round(parseFloat(priceUSD));
  var priceUsdElement = priceElement.querySelector(".price-usd");

  if (priceUsdElement) {
    priceUsdElement.textContent = roundedPriceUSD;
  }
}); // Запускаем обновление цен после загрузки страницы

document.addEventListener('DOMContentLoaded', updateProductPrices); //скрол хедера

var header = document.querySelector('header');
window.addEventListener('scroll', function () {
  var scrollDistance = window.scrollY;
  var threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
}); //copiraite

document.addEventListener("DOMContentLoaded", function () {
  var yearElement = document.getElementById("year");

  if (yearElement) {
    var currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  } else {
    console.error("Элемент с ID 'year' не найден!");
  }
}); // wow

new WOW().init(); //scroll
// Получаем кнопку

var scrollToTopBtn = document.getElementById("scrollToTopBtn"); // Показываем кнопку при прокрутке страницы

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}; // Функция для прокрутки страницы наверх


scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}; //табы в продакт


document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".info-tab");
  var contents = document.querySelectorAll(".info-content");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Удаляем активные классы со всех табов и контента
      tabs.forEach(function (item) {
        return item.classList.remove("active");
      });
      contents.forEach(function (content) {
        return content.classList.remove("active");
      }); // Добавляем активный класс текущему табу и связанному контенту

      tab.classList.add("active");
      document.querySelector(".".concat(tab.id, "-info")).classList.add("active");
    });
  });
}); //додаваннят товару в кошик

document.addEventListener("DOMContentLoaded", function () {
  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var productCard = this.closest(".product-card");
      var productImage = productCard ? productCard.querySelector(".product-image") : null;
      var photoSrc = button.getAttribute("data-photo") || (productImage ? productImage.getAttribute("src") : "/static/assets/img/image_not_foud.jpg");
      var item = {
        id: button.getAttribute("data-id"),
        price: button.getAttribute("data-price"),
        name: button.getAttribute("data-name"),
        photo: photoSrc,
        quantity: 1
      };
      console.log("Додаємо товар у кошик:", item); // Проверяем в консоли

      addToCart(item);
    });
  });

  function addToCart(item) {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || []; // Проверяем, есть ли товар уже в корзине

    var existingItem = cart.find(function (cartItem) {
      return cartItem.id === item.id;
    });

    if (existingItem) {
      toast.error("Цей товар вже є в кошику!");
      return; // Не добавляем повторно
    } // Добавляем товар, если его нет в корзине
    //cart.push({ ...item, quantity: 1 });


    cart.push(Object.assign({}, item, {
      quantity: 1
    }));
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log("Корзина оновлена:", cart);
    showCartModal(); // Показываем всплывающее окно
  }
}); // Функция для отображения модального окна

function showCartModal() {
  var modal = document.getElementById("cartModal");
  var overlay = document.querySelector(".overlay");

  if (modal && overlay) {
    console.log("Показываем модальное окно"); // Для проверки

    modal.classList.remove("hidden");
    overlay.style.display = "block";
  } else {
    console.error('Модальное окно или затемняющий фон не найдены!');
  }
} // Функция для закрытия модального окна


function closeCartModal() {
  var modal = document.getElementById("cartModal");
  var overlay = document.querySelector(".overlay");

  if (modal && overlay) {
    modal.classList.add("hidden");
    overlay.style.display = "none";
    document.body.style.overflow = ""; // Разрешаем прокрутку страницы, если была заблокирована
  } else {
    console.error('Модальное окно или затемняющий фон не найдены!');
  }
}

document.getElementById('continueShopping').addEventListener('click', function (event) {
  event.preventDefault(); // Отменяет переход по ссылке

  closeCartModal();
}); // form  footer
// form footer

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var form = document.getElementById('feedback_form');
    var nameFld = document.getElementById('exampleInputNameFormFooter');
    var telFld = document.getElementById('exampleInputTelFormFooter');

    if (!form || !nameFld || !telFld) {
      console.error('Ошибка: форма или поля не найдены!');
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameFld.value.trim();
      var tel = telFld.value.trim();
      var errors = []; // Очистка ошибок

      nameFld.classList.remove('is-invalid');
      telFld.classList.remove('is-invalid');

      if (name === '') {
        errors.push("Введіть, будь ласка, Ваше ім'я");
        nameFld.classList.add('is-invalid');
      } else if (name.length < 2) {
        errors.push("Ваше ім'я занадто коротке");
        nameFld.classList.add('is-invalid');
      }

      if (tel === '' || tel.length < 17) {
        errors.push('Введіть, будь ласка, правильний номер телефону');
        telFld.classList.add('is-invalid');
      }

      if (errors.length > 0) {
        toast.error(errors.join('. '));
        return;
      } // Отправка данных в Telegram


      var CHAT_ID = '-1002278785620';
      var BOT_TOKEN = '8046931960:AAHhJdRaBEv_3zyB9evNFxZQlEdiz8FyWL8';
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
    }); // Маска для телефона

    telFld.addEventListener('input', function (e) {
      var input = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

      var prefix = '38'; // Код Украины

      var maxLength = 12; // Максимальная длина номера

      if (!input.startsWith(prefix)) {
        input = prefix + input;
      }

      if (input.length > maxLength) {
        input = input.substring(0, maxLength);
      }

      var formattedInput = '+38';
      if (input.length > 2) formattedInput += ' (' + input.substring(2, 5);
      if (input.length > 5) formattedInput += ') ' + input.substring(5, 8);
      if (input.length > 8) formattedInput += '-' + input.substring(8, 10);
      if (input.length > 10) formattedInput += '-' + input.substring(10, 12);
      e.target.value = formattedInput;
    }); // Фильтр для имени (только буквы)

    nameFld.addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
    }); // Установка текущего года

    var yearElement = document.getElementById('year');

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, 500); // Добавляем небольшую задержку, чтобы убедиться, что DOM загружен
});