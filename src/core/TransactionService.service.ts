import { Injectable } from '@angular/core';
import { ITransaction } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class TransactionService {

    private cartProductList: any[] = [];

    baseUrl: string = 'http://localhost:8000';

    cartTransaction = {
        "tId":0,
        "tTotal":0,
        "transaction": [{}]
    } as ITransaction;

    constructor(private http: HttpClient,private router:Router) { }

    //sets cart value
    setCart(cartProducts: any[]) {
        this.cartProductList = cartProducts;
    }

    //returns cart value
    getCart() {
        return this.cartProductList;
    }

    //updates quantity
    updateQuantity(id, qty) {
        this.cartProductList.forEach((product) => {
            if (product.pId == id) {
                product.pQty = qty;
            }
        })
    }

    getTransactions():Observable<ITransaction[]>{
       return this.http.get<ITransaction[]>(this.baseUrl + '/getTransactions');
    }

    //saves transaction into database
    commitTransaction() {

        this.cartTransaction.tTotal = 0;
        
        //converting data to transaction.json format
        for (let i = 0; i < this.cartProductList.length; i++) {
            this.cartTransaction.transaction[i] = this.cartProductList[i];
            this.cartTransaction.transaction[i].pTotal = this.cartProductList[i].pPrice * this.cartProductList[i].pQty;
            this.cartTransaction.tTotal += this.cartTransaction.transaction[i].pTotal;
        }

        //request to save the data
        this.http.post(this.baseUrl + '/commitTransaction', this.cartTransaction).subscribe();
        
        alert("you have completed your ORDER !!!");
        
        //empty the cart
        this.setCart([]);
        
        //navigate to homepage
        this.router.navigateByUrl('/home');
        }



}