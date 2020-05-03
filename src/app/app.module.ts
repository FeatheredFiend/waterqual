import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { DashboardComponent } from './pages/dashboard';
import { RegisterComponent } from './pages/register';
import { AssetsComponent, AddAssetsComponent, EditAssetsComponent, ViewAssetsComponent } from './pages/assets/assets';
import { ProfileComponent } from './pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatFormFieldModule
} from "@angular/material";
import {MatTabsModule} from '@angular/material/tabs';
 

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ViewAssetsComponent,
    AddAssetsComponent,
    EditAssetsComponent,
    AssetsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
