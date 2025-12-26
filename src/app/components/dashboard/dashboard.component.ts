import { Component } from '@angular/core';
import { AuthService } from '../../auth-service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,
      RouterModule,
      CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


   constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();   // removes token
    this.router.navigate(['/login']); 
   
  }
}
