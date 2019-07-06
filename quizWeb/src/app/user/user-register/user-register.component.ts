import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { commonValidation } from '../common/validation/common.validation';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers:[UserService]
})
export class UserRegisterComponent implements OnInit {
  RegistrationUser: FormGroup;

  constructor(private UserService :UserService,private toastr: ToastrService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.RegistrationUser = new FormGroup({           
      Name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      mobile: new FormControl(null, Validators.pattern(/^[7-9]\d{9}$/)),
      password: new FormControl(null),
      cpassword: new FormControl(null,commonValidation.checkPassword),
    });
  }

  onSubmit(){
    console.log(this.RegistrationUser.value);
    this.UserService.registerUser(this.RegistrationUser.value).subscribe((res)=>{
      if (res === null) {
        this.toastr.error('error', 'User Registration Failed');
        this.router.navigate(['/login']);
      }
      else {
       
        console.log(res);
      this.toastr.success(' Successfully', 'User Register SuccessFully.');
       this.router.navigate(['/login']);
      }
    }

    );
  }

}
