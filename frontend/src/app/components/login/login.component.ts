import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Clear previous error message
    this.errorMessage = '';
    
    // Simulated login logic — replace with actual auth service
    if (this.email === 'test@example.com' && this.password === 'password') {
      this.router.navigate(['/photos']);
    } else {
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  }
}