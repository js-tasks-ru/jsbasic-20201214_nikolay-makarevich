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

    const cartItem = this.cartItems.find(item => item.product.id == product.id);

    if ( !cartItem ) {
      Object.assign(productItem.product, product);
      this.cartItems.push(productItem); 
    }
    else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id == productId);
    const cartItemIndex = this.cartItems.findIndex(item => item.product.id == productId);

    cartItem.count += amount;
    

    if ( cartItem.count == 0 ) {
      this.cartItems.splice(cartItemIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !Boolean(this.cartItems.length);
  }

  getTotalCount() {
    return this.cartItems.reduce(( totalCount, item ) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(( totalPrice, item ) => totalPrice + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

