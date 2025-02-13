import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor (private http: HttpClient) {}

    register(registerData: any) {
        return this.http.post('http://localhost:8000/api/register', registerData);
    }
}