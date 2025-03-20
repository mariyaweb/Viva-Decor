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


/* Show/hide password */

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

/* Enter other value into  select menus*/

const selectForm = document.querySelector('.form-select');
const selectInput = document.querySelector('.input__select');
selectForm.addEventListener('change', function () {
  if (this.value === "Other") {
    selectInput.classList.add('show');
  } else {
    selectInput.classList.remove('show');
  }
});

/* Range change */

const rangeTextInput = document.querySelector('.range__value-number')
const rangeInput = document.querySelector('.form__range');
const minRangeValue = 5;
const maxRangeValue = 500;

rangeInput.addEventListener('input', (e) => setRangePosition(e.target.value));

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && event.target.type === "number") {
    e.preventDefault();
    let value = setCorrectValue(e.target.value);
    rangeInput.value = value;
    setRangePosition(value);
  }
});

rangeTextInput.addEventListener('change', (e) => {
  e.preventDefault();
  let value = setCorrectValue(e.target.value);
  rangeInput.value = value;
  setRangePosition(value);
})

function setRangePosition(value) {
  const currValue = value;
  const offset = 100 * (currValue - minRangeValue) / (maxRangeValue - minRangeValue);
  rangeTextInput.value = value;
  rangeTextInput.style.left = offset + '%';
}

function setCorrectValue(value) {
  if (value < minRangeValue) {
    value = minRangeValue;
  } else if (value > maxRangeValue) {
    value = maxRangeValue;
  }
  return value;
}

/* Phone mask */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof intlTelInput === "undefined") {
    console.error("intlTelInput не загружен. Проверьте подключение библиотеки!");
    return;
  }
  const phoneInput = document.querySelector('.application__phone');

  if (phoneInput) {
    const phoneMasks = intlTelInput(phoneInput, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
      initialCountry: 'auto',
      geoIpLookup: function (callback) {
        fetch('https://ipapi.co/json/')
          .then(response => response.json())
          .then(data => {
            const countryCode = data.country_code;
            callback(countryCode);
          })
          .catch(error => {
            callback("us");
            console.error(error);
          });
      },
      nationalMode: true,
      separateDialCode: true,
    });

    phoneInput.addEventListener('input', () => phoneValidation());

    function phoneValidation() {
      const isValid = phoneMasks.isValidNumber();
      if (isValid) {
        phoneInput.classList.add('valid');
        phoneInput.classList.remove('is-invalid');
      } else {
        phoneInput.classList.remove('valid');
        phoneInput.classList.add('is-invalid');
      }
      return isValid;
    }
  }
});

function phoneValidation() {
  const isValid = phoneMasks.isValidNumber();
  if (isValid) {
    phoneInput.classList.add('valid');
    phoneInput.classList.remove('is-invalid');
  } else {
    phoneInput.classList.remove('valid');
    phoneInput.classList.add('is-invalid');
  }
  return isValid;
}


const applicationForm = document.querySelector('.application__form');
applicationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (applicationForm.checkValidity()) {
    if (!phoneValidation()) {
      phoneInput.classList.add('has-error');
    } else {
      document.querySelector('.application__switch-modal').click();
    }
  }
})

