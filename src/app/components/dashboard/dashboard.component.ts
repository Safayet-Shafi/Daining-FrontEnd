import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  mealForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const today = new Date().toISOString().substring(0, 10);

    this.mealForm = this.fb.group({
      mealDate: [today],
      breakfast: [0],
      lunch: [0],
      dinner: [0]
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // When checkbox changes → convert true/false to 1/0
  onMealChange(event: any, controlName: string) {
    this.mealForm.get(controlName)?.setValue(event.target.checked ? 1 : 0);
  }

  submitMeal() {
    console.log(this.mealForm.value);

    // TODO: call API here
  }
}
