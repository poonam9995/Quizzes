import { Component, OnInit, TemplateRef } from '@angular/core';

import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { commonValidation } from '../common/validation/common.validation';
@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  changePass: FormGroup;

  constructor(private toastr: ToastrService,private userService:UserService,private modalService: BsModalService, private router:Router) { }
  modalRef: BsModalRef;
  ngOnInit() {
    this.changePass = new FormGroup({        
      password: new FormControl('',Validators.required),
       cpassword: new FormControl('',[Validators.required,commonValidation.checkPassword]),
     });
  }

  openModal(template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  close(): void {
    this.modalRef.hide();    
    this.router.navigate(['/home']);
   }
   onSubmit(){
     console.log(this.changePass.value);
     this.userService.changePassword(this.changePass.value).subscribe((res: any) => {   
      if (res === null) {
        this.toastr.error('error', 'Password Changed Failed');
        
        this.router.navigate(['/home']);
      }
      else {
      this.toastr.success(' Successfully', 'Password Change Successfully.');
   
       this.router.navigate(['/home']);
     
    }
     });
     this.modalRef.hide();
   }
}
