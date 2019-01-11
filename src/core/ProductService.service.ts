import { Injectable } from '@angular/core';
import { IProduct } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ProductService {

    baseUrl: string = 'http://localhost:8000';

    constructor(private http: HttpClient) { }

    //This service returns all products observable
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.baseUrl + '/getProducts');
    }

    //This service checks for the product in the cart
    //REQUIRED - (current selected Product , Products in Cart)
    validateProduct(product: any, productList: any[]): boolean {
        let flag: boolean = false;
        productList.forEach(element => {
            if (element.pId == product.pId) {
                flag = true; // It doesnt work with 'return true;'.Hence,the varible flag is required.
            }
        });
        return flag;
    }

    //This service returns an object for cart component and assigns qty = 1;
    //REQUIRED (product to be added , size selectes by user i.e. if selected )
    toCartProduct(product: IProduct, size?: string): any {
        
        let cartProduct: any = {};

        cartProduct.pId = product.pId;
        cartProduct.pName = product.pName;
        cartProduct.pPrice = product.pPrice;
        cartProduct.pSize = size;
        cartProduct.pQty = 1;

        return cartProduct;
    }

    //add new Product to cart
    addProduct(product:IProduct):Observable<Object>{
        return this.http.post(this.baseUrl + '/addProduct',product);
    }


}