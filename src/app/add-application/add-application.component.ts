import { Component } from '@angular/core';
import { Application } from '../application';  // Ensure Application interface is properly imported
import { LauncherService } from '../launcher.service';  // Ensure service is available for adding apps
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-application',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent {
  newApp: Application = { applicationName: '', applicationPath: '', parameters: '' };
  isSuccess: boolean = false; // For success message
center: any;
  
  constructor(private launcherService: LauncherService, private router: Router) {}

  addApp() {
    if (!this.newApp.applicationName || !this.newApp.applicationPath) {
      return; // Prevent submission if required fields are not filled
    }
    
    this.launcherService.addApplication(this.newApp).subscribe({
      next: () => {
        this.isSuccess = true;  // Show success message
        this.newApp = { applicationName: '', applicationPath: '', parameters: '' }; // Clear the form
        setTimeout(() => {
          this.router.navigate(['/applications']); // Navigate to the applications list
        }, 1500); // Delay for showing success message before navigating
      },
      error: (error) => {
        this.isSuccess = false;  // Hide success message if there's an error
        if (error.status === 400) {
          alert('An application with the same name already exists.');
        } else {
          console.error('Error adding application:', error);
          alert('An error occurred while adding the application.');
        }
      }
    });
  }
}
