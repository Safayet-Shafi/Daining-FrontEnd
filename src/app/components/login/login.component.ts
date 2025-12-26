import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
       rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.onLogin();

    // this.authService.login(this.loginForm.value).subscribe({
    //   next: (token: string) => {
    //     this.authService.saveToken(token);
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: err => {
    //     this.errorMessage = 'Login failed';
    //   }
    // });

  }


  //   async onLogin() {
  //   try {
  //     const token = await this.authService.login(this.loginForm.value);
  //     this.authService.saveToken(token);
  //     this.router.navigate(['/dashboard']);
  //   } catch (error) {
  //     this.errorMessage = 'Login failed';
  //   }
  // }

 async onLogin() {
  try {
    const response = await this.authService.login(this.loginForm.value);

    if (response.responseCode === 1) {

      const rememberMe = this.loginForm.value.rememberMe;

      this.authService.saveToken(response.token, rememberMe);

      sessionStorage.setItem('username', response.username);

      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password')
    }

  } catch (error) {
    this.errorMessage = 'Invalid username or password';
  }
}

}

