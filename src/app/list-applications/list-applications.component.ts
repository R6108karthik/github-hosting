
import { Component, OnInit } from '@angular/core';
import { Application } from '../application';
import { LauncherService } from '../launcher.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-applications',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})
export class ListApplicationsComponent implements OnInit {

  applications:Application[]=[];
  
  constructor(private launcherService:LauncherService) { }
  ngOnInit() {
    this.loadApplications();
  }
  loadApplications() {
   this.launcherService.getApplications().subscribe(data =>{
    this.applications =data;
   });
  }
  launchApp(id?: number){
    if(id){
    this.launcherService.launchApplication(id).subscribe();
    }
  }
  removeApp(id?: number) {
    if (id) {
      this.launcherService.deleteApplication(id).subscribe(() => {
        this.loadApplications();
      });
    }
  }
}