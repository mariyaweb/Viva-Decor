const carousel = document.querySelector('.cards__wrapper');
const arrowsBtns = document.querySelectorAll('.btn-control');
let firstCardWidth = document.querySelector('.feedback__card').offsetWidth + 20;

window.addEventListener('resize', function () {
  firstCardWidth = document.querySelector('.feedback__card').offsetWidth;
  console.log(firstCardWidth);
});

let isDragging = false,
  startX,
  startScrollLeft;

arrowsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
  });

})

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
