import { Component } from '@angular/core';
import { LoginService } from '../../core/LoginService.service';
import { Router } from '@angular/router';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor(private loginService: LoginService, private router: Router) {
        
     }

    alert:string;
    showAlert:boolean = false;

    validateUser(username: string, password: string) {

        this.loginService.getUserByCredential(username, password).subscribe((isUserValid: Boolean) => {
            if (isUserValid) {
                localStorage.setItem('currentUser',username);
                this.router.navigateByUrl('/admin');
            }
            else {
                this.showAlert =true;
                this.alert = "INVALID CREDENTIALS";
            }
        })
    }



}