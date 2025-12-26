import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegService } from '../../services/reg-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder,
    private regService: RegService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      activeFlag: ['Y', Validators.required],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      try {
        const response = await this.regService.registration(this.registerForm.value);

        if (response.responseCode === 1) {



          this.router.navigate(['/login']);
        } else {
          alert('Invalid username or password')
        }

      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      }
    }

  }
}


