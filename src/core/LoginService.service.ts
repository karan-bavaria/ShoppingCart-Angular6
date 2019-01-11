import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class LoginService {

    baseUrl: string = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }

    getUserByCredential(username: string, password: string): Observable<Boolean> {
        return this.http.post<Boolean>(this.baseUrl + 'getUserByCredential', { username, password });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }


}