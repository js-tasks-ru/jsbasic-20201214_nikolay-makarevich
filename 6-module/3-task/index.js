import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = null;
    this._currentSlide = 0;

    this._onCarouselArrowLeftClick = this._onCarouselArrowLeftClick.bind(this);
    this._onCarouselArrowRightClick = this._onCarouselArrowRightClick.bind(this);
    this._onCarouselButtonClick = this._onCarouselButtonClick.bind(this);

    this._render();
  }

  _render() {
    this.elem = createElement(carouselTemplate(this.slides));
      
    hideOrShowArrows(this._currentSlide, this._numberOfSlides, this.carouselArrowLeft, this.carouselArrowRight);
    
    this.carouselArrowLeft.addEventListener('click', this._onCarouselArrowLeftClick);
    this.carouselArrowRight.addEventListener('click', this._onCarouselArrowRightClick);
    this.carouselButton.addEventListener('click', this._onCarouselButtonClick);
  }

  get carouselArrowLeft() {
    return this.elem.querySelector('.carousel__arrow_left');
  }
  
  get carouselArrowRight() {
    return this.elem.querySelector('.carousel__arrow_right');
  }

  get carouselButton() {
    return this.elem.querySelector('.carousel__button');
  }

  get carouselInner() {
    return this.elem.querySelector('.carousel__inner');
  }

  get numberOfSlides() {
    return this.slides.length;
  }

  get carouselSlideWidth() {
    return this.elem.querySelector('.carousel__slide').offsetWidth;
  }

  _onCarouselArrowLeftClick() {
    this._currentSlide--;
    this.carouselInner.style.transform = translateSlide(this.carouselSlideWidth, this._currentSlide);
    hideOrShowArrows(this._currentSlide, this.numberOfSlides, this.carouselArrowLeft, this.carouselArrowRight);
  }

  _onCarouselArrowRightClick() {
    this._currentSlide++;
    this.carouselInner.style.transform = translateSlide(this.carouselSlideWidth, this._currentSlide);
    hideOrShowArrows(this._currentSlide, this.numberOfSlides, this.carouselArrowLeft, this.carouselArrowRight);
  }

  _onCarouselButtonClick() {
    const event = new CustomEvent('product-add', {
      detail: this.slides[0].id,
      bubbles: true
    })

    this.carouselButton.dispatchEvent(event);
  }

}

function carouselTemplate(items) {
  return `<div class="carousel">
            <div class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </div>
            <div class="carousel__arrow carousel__arrow_left">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
            </div>

            <div class="carousel__inner">
              ${items.map(item => carouselSlideTemplate(
                item.name,
                item.price, 
                item.image,
                item.id)
                ).join('')}
            </div>
          </div>`
}

function carouselSlideTemplate(name, price, image, id) {
  return `<div class="carousel__slide" data-id="${id}">
  <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${price.toFixed(2)}</span>
    <div class="carousel__title">${name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`
}

function translateSlide (width, multiplier) {
  return `translateX(-${width*multiplier}px)`;
}

function hideOrShowArrows(currentSlide, numberOfSlides, leftArrow, rightArrow) {
  if (currentSlide == 0) {
    leftArrow.style.display = 'none';
  } else if (currentSlide == numberOfSlides - 1) {
    rightArrow.style.display = 'none';
  } else {
    leftArrow.style.display = '';
    rightArrow.style.display = '';
  }
}
