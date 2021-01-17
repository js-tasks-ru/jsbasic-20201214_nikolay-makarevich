import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._container = null;
    this._scrollStep = 350;

    this._leftScrolling = this._leftScrolling.bind(this);
    this._rightScrolling = this._rightScrolling.bind(this);
    this._toggleArrows = this._toggleArrows.bind(this);
    this._ribbonSelect = this._ribbonSelect.bind(this);
    
    this._render();
  }

  _render() {
    this._container = createElement(ribbonTemplate(this.categories));

    this._toggleArrows();
    this._ribbonArrowLeft.addEventListener('click', this._leftScrolling);
    this._ribbonArrowRight.addEventListener('click', this._rightScrolling);
    this._ribbonInner.addEventListener('scroll', this._toggleArrows);
    this._ribbonInner.addEventListener(`click`, this._ribbonSelect);
  }

  _leftScrolling() {
    this._toggleArrows();

    this._ribbonInner.scrollBy(-this._scrollStep, 0);
  }

  _rightScrolling() {
    this._toggleArrows();

    this._ribbonInner.scrollBy(this._scrollStep, 0);
  }

  _toggleArrows() {
    this._clientWidth = this._ribbonInner.clientWidth;
    this._scrollWidth = this._ribbonInner.scrollWidth;
    this._scrollLeft = this._ribbonInner.scrollLeft;
    this._scrollRight = this._scrollWidth - this._scrollLeft - this._clientWidth;
    
    if (this._scrollLeft == 0) {
      this._ribbonArrowLeft.classList.toggle('ribbon__arrow_visible');
    }

    if (this._scrollRight == 0) {
      this._ribbonArrowRight.classList.toggle('ribbon__arrow_visible');
    }
  }

  _ribbonSelect(evt) {
    const target = evt.target;

    if (!target.dataset.id) {
      return;
    }

    const event = new CustomEvent('ribbon-select', { 
      detail: target.dataset.id, 
      bubbles: true
    })

    this._ribbonInner.dispatchEvent(event);
  }

  get elem() {
    return this._container;
  }

  get _ribbonArrowLeft() {
    return this._container.querySelector('.ribbon__arrow_left');
  }

  get _ribbonArrowRight() {
    return this._container.querySelector('.ribbon__arrow_right');
  }

  get _ribbonInner() {
    return this._container.querySelector('.ribbon__inner');
  }
}

function ribbonTemplate(items) {
  return `<div class="ribbon">
            <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
            <nav class="ribbon__inner">
              ${items.map((item, index) => ribbonItemTemplate(item, index)).join('')}
            </nav>
            <button class="ribbon__arrow ribbon__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
          </div>`
}

function ribbonItemTemplate(item, index) {
  if (index == 0) {
    return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${item.id}">${item.name}</a>`;
  }
  
  return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
}