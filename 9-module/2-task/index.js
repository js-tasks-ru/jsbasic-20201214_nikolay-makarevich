import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = null;
    this.ribbonMenu = null;
    this.stepSlider = null;
    this.cartIcon = null;
    this.cart = null;
  }

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();

    this.cart = new Cart(this.cartIcon);
    
    await this.renderProducts();
    
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    })

    this.addEventListeners();
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider( {steps: 5, value: 3} );
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  }

  async renderProducts() {
    const response = await fetch('./products.json');
    this.products = await response.json();
    this.productsGrid = new ProductsGrid(this.products);
    this.productsGridHolder = document.querySelector('[data-products-grid-holder]');
    this.productsGridHolder.innerHTML = '';
    this.productsGridHolder.append(this.productsGrid.elem);
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const product = this.products.find(item => item.id == event.detail);
      this.cart.addProduct(product);
    })

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter( {maxSpiciness: event.detail} );
    })

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter( {category: event.detail} );
    })

    document.querySelector('#nuts-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter( {noNuts: document.querySelector('#nuts-checkbox').checked} )
    })

    document.querySelector('#vegeterian-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter( {vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked} )
    })
  }
}
