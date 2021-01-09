function initCarousel() {
  const CAROUSEL_ARROW_LEFT = document.querySelector('.carousel__arrow_left');
  const CAROUSEL_ARROW_RIGHT = document.querySelector('.carousel__arrow_right');
  const CAROUSEL_INNER = document.querySelector('.carousel__inner');
  const NUMBER_OF_SLIDES = document.querySelectorAll('.carousel__slide').length;
  const SLIDE_WIDTH = document.querySelector('.carousel__slide').offsetWidth;
  let counter = 0;

  hideArrow(CAROUSEL_ARROW_LEFT);

  CAROUSEL_ARROW_LEFT.addEventListener('click', () => {
    counter--;
    CAROUSEL_INNER.style.transform = translateSlide(SLIDE_WIDTH, counter);
    hideOrShowArrow(counter, CAROUSEL_ARROW_LEFT, CAROUSEL_ARROW_RIGHT, NUMBER_OF_SLIDES)
  })

  CAROUSEL_ARROW_RIGHT.addEventListener('click', () => {
    counter++;
    CAROUSEL_INNER.style.transform = translateSlide(SLIDE_WIDTH, counter);
    hideOrShowArrow(counter, CAROUSEL_ARROW_LEFT, CAROUSEL_ARROW_RIGHT, NUMBER_OF_SLIDES)
  })
}

function hideArrow(arrow) {
  arrow.style.display = 'none';
}

function showArrows(arrowLeft, arrowRight) {
  arrowLeft.style.display = '';
  arrowRight.style.display = '';
}

function hideOrShowArrow(counter, arrowLeft, arrowRight, number) {
  if (counter == 0) {
    hideArrow(arrowLeft);
  }
  else if (counter == number - 1) {
    hideArrow(arrowRight);
  }
  else {
    showArrows(arrowLeft, arrowRight);
  }
}

function translateSlide (width, multiplier) {
  return `translateX(-${width*multiplier}px)`;
}