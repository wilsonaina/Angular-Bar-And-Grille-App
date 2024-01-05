import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ProductsService} from "../../../shared/services/products/products.service";
import {CartService} from "../../../shared/services/cart/cart.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CartItemModel} from "../../../shared/models/cart-item.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  drinks: any[] = [];
  sides: any[] = [];
  entrees: any[] = [];
  displaySuccessAlert: boolean = false;
  cartHasProducts: boolean = false;
  cartProductTitle: string;
  cartItems: Product[];
  cartItemCount$: Observable<number>;
  cartPriceTotal$: Observable<number>;
  itemCount: number;


  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCartProducts();
    this.getCountItemCount();
    this.priceCartTotal();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((product) => {
      Object.keys(product).forEach(key => {
        this.products.push(product[key]);
      });
      // Returns entree products
      this.entrees = this.products
        .filter((product) => product.category === 'entree');
      // Returns entree products
      this.sides = this.products
        .filter((product) => product.category === 'sides');
      // Returns entree products
      this.drinks = this.products
        .filter((product) => product.category === 'drinks');
    });
  }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.getCartProducts();
        this.cartProductTitle = product.title;
        this.triggerDisplaySuccessAlert();
        this.windowScrollToTop();
        this.getCountItemCount();
        this.priceCartTotal();
        console.log(`${JSON.stringify(product)} was successfully added to the cart`);
      },
      error: (error) => {
        console.log(`There was an error adding product to cart: ${error}`);
      }
    });
  }

  triggerDisplaySuccessAlert() {
    this.displaySuccessAlert = true;

    setTimeout(() => {
      this.displaySuccessAlert = false;
    }, 3000);
  }

  getCartProducts() {
    this.cartService.getCartProductsFromLocaleStorage().subscribe({
      next: (customerCart) => {
        if (customerCart.length) {
          this.cartItems = customerCart;
          this.cartHasProducts = true;
        } else {
          this.cartHasProducts = false;
        }
      },
      error: (error) => console.log(error)
    })
  }

  windowScrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  toggleDisplaySuccessAlert() {
    if (this.displaySuccessAlert) {
      this.displaySuccessAlert = false;
    }
  }

  priceCartTotal() {
    this.cartPriceTotal$ = this.cartService.priceCartTotal();
  }

  getCountItemCount() {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  removeCartItem(sku: string, index: number) {
    this.cartService.removeCartItem(sku, index).subscribe({
      next: (val) => {
        // Refresh the cart
        if (val) {
          this.getCartProducts();
          this.getCountItemCount();
          this.priceCartTotal();
        } else {
          this.cartHasProducts = false;
        }
      },
      error: (error) => console.log(error)
    });
  }

  removeAllItems() {
    this.cartService.clearCart().subscribe((res) => {
      this.cartHasProducts = false;
      this.getCountItemCount();
      this.priceCartTotal();
    })
  }
}
