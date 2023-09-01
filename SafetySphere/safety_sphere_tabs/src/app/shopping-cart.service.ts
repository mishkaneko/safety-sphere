import { Injectable } from '@angular/core';
import { ProductListItem } from './product-list-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  hotCount = 0
  discountCount = 0

  constructor() { }

  addToCart(product: ProductListItem) {
    if(product.hot) {
      this.hotCount ++
    }
    if(product.discount) {
      this.discountCount ++
    }
  }
}
