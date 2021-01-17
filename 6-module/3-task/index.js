import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this._сontainer = null;
    this._currentSlide = 0;

    this._onCarouselArrowLeftClick = this._onCarouselArrowLeftClick.bind(this);
    this._onCarouselArrowRightClick = this._onCarouselArrowRightClick.bind(this);
    this._onCarouselButtonClick = this._onCarouselButtonClick.bind(this);

    this._render();
  }

  _render() {
    this._container = createElement(carouselTemplate(this._slides));
      
    this._hideOrShowArrows();
    
    this._carouselArrowLeft.addEventListener('click', this._onCarouselArrowLeftClick);
    this._carouselArrowRight.addEventListener('click', this._onCarouselArrowRightClick);
    this._carouselInner.addEventListener('click', this._onCarouselButtonClick);
  }

  get _carouselArrowLeft() {
    return this.elem.querySelector('.carousel__arrow_left');
  }
  
  get _carouselArrowRight() {
    return this.elem.querySelector('.carousel__arrow_right');
  }

  get _carouselButton() {
    return this.elem.querySelector('.carousel__button');
  }

  get _carouselInner() {
    return this.elem.querySelector('.carousel__inner');
  }

  get _numberOfSlides() {
    return this._slides.length;
  }

  get _carouselSlideWidth() {
    return this.elem.querySelector('.carousel__slide').offsetWidth;
  }

  get elem() {
    return this._container;
  }

  _hideOrShowArrows() {
    if (this._currentSlide == 0) {
      this._carouselArrowLeft.style.display = 'none';
    } else if (this._currentSlide == this._numberOfSlides - 1) {
      this._carouselArrowRight.style.display = 'none';
    } else {
      this._carouselArrowLeft.style.display = '';
      this._carouselArrowRight.style.display = '';
    }
  }

  _onCarouselArrowLeftClick() {
    this._currentSlide--;
    this._update();
  }

  _onCarouselArrowRightClick() {
    this._currentSlide++;
    this._update();
  }

  _onCarouselButtonClick(evt) {
    const target = evt.target;
    if (!target.tagName == 'BUTTON') {
      return;
    }

    const slide = target.closest('.carousel__slide');

    const event = new CustomEvent('product-add', {
      detail: slide.dataset.id,
      bubbles: true
    })

    this._carouselInner.dispatchEvent(event);
  }

  _update() {
    this._carouselInner.style.transform = translateX(this._carouselSlideWidth, this._currentSlide);
    this._hideOrShowArrows();
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

function translateX (width, multiplier) {
  return `translateX(-${width*multiplier}px)`;
}


