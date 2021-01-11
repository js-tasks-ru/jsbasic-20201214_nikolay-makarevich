function initCarousel() {
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselInner = document.querySelector('.carousel__inner');
  const numberOfSlides = document.querySelectorAll('.carousel__slide').length;
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let counter = 0;

  hideArrow(carouselArrowLeft);

  carouselArrowLeft.addEventListener('click', () => {
    counter--;
    carouselInner.style.transform = translateSlide(slideWidth, counter);
    hideOrShowArrow(counter, carouselArrowLeft, carouselArrowRight, numberOfSlides)
  })

  carouselArrowRight.addEventListener('click', () => {
    counter++;
    carouselInner.style.transform = translateSlide(slideWidth, counter);
    hideOrShowArrow(counter, carouselArrowLeft, carouselArrowRight, numberOfSlides)
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
