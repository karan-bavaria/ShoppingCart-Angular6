import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/TransactionService.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  cartProducts: any[];
  selectedRow;
  selectedProductId: number;

  ngOnInit() {
    this.cartProducts = this.transactionService.getCart();
  }

  onQuantityChange(event, id) {
    //Call service for updating quantity
    this.transactionService.updateQuantity(event.target.value, id);
  }

  checkout() {
    if (this.transactionService.getCart().length) {
      //call for saving transaction to database
      this.transactionService.commitTransaction();
      //empty cart after save call
      this.cartProducts = this.transactionService.getCart();
    }
    else {
      alert("empty cart");
    }

  }


  //This is for showing total
  getTotal(): number {
    let productTotal: number = 0;
    this.cartProducts.forEach((product) => {
      productTotal += (product.pPrice * product.pQty)
    });
    return productTotal;
  }

  //for updating selected row
  setClickedRow(i) {
    this.selectedRow = i;
  }


}
