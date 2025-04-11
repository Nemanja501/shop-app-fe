import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorComponent } from "../../shared/components/error/error.component";
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorComponent, RouterLink, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  loginError: Array<String> = [];
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('login res', response);
        this.isLoading = false;
        localStorage.setItem('userId', JSON.stringify(response.userId));
        localStorage.setItem('token', response.token)
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log('login err', err);
        this.isLoading = false;
        this.loginError.push(err.error.error);
      }
    });
  }
}