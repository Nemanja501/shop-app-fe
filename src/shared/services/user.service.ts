import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) {}

    getById(id: string, page: number = 1) {
        return this.http.get(`http://localhost:8000/api/user/${id}`, {
            params: {
                page
            }
        });
    }
}