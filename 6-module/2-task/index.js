import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor({ name, price, category, image, id }) {
    this.elem = null;
    this._name = name;
    this._price = price;
    this._category = category;
    this._image = image;
    this._id = id;

    this._onCardButtonClick = this._onCardButtonClick.bind(this);
    this._render();
  }

  _render() {
    this.elem = makeElement('div', 'card');
    this.elem.innerHTML = cardInnerTemplate(this._name, this._image, this._price);

    this.cardButton.addEventListener('click', this._onCardButtonClick);
  }

  get cardButton() {
    return this.elem.querySelector('.card__button');
  }

  _onCardButtonClick() {
    const event = new CustomEvent("product-add", {
      detail: this._id,
      bubbles: true
    })
    this.cardButton.dispatchEvent(event);

  }
}

function makeElement(tagName, className, imgName = '') {
  const element = document.createElement(tagName);
  element.classList.add(className);  
  return element;
}

function cardInnerTemplate(name, image, price) {
  return `<div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">€${price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>`
}