// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '**', redirectTo: 'login' }
// ];


import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Protected route
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'login' }
];
