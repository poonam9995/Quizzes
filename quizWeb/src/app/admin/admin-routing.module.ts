import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuizzesComponent } from './add-quizzes/add-quizzes.component';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateQuizzesComponent } from './update-quizzes/update-quizzes.component';

 const routes: Routes = [
  // {path:'**',component:PageNotFoundComponent},
 { path:'',component:DashboardComponent},
  {    path :'admin', component : AdminLoginComponent},
  {    path :'add', component : AddQuizzesComponent},
  {    path :'displayResult',component:DisplayResultComponent},
  {    path :'updateQuiz', component:UpdateQuizzesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
