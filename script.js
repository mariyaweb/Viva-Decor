/* Drag and drop */

const carousel = document.querySelector('.cards__wrapper');
const arrowsBtns = document.querySelectorAll('.btn-control');
let firstCardWidth = document.querySelector('.feedback__card').offsetWidth + 20;

window.addEventListener('resize', function () {
  firstCardWidth = document.querySelector('.feedback__card').offsetWidth + 20;
});

let isDragging = false,
  startX,
  startScrollLeft;

arrowsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add('dragging');
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
}

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);

/* Swipe */

document.querySelector('.cards__wrapper').addEventListener('touchstart', (event) => {
  const startX = event.touches[0].clientX;

  document.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;
      if (deltaX > 0) {
        carousel.scrollBy(-firstCardWidth, 0); 
      } else {
        carousel.scrollBy(firstCardWidth, 0);
      }
  });
});


/* Animation */

const benefits = document.querySelector('.benefits__items');
const benefitsValues = [400, 600, 100];
let isShowBenefits = false;

function playAnimation(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('element-show');
    }
  });
  if (!isShowBenefits && benefits.classList.contains('element-show')) {
    Array.from(document.querySelectorAll('.benefits__value')).forEach((el, index) => {
      playAnimationIncrement(el, benefitsValues[index]);
    });
    isShowBenefits = true;
  }
}

function playAnimationIncrement(el, maxValue) {
  let initNum = 0;
  const time = 4000;
  const interval = time / maxValue;
  let timer = setInterval(() => {
    initNum += 1;
    if (initNum === maxValue) {
      clearInterval(timer);
    }
    el.innerHTML = initNum + '+';
  }, interval)

}

let scrollObserver = new IntersectionObserver(playAnimation, {
  threshold: [0.2]
});

document.querySelectorAll('.element-animation').forEach(section => {
  scrollObserver.observe(section);
});

/* Btn listeners */
document.querySelector('.main__arrow-btn').addEventListener('click', () => {
  window.location.href = '#services';
});

const passwordShowBtns = document.querySelectorAll('.form__password');

passwordShowBtns.forEach((btn) => {
  const passwordNameField = btn.getAttribute('data-pas');
  const idFieldName = `password-${passwordNameField}`;
  const inputPasswordField = document.getElementById(idFieldName);
  const passwordIcon = btn.querySelector('.password-icon');

  btn.addEventListener('click', () => {
    if (inputPasswordField.type === 'password') {
      inputPasswordField.type = 'text';
      passwordIcon.classList.remove('bi-eye');
      passwordIcon.classList.add('bi-eye-slash');
    } else {
      inputPasswordField.type = 'password';
      passwordIcon.classList.remove('bi-eye-slash');
      passwordIcon.classList.add('bi-eye');
    }
  });
});
