import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    _isLoggedIn: boolean = false;

    constructor (private http: HttpClient) {}

    register(registerData: any) {
        return this.http.post('http://localhost:8000/api/register', registerData);
    }

    login(loginData: any) {
        return this.http.post('http://localhost:8000/api/login', loginData);
    }

    get isLoggedIn() {
        const token = localStorage.getItem('token');
        if(token) {
            return true;
        }else {
            return false;
        }
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }
}