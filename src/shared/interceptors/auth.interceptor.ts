import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if(token) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
    }
    return next(req);
}