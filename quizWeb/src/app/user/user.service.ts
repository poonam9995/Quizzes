import { Injectable } from '@angular/core';

import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = "http://localhost:4000/user";
  readonly baseQuziURL = "http://localhost:4000/quiz";
  constructor(private http:HttpClient,private router:Router) { }

 registerUser(data){
   return this.http.post(this.baseURL+'/register',data);
 }

 resetPassword(password,id){
  return this.http.put(this.baseURL+"/resetPassword"+`/${id}`,password );
}
 forgetPassword(email){
  
  return this.http.post(this.baseURL+"/forgetPass" , email);
 }
 loginuser(login){
  return this.http.post(this.baseURL+'/login' , login);
}
getQuizeName(){
  return this.http.get(this.baseQuziURL+'/quizzesName');
}
displayQuizeName(){
  return this.http.get(this.baseQuziURL+'/quizzesName1');
}
getQuestionName(id){
console.log(id);
  return this.http.get(this.baseQuziURL+'/questionName/'+id);
}
changePassword(data){
return this.http.put(this.baseURL+'/changePassword',data);
}

getUserResult(){
  return this.http.get(this.baseQuziURL+'/userResult');
}
sendResult(data){
  console.log(data);
  return this.http.put(this.baseQuziURL+'/sendQueziResult',data);
}
DisplayUserResult(quiz){
  console.log(quiz);
  return this.http.get(this.baseQuziURL+'/getUser/'+quiz);
}
deleteQuiz(data , id){
  return this.http.delete(this.baseQuziURL+'/DeleteQuiz/'+id,data);
}

loggedIn(){
  return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}
