
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login';
import { HomeComponent } from './pages/home';
import { RegisterComponent } from './pages/register';
import { ProfileComponent } from './pages/profile';
import { DashboardComponent } from './pages/dashboard';
import { AssetsComponent } from './pages/assets';



import { AuthguardGuard } from './_guards/authguard.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthguardGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
    { path: 'assets', component: AssetsComponent, canActivate: [AuthguardGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard] },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }