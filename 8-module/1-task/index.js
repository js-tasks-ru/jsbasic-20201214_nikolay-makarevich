import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
    this.addEventListeners();
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
    let elemCoordsTop = this.elem.getBoundingClientRect().top;

    if ( !document.documentElement.clientWidth > 767 ) {
      this._defaultStyles();
      return;
    }

    if ( window.pageYOffset > elemCoordsTop ) {
      let leftIndent = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      )
      this._onScrollStyles();
      this.elem.style.left = `${leftIndent}px`
    }
    else {
      this._defaultStyles();
      return;
    }
  }

  _defaultStyles() {
    this.elem.style.position = '';
    this.elem.style.zIndex = '';
    this.elem.style.top = '';
    this.elem.style.left = '';
  }

  _onScrollStyles() {
    this.elem.style.position = 'fixed';
    this.elem.style.zIndex = '1000';
    this.elem.style.top = '50px';
  }
}
