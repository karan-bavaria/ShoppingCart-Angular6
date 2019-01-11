import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from '../core/ProductService.service';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../core/TransactionService.service';
import { LoginService } from '../core/LoginService.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductComponent } from './admin/product/product.component';
import { TransactionComponent } from './admin/transaction/transaction.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    AdminComponent,
    ProductComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService,TransactionService,LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
