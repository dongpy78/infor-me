'use strict';

const navbar = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');
const date = document.querySelector('#date');
// add fixed class to navbar
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});
// show sidebar
navBtn.addEventListener('click', function () {
  sidebar.classList.add('show-sidebar');
});
closeBtn.addEventListener('click', function () {
  sidebar.classList.remove('show-sidebar');
});
// set year
date.innerHTML = new Date().getFullYear();

//////////////////////
// Scroll ///////////
/////////////////////
/* Trước tiên, bạn đã tạo hai biến:
btnScrollTo: Biến này đại diện cho nút có lớp "btn--scroll-to". Đây là nút nhấp vào để cuộn đến "section--about".
btnScrollAbout: Biến này đại diện cho phần tử có ID "section--about". Đây là phần mục tiêu mà ta muốn cuộn đến khi nhấp vào nút.
Dòng code đầu tiên bị comment lại (// btnScrollTo.addEventListener('click', function() {...}) đang sử dụng scrollIntoView() để 
cuộn trang web đến "section--about" một cách trơn tru (smooth) khi bạn nhấp vào nút. Tuy nhiên, có một vấn đề là phần tử "section--about"
bị che khuất bởi thanh navigation cố định, nên không hiển thị đúng vị trí. */
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnScrollAbout = document.querySelector('#section--about');

// btnScrollTo.addEventListener('click', function() {
//   btnScrollAbout.scrollIntoView({behavior: 'smooth'});
// });

/*Trong đoạn mã này, ta sử dụng getBoundingClientRect() để tính toán vị trí của phần tử "section--about". Sau đó, bạn trừ đi chiều cao của thanh
navigation cố định (nếu có) từ vị trí này để đảm bảo cuộn đến phần tử mà không bị che khuất.
Khi bạn nhấp vào nút .btn--scroll-to, đoạn mã này sẽ chạy. Nó tính toán khoảng cách từ phần tử nút tới phần tử "section--about"
và sau đó cuộn trang web đến vị trí đó.

window.scrollTo({ top: offsetPosition, behavior: 'smooth' });: Đoạn mã này sử dụng window.scrollTo() để cuộn đến vị trí mới được
tính toán (được lưu trong biến offsetPosition). behavior: 'smooth' cho phép cuộn trơn tru.*/
btnScrollTo.addEventListener('click', function (e) {
  const navHeight = 80; // Chiều cao của thanh navigation cố định (nếu có)
  const sectionPosition = btnScrollAbout.getBoundingClientRect().top;
  const offsetPosition = sectionPosition - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
});

//////////////////////
// Menu fade animation
//////////////////////
/* Đầu tiên, chúng ta lấy tham chiếu đến phần tử có lớp "nav-center", tức là menu, bằng cách sử dụng document.querySelector('.nav-center') và gán cho biến nav.
Tiếp theo, chúng ta tạo một hàm có tên hanleHover, được sử dụng để xử lý các sự kiện khi di chuột qua (mouseover) hoặc ra (mouseout) khỏi các liên kết trong menu.
Hàm hanleHover được gọi mỗi khi có sự kiện di chuột qua hoặc ra khỏi một phần tử trong menu. Hàm này nhận một tham số e, đại diện cho sự kiện di chuột.
Đầu tiên, chúng ta kiểm tra xem phần tử được di chuột qua có lớp "nav__link" hay không. Nếu có, tức là đó là một liên kết trong menu.
Nếu phần tử đó là một liên kết trong menu, chúng ta lấy tham chiếu của liên kết đó bằng cách gán e.target (tham số sự kiện) cho biến link.
Tiếp theo, chúng ta lấy tất cả các liên kết trong menu (ngoại trừ liên kết đang được di chuột qua) bằng cách sử dụng link.closest('.nav-center').querySelectorAll('.nav__link') và gán cho biến siblings.
Chúng ta cũng lấy tham chiếu đến phần tử hình ảnh trong menu (được giả định là logo) bằng cách sử dụng link.closest('.nav-center').querySelector('img') và gán cho biến logo.
Tiếp theo, chúng ta sử dụng vòng lặp forEach để lặp qua tất cả các liên kết trong menu (biến siblings) và áp dụng hiệu ứng mờ cho những liên kết này.
Trong vòng lặp, chúng ta kiểm tra xem mỗi liên kết có giống với liên kết đang được di chuột qua (el !== link) hay không. Nếu không giống, tức là liên kết này không được di chuột qua, chúng ta thiết lập độ mờ của nó bằng giá trị this. Trong trường hợp này, this được truyền vào từ hanleHover.bind(0.5) hoặc hanleHover.bind(1) khi gắn sự kiện.
Sau khi đã xử lý các liên kết, chúng ta cũng áp dụng hiệu ứng mờ cho hình ảnh (logo) bằng cách thiết lập độ mờ của nó bằng giá trị this.
Cuối cùng, chúng ta gắn sự kiện "mouseover" và "mouseout" vào phần tử nav, và sử dụng .bind(0.5) và .bind(1) để gắn hàm hanleHover vào các sự kiện. Khi di chuột qua, sự kiện "mouseover" sẽ thiết lập độ mờ là 0.5, và khi di chuột ra khỏi liên kết, sự kiện "mouseout" sẽ thiết lập độ mờ là 1. */

const nav = document.querySelector('.nav-center');

const hanleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav-center').querySelectorAll('.nav__link');
    const logo = link.closest('.nav-center').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', hanleHover.bind(0.5));
nav.addEventListener('mouseout', hanleHover.bind(1));

//////////////////
// Reveal sections
//////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////
// Slider ////////////
/////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-400px)';
  // slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    gotoSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    gotoSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// top link
const navbarTop = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// ********** fixed navbar ************
window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  // const navHeight = navbarTop.getBoundingClientRect().height;
  if (scrollHeight > 500) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

const topLinkScroll = document.querySelector('.top-link--scroll');
const topLinkHero = document.querySelector('#section-hero');
topLinkScroll.addEventListener('click', function (e) {
  e.preventDefault();
  topLinkHero.scrollIntoView({
    behavior: 'smooth',
  }); 
});
