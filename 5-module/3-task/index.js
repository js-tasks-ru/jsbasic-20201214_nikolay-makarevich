function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const arrowLeftClass = 'carousel__arrow_left';
  const arrowRightClass = 'carousel__arrow_right';
  const carouselArrowLeft = document.querySelector(`.${arrowLeftClass}`);
  const carouselArrowRight = document.querySelector(`.${arrowRightClass}`);
  const slide = document.querySelector('.carousel__inner');
  const numberOfSlides = document.querySelectorAll('.carousel__slide').length;
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let counter = 0;

  hideArrow(carouselArrowLeft);

  carousel.addEventListener('click', function(event) {
    if (event.target == carouselArrowRight  || event.target == carouselArrowRight.firstElementChild) {
      counter++;
      slide.style.transform = translateSlide(slideWidth, counter);
    }
    else if (event.target == carouselArrowLeft || event.target == carouselArrowLeft.firstElementChild) {
      counter--;
      slide.style.transform = translateSlide(slideWidth, counter);
    }
    hideOrShowArrow(counter, carouselArrowLeft, carouselArrowRight, numberOfSlides);
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