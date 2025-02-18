import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}')]), // regex for 6 chars,  1 uppercase, 1 lowercase, 1 num and 1 symbol
    password_confirmation: new FormControl('', [Validators.required])
  });
  registerErrors: Array<String> = [];

  constructor(private authService: AuthService, private router: Router) {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: response =>{
        console.log('register', response);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log('error', err);
        for (let errorKey in err.error.errors) {
          console.log('error key', errorKey);
          this.registerErrors.push(err.error.errors[errorKey][0]);
        }
      }
    })
  }
}
