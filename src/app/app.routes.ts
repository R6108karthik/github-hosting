import { Routes } from '@angular/router';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { AddApplicationComponent } from './add-application/add-application.component';

export const routes: Routes = [
    {path:'',redirectTo:'applications',pathMatch:'full'},
    {path:'applications',component:ListApplicationsComponent},
    {path:'add',component:AddApplicationComponent},
    {path:'**',redirectTo:'applications'}
];
