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
let currentIndex = 0;
const slides = document.querySelectorAll('.review-slide');
const totalSlides = slides.length;

function showNextSlide() {
  slides[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % totalSlides;
  slides[currentIndex].style.display = 'block';
}

// Початкове налаштування слайдера
slides.forEach((slide, index) => {
  slide.style.display = index === 0 ? 'block' : 'none';
});

setInterval(showNextSlide, 3000); // Переходити кожні 3 секунди

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

$(function() {
  $("#FeaturelightSlider").lightSlider({
    item: 1,
    slideMargin: 0,
    controls: false,
    loop: true,
    auto: true,
    slideMove: 1,
    // verticalHeight: 500,
    speed: 600,
    // vertical: true
    });
});

//wow
new WOW().init();

//slider

// document.addEventListener('DOMContentLoaded', function () {
//   fetch('assets/data.json')
//     .then(response => response.json())
//     .then(data => {
//       createSlider('slider2', data);
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });

// function createSlider(elementId, jsonData) {
//   const sliderContainer = $("#" + elementId);
//   const customPrevHtml = '<span class="custom-prev-html">Previous</span>';
//   const customNextHtml = '<span class="custom-next-html">Next</span>';
//   const ulElement = $("<ul></ul>");
//   jsonData.forEach(item => {
//     const slideElement = $(`
//       <li>
//         <div class="slide-top">
//           <img class="lazy" 
//           src="${item.image}" alt="${item.title}">
//         </div>
//         <div class="title">${item.title}</div>
//         <div class="news-text">${item.newsText}</div>
//         <div class="author">
//           <div class="avatar">
//             <img src="${item.author.avatar}" alt="${item.author.name}">
//           </div>
//           <div class="author-data">
//           <div class="name-author">${item.author.name}</div>
//           <div class="news-date">${item.author.date}</div>
//           </div>
//           </div>
//       </li>
//     `);
//     ulElement.append(slideElement);
//   });
//   sliderContainer.append(ulElement);
//   ulElement.lightSlider({
//     item: 3,
//     controls: false,
//     loop: true,
//     auto: true,
//     slideMove: 1,
//     slideMargin: 30,
//     pager:true,
//     vertical:false,
//     prevHtml: customPrevHtml,
//     nextHtml: customNextHtml,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           item: 2,
//           slideMove: 1,
//         }
//       },
//       {
//         breakpoint: 900, 
//         settings: {
//           item: 1,
//           slideMove: 1,
//         }
//       }
//     ]
//   });
// }

// lightGallery(document.getElementById('animated-thumbnails'), {
//     allowMediaOverlap: true,
//     toggleThumb: true
// });

//maps

function initMap(link){
  link.remove();
const map = L.map('map').setView([41.054501905311206, -79.15649953375353], 13);

L.tileLayer('	https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const violetIcon = L.icon({
  iconUrl: 'assets/images/Pin.png',
  iconSize:     [106, 106],
  iconAnchor:   [22, 94],
});

L.marker([41.054501905311206, -79.15649953375353], {icon: violetIcon}).addTo(map)}
//form
$(document).ready(function () {
  $('.form-control').focus(function () {
    if ($(this).hasClass('is-invalid')) {
      $(this).removeClass('is-invalid');
    }
  });

  $('#feedback_form').submit(function (e) {
    e.preventDefault();

    const errors = [];
    const nameFld = $('#exampleInputName');
    const emailFld = $('#exampleInputEmail1');

    const name = nameFld.val().trim();
    const email = emailFld.val().trim();

    if (name === '') {
      errors.push('Enter your name, please');
      nameFld.addClass('is-invalid');
    } else if (name.length < 2) {
      errors.push('Your name is too short');
      nameFld.addClass('is-invalid');
    }

    if (email === '') {
      errors.push('Enter your email, please');
      emailFld.addClass('is-invalid');
    } else if (!isValidEmail(email)) {
      errors.push('Incorrect email format, please');
      emailFld.addClass('is-invalid');
    }

    if (errors.length) {
      toast.error(errors.join('. '));
      return;
    }

    const CHAT_ID = '-1002005768837';
    const BOT_TOKEN = '6752195686:AAEk2PgvXP44n-Tv5IJcvCZCkkHOrzeH7pQ';
    const message = `<b>Name: </b> ${name}\r\n<b>Email: </b>${email}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

    console.log(url);

    $.post(url, function (resp) {
      if (resp.ok) {
        nameFld.val('');
        emailFld.val('');
        toast.success('Your message successfully sent.');
      } else {
        toast.error('Some error occurred.');
      }
    });
  });

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
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

