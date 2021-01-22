export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    const productItem = {
      product: {},
      count: 1
    };

    let cartItem = {};

    const itemNames = this.cartItems.map( item => item.product.name );
    const index = itemNames.indexOf(product.name);

    if ( index < 0 || this.isEmpty()) {
      Object.assign(productItem.product, product);
      this.cartItems.push(productItem); 
      cartItem = productItem;
    }
    else {
      this.cartItems[index].count++;
      cartItem = this.cartItems[index];
    }

    this.onProductUpdate(this.cartIcon);
  }

  updateProductCount(productId, amount) {
    const itemIds = this.cartItems.map( item => item.product.id );
    const index = itemIds.indexOf(productId);

    this.cartItems[index].count += amount;

    if ( this.cartItems[index].count == 0 ) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(this.cartIcon);
  }

  isEmpty() {
    return !Boolean(this.cartItems.length);
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach( item => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach( item => {
      totalPrice += item.product.price * item.count;
    })

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

