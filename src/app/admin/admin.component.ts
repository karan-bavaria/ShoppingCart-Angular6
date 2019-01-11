import { Component } from '@angular/core';
import { LoginService } from '../../core/LoginService.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent {

    insert = 'product';
    
    constructor(private loginService: LoginService, private router: Router) { }

    logout() {
        this.loginService.logout();
        this.router.navigateByUrl('/login');
    }
}
