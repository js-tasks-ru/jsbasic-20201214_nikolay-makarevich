import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this._container = null;
    this._filteredProducts = [];
    this._filteredProducts = this._filteredProducts.concat(products);

    this._render();
  }

  _render() {
    this._container = createElement(gridTemplate(this._filteredProducts));
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);
    
    this._noNuts(this.filters.noNuts);
    this._vegeterianOnly(this.filters.vegeterianOnly);
    this._spiciness(this.filters.maxSpiciness);
    this._category(this.filters.category);
    
    this._updateDOM();
  }

  _noNuts( noNuts = undefined ) {
    if ( noNuts === undefined ) {
      return;
    }

    const nuts = this.products.filter( item => item.nuts );

    nuts.forEach(item => {
      this._splice(item);
    })

    if ( !noNuts ) {
      this._filteredProducts.push(...nuts);
      this.filters.noNuts = undefined;
    }
  }

  _vegeterianOnly( vegeterian = undefined ) {
    if ( vegeterian === undefined ) {
      return;
    }

    const noVegeterians = this.products.filter( item => !item.vegeterian );

    noVegeterians.forEach(item => {
      this._splice(item);
    })
    

    if( !vegeterian ) {
      this._filteredProducts.push(...noVegeterians);
      this.filters.vegeterianOnly = undefined;
    }
  }

  _spiciness( maxSpiciness = undefined ) {
    if ( maxSpiciness === undefined ) {
      return;
    }

    const maxSpicy = this.products.filter( item => item.spiciness <= maxSpiciness );

    if (maxSpicy.length > this._filteredProducts.length) {

      maxSpicy.forEach( item => {

        if ( !this._filteredProducts.includes(item) ) {
          this._filteredProducts.push(item);
        }
        
      })

    }
    else {

      this.products.forEach( item => {

        if ( !maxSpicy.includes(item) ) {
          const ind = this._filteredProducts.indexOf(item);
          this._filteredProducts.splice(ind, 1);
        }

      })

    }

    this.filters.maxSpiciness = undefined;
  }

  _category( category = undefined ) {
    if ( category === undefined ) {
      return;
    }

    const otherCategory = this.products.filter(item => item.category != this.filters.category);

    otherCategory.forEach(item => {
      this._splice(item);
    })

    if ( !category ) {
      this._filteredProducts.push(...otherCategory);
      this.filters.category = undefined;
    }
  }

  _splice( item ) {
    if ( this._filteredProducts.includes(item) ) {
      const index = this._filteredProducts.indexOf(item);
      this._filteredProducts.splice(index, 1);
    }
  }

  _updateDOM() {
    const cardsNames = [...this._container.querySelectorAll('.card__title')];
    const cardsNamesText = cardsNames.map( item => item.innerHTML);
    const filteredProductsNames = this._filteredProducts.map( item => item.name);
    
    if ( cardsNames.length > filteredProductsNames.length ) {
      cardsNamesText.forEach( (item, index) => {

        if ( !filteredProductsNames.includes(item) ) {
          cardsNames[index].closest('.card').remove();
        }

      })
    }
    else {
      const productsGridInner = document.querySelector('.products-grid__inner');
      filteredProductsNames.forEach( (item, index ) => {

        if ( !cardsNamesText.includes(item) ) {
          productsGridInner.append(cardTemplate(this._filteredProducts[index]));
        }

      })
    }
  }

  get elem() {
    return this._container;
  }
}

function gridTemplate(items) {
  return `<div class="products-grid">
            <div class="products-grid__inner">
              ${items.map(item => {
                let card = {};
                card = new ProductCard(item);
                return `<div class="card">${card.elem.innerHTML}</div>`;
              })
              .join('')}
            </div>
          </div>`
}

function cardTemplate(item) {
  let card = new ProductCard(item);
  return createElement(`<div class="card">${card.elem.innerHTML}</div>`);
}