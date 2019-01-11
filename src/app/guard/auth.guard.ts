import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRoute  } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router: Router,private activatedRoute : ActivatedRoute) { }

    canActivate() {
        
        if (localStorage.getItem('currentUser') == 'admin') {
           return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}