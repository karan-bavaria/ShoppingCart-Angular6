import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/ProductService.service';
import { IProduct } from '../../shared/interfaces';
import { TransactionService } from '../../core/TransactionService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  products: IProduct[];
  cartProductList: any[] = [];

 
  constructor(private productService: ProductService, private transactionService: TransactionService) { }

  ngOnInit() {
    //call for getting all products details
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });

    //set the cartProductList to value of products in carts
    this.cartProductList = this.transactionService.getCart();
  }

  addToCart(selectedProduct) {

    //validate whether the product has already been added or not
    let isProductAdded: boolean = this.productService.validateProduct(selectedProduct, this.cartProductList);

    if (!isProductAdded) {
  
      //convert data format to required format for transaction services
      let cartProduct = this.productService.toCartProduct(selectedProduct, selectedProduct.selectedSize);
      //add object to current products list  
      this.cartProductList.push(cartProduct);
      //call the service to set the cart value 
      this.transactionService.setCart(this.cartProductList);
      alert("Product Added to Cart");
    }
    else {
      alert("Product Already Exists in Cart");
    }

  }

}
