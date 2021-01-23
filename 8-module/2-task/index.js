import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this._container = null;

    this._render();
  }

  _render() {
    this._container = createElement(gridTemplate());
    this._renderItems(this.products);
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);

    let {noNuts = false, vegeterianOnly = false, maxSpiciness = 0, category = ''} = this.filters;

    let filteredProducts = [];

    filteredProducts = this.products
      .filter(product => noNuts ? noNuts == !product.nuts : product)
      .filter(product => vegeterianOnly ? vegeterianOnly == product.vegeterian : product)
      .filter(product => maxSpiciness ? product.spiciness <= maxSpiciness : product)
      .filter(product => category ? category == product.category : product);
        
    this._renderItems(filteredProducts);
  }

  _renderItems(items) {
    const productsInnerElement = this._container.firstElementChild;
    productsInnerElement.innerHTML = '';

    items.forEach( product => productsInnerElement
      .append(cardTemplate(product)))
  }

  get elem() {
    return this._container;
  }
}

function gridTemplate() {
  return `<div class="products-grid">
            <div class="products-grid__inner"></div>
          </div>`
}

function cardTemplate(item) {
  let card = new ProductCard(item);
  return createElement(`<div class="card">${card.elem.innerHTML}</div>`);
}