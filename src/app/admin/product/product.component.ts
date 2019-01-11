
import { Component } from '@angular/core';
import { LoginService } from '../../../core/LoginService.service';
import { Router } from '@angular/router';
import { IProduct } from '../../../shared/interfaces';
import { ProductService } from '../../../core/ProductService.service';

interface ISizes {
  "value": string;
  "pSize": Array<string>;
}

interface IResponse {
  "message": string;
  "isProductAdded": boolean;
}

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html'
})

export class ProductComponent {

  constructor(private loginService: LoginService, private router: Router, private productService: ProductService) { }

  isSize: string;
  productSize;
  showAlert = false;
  alert;

  newProduct = {} as IProduct;

  productSizes: ISizes[] = [{
    "value": "Small,Medium,Large",
    "pSize": ["Small","Medium","Large"]
  },
  {
    "value": "6,9,11",
    "pSize": [ "6","9","11"]
  },
  {
    "value": "L,XL,XXL,XXXL",
    "pSize": ["L","XL","XXL","XXXL"]
  }]

  saveProduct() {
    if (this.isSize == "yes"){
        this.newProduct.pSize = this.productSize.split(',');
    }
    this.productService.addProduct(this.newProduct).subscribe((Response: IResponse) => {
      this.showAlert = true;
      this.alert = Response.message;
      if (Response.isProductAdded) {
        this.newProduct = {} as IProduct;
        this.isSize = "";
      }
    });
  }
}
