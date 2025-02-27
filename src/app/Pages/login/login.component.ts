import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services//AuthService/auth.service';
import { LoginModel } from '@model/login.model';
import { FormsModule } from '@angular/forms';
import { APIResponseModel } from '../../Model/apiresponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

LoginModel
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
 
})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();
  submitted = false;
  apiErrorMessage: string = ''; // ✅ Store API error message
  router=inject(Router)
  auth = inject(AuthService);


  private fb = inject(FormBuilder);  // Using `inject()` for dependency injection

  loginForm: FormGroup = this.fb.group({
    Username: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });


  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    // ✅ Force validation update on all controls
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginModel = this.loginForm.value;

    this.auth.login({ Username: loginData.Username, password: loginData.Password }).subscribe({
      next: (response: any) => {
        if (!response.error && response.data.token) {
          sessionStorage.setItem('jwtToken', response.data.token);
          // this.router.navigate([response.data.redirectTo]);
          this.router.navigateByUrl('/dashboard');
        }
        else{
         
        this.apiErrorMessage = 'Login failed'; 
        this.loginForm.setErrors({ apiError: true }); 
        }
        
      },
      error: (err) => {
        this.apiErrorMessage = err.message;
      }
    });
  }
}
