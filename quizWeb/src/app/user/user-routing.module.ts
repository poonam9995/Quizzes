import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const routes: Routes = [
  {path:'login',component:UserLoginComponent},
  {path:'registration',component:UserRegisterComponent},
  {path:'home',component:UserComponent,canActivate:[AuthGuard]},
  {path :'resetPassword/:id',component:RegisterComponent},
  {path:'quiz/:id',component:QuizComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
