import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers:[UserService],
})
export class UserLoginComponent implements OnInit {
  login: FormGroup;
  modalRef: BsModalRef;
 
  forgetPass: FormGroup;
  constructor(private userService:UserService, private modalService: BsModalService,private toastr: ToastrService,private route: ActivatedRoute, private router: Router) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  ngOnInit() {
    this.login = new FormGroup({    
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      password: new FormControl(''),     
    });
    this.forgetPass =new FormGroup({
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
     
    });
  }
  onSubmit(){
 console.log(this.login.value);
 this.userService.loginuser(this.login.value).subscribe((res: any)=>{
   console.log(res);
  if (res === null) {
    this.toastr.error('error', 'User Login Failed');
    this.router.navigate(['/login']);
  }
  else {
   if(res.message == 'Auth Successful'){
    console.log(res.token);
    localStorage.setItem('token',res.token);
  this.toastr.success(' Successfully', 'User Login SuccessFully.');
   this.router.navigate(['/home']);
  }
  else{
    this.toastr.error('error', 'User Login Failed');
    this.router.navigate(['/login']);
  }
}
 });
  }
  close(): void {
    this.modalRef.hide();
    this.router.navigate(['/login']);
   }

   onSubmitForget(){
    console.log( this.forgetPass.value);
    this.userService.forgetPassword(this.forgetPass.value).subscribe((res : any) => {
      console.log(res);
     if (res === null) {
      this.toastr.error("Email is not valid",'Enter Valid Email');
      this.modalRef.hide();
      this.modalRef = null;
        this.router.navigate(['/login']);
      }
      else {
        if(res.message == "email transfer Successful"){
        this.toastr.success('email transfer Successful');
        this.modalRef.hide(); 
        this.modalRef = null;
        this.router.navigate(['/login']);
      }else{
        this.toastr.error('Email is not valid','Enter Valid Email');
        this.modalRef.hide();
        this.modalRef = null;
          this.router.navigate(['/login']);
      }

      }
    });
  }
}
