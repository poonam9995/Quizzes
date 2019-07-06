import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly baseURL = "http://localhost:4000/admin";
  constructor(private http:HttpClient) { }
  
  addQuize(data){
    return this.http.post(this.baseURL+'/quiz',data);
  }
  loginAdmin(data){
   return this.http.post(this.baseURL+'/admin',data);
  }
}
