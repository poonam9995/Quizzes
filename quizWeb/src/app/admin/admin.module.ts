import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddQuizzesComponent } from './add-quizzes/add-quizzes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { UpdateQuizzesComponent } from './update-quizzes/update-quizzes.component';
@NgModule({
  declarations: [AddQuizzesComponent, AdminLoginComponent, DisplayResultComponent, DashboardComponent, PageNotFoundComponent, NavbarAdminComponent, UpdateQuizzesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class AdminModule { }
