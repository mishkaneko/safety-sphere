import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductListItem } from '../product-list-item';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent  implements OnInit {

  @Input()
  product!: ProductListItem

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product)
  }

}
