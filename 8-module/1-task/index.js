import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    this._elemCoords = this.elem.getBoundingClientRect();

    this._clientWidth = document.documentElement.clientWidth;

    if (this._clientWidth > 767) {
    
      if (window.pageYOffset > this._elemCoords.top) {
        this.elem.style.position = 'fixed';
        this.elem.style.zIndex = '1000';
        this.elem.style.top = '50px';

        this._container = document.querySelector('.container');
        this._containerCoords = this._container.getBoundingClientRect();

        if (this._clientWidth > this._containerCoords.right + this._elemCoords.width + 20) {
          this.elem.style.left = `${this._containerCoords.right + 20}px`;
        }
        else {
          this.elem.style.left = `${this._clientWidth - this._elemCoords.width - 10}px`;
        }

      }
      else {
        this._defaultStyles();
      }
      
    }
    else {
      this._defaultStyles();
    }
  }

  _defaultStyles() {
    this.elem.style.position = '';
    this.elem.style.zIndex = '';
    this.elem.style.top = '';
    this.elem.style.left = '';
  }
}
