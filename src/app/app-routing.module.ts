import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path:'', pathMatch:'full',redirectTo:'/home'},
  { path:'home', component:HomeComponent},
  { path:'cart', component:CartComponent},
  { path:'login', component:LoginComponent},
  { path:'admin', component:AdminComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
