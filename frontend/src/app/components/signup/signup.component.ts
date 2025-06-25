import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  onSubmit() {
    if (this.formData.password !== this.formData.password_confirmation) {
      alert('Passwords do not match.');
      return;
    }

    // Here you can send `formData` to your API or service
    console.log('Form Submitted:', this.formData);

    // Reset the form or navigate to another page if needed
  }
}
