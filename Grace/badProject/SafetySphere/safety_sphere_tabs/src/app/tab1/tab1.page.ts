import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductListItem } from '../product-list-item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  hotProducts: ProductListItem[] = []
  discountProducts: ProductListItem[] = []

  constructor(private shoppingCartService: ShoppingCartService) { }


  ngOnInit() {
    this.hotProducts.push({ id: 1, name: 'apple', hot: true })
    this.hotProducts.push({ id: 2, name: 'banana', hot: true })
    this.discountProducts.push({ id: 3, name: 'cherry', discount: true })
    this.discountProducts.push({ id: 4, name: 'david', discount: true })
    this.discountProducts.push({ id: 5, name: 'egg', discount: true })
  }

  getHotProductCount() {
    return this.shoppingCartService.hotCount
  }



}
