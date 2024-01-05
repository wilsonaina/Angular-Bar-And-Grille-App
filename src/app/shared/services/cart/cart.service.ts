import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  localStorageCart: any[] = [];
  cartItemQuantity: number;
  cartTotalPrice: number;

  constructor() {
  }

  addToCart(product: Product): Observable<any> {
    return new Observable((subscriber) => {
      if (product) {
        // Check if customer has items in cart session
        if (localStorage.getItem('customer_cart')) {
          this.cart = JSON.parse(localStorage.getItem('customer_cart') || '{}');

          // Check if product already exists in cart
          const isProductAlreadyCart = this.cart.find(
            (cartItem: Product)=> {
              return cartItem.sku === product.sku
            });
          // If product exits in the cart, we just update the current cart product and increment
          // the quantity value plus 1
          if (isProductAlreadyCart) {
            const cartItemIndex = this.cart.indexOf(isProductAlreadyCart);
            const newCartItem: Product = {
              ...isProductAlreadyCart,
              quantity: isProductAlreadyCart.quantity + 1
            }
            this.cart.splice(cartItemIndex, 1, newCartItem);
            localStorage.setItem('customer_cart', JSON.stringify(this.cart));
            subscriber.next();
            subscriber.complete();
          } else {
            console.log('This is a new product added');
            this.cart.push(product);
            // Set the cart object with the newly added product
            localStorage.setItem('customer_cart', JSON.stringify(this.cart));
            subscriber.next();
            subscriber.complete();
          }
        } else {
          this.localStorageCart.push(product);
          localStorage.setItem('customer_cart', JSON.stringify(this.localStorageCart));
          subscriber.next();
          subscriber.complete();
        }
      }
    })
  }

  getCartProductsFromLocaleStorage(): Observable<any> {
    return new Observable((subscriber) => {
      if (localStorage && localStorage.getItem('customer_cart')) {
        const customerCart = JSON.parse(localStorage.getItem('customer_cart') || '{}');
        subscriber.next(customerCart);
        subscriber.complete();
      } else {
        const noItemsInTheCart = `There's no items in the cart`;
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  getCartItemCount(): Observable<number> {
    return new Observable<number>((subscriber) => {
      this.cart = JSON.parse(localStorage.getItem('customer_cart') || '{}');
      // Check if theres items in the cart
      if (localStorage && localStorage.getItem('customer_cart')) {
          const totalCartItemCount = this.cart.reduce((total, sum: Product) => {
            return total + sum.quantity
          }, 0);
          subscriber.next(totalCartItemCount);
          subscriber.complete();
      } else {
        subscriber.next(0);
        subscriber.complete();
      }
    });
  }

  clearCart() {
    return new Observable((subscriber) => {
      if (localStorage && localStorage.getItem('customer_cart')) {
        localStorage.removeItem('customer_cart');
        subscriber.next();
        subscriber.complete();
      } else {
        subscriber.next('Theres no locale storage object available');
        subscriber.complete();
      }
    })
  }

  removeCartItem(sku: string, index: number): Observable<any> {
    return new Observable((subscriber) => {
      this.cart = JSON.parse(localStorage.getItem('customer_cart') || '{}');
      if (this.cart) {
        this.cart.splice(index, 1);
        // Set the cart object without the remove cart item
        localStorage.setItem('customer_cart', JSON.stringify(this.cart));
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  priceCartTotal() {
    return new Observable<number>((subscriber) => {
      this.cart = JSON.parse(localStorage.getItem('customer_cart') || '{}');
      if (localStorage && localStorage.getItem('customer_cart')) {
        this.cartTotalPrice = this.cart.reduce((total, currentValue:Product) => {
          return Number(currentValue.displayPrice) + total;
        }, 0);
        subscriber.next(this.cartTotalPrice);
        subscriber.complete();
      } else {
        subscriber.next(0);
        subscriber.complete();
      }
    })
  }
}
