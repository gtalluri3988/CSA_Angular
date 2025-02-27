import { RouterModule,Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AuthGuard } from './Shared/AuthGuard/auth.guard';
import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { CommunityComponent } from './Pages/community/community-list/community-list.component';
import { AddCommunityComponent } from './Pages/community/add-community/add-community.component';



export const routes: Routes = [

    // { path: 'login', component: LoginComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //Make sure this route exists
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //Make sure this route exists
    // { path: '', redirectTo: 'login', pathMatch: 'full' },  // Default redirect
    // { path: '**', redirectTo: 'login' }  // Handle unknown routes

    {path: '',
    component: LayoutComponent,canActivate: [AuthGuard], 
    children: [
     
      { path: 'dashboard', component: DashboardComponent },
      { path: 'community', component: CommunityComponent },
      { path: 'addcommunity', component: AddCommunityComponent },
    ]
    }


];
