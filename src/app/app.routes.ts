import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserComponent } from './user/user.component';
import { PostProductComponent } from './post-product/post-product.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'post-product', component: PostProductComponent, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductPageComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];