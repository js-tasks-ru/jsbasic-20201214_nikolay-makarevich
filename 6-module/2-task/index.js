import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this._container = null;
    this.product = product;

    this._onCardButtonClick = this._onCardButtonClick.bind(this);
    this._render();
  }

  _render() {
    this._container = createElement(cardTemplate(this.product.name, this.product.image, this.product.price));

    this._container.querySelector('.card__button').addEventListener('click', this._onCardButtonClick);
  }

  get elem() {
    return this._container;
  }

  _onCardButtonClick() {
    const event = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    })
    
    this.elem.dispatchEvent(event);
  }
}

function cardTemplate(name, image, price) {
  return `<div class="card">
            <div class="card__top">
                <img src="/assets/images/products/${image}" class="card__image" alt="product">
                <span class="card__price">€${price.toFixed(2)}</span>
            </div>
            <div class="card__body">
                <div class="card__title">${name}</div>
                <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
          </div>`
}