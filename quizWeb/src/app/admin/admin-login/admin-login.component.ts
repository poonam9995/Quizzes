import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

 import { AdminService } from '../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  login: FormGroup;

  constructor(private AdminService:AdminService,private toastr: ToastrService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.login = new FormGroup({
      admin_Id: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      password: new FormControl(''),
     
    });
  }
  onSubmit(){
    
    this.AdminService.loginAdmin(this.login.value).subscribe((res : any) => {
      console.log(res.message);
      if (res === null) {
        this.toastr.error('Loging Failed', 'Renter AdminId and  Password..');
        this.router.navigate(['/']);
      }
      else {
        console.log(res.message);
        if(res.message === "Auth Success")
        {
          this.toastr.success(' Successfully', 'Login Succesfully.');
          this.router.navigate(['/add']);
        }
        else{       
        
          this.toastr.error(res.message, 'Renter Filed..');
          this.router.navigate(['/']);
        }
      }
    });     
   }
}
