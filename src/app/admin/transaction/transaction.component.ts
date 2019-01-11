import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/core/TransactionService.service';
import { ITransaction } from 'src/shared/interfaces';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {

  Transactions: ITransaction[] = [];

  rowSpan = 2;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((transactions: ITransaction[]) => {
      this.Transactions = transactions;
    });
  }


  getTotal(): number {
    let Total: number = 0;
    this.Transactions.forEach((transaction) => {
      Total += transaction.tTotal;
     })
    return Total;
  }





}
