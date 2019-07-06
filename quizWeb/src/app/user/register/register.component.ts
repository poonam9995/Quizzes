import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService, private modalService: BsModalService,private toastr: ToastrService,private route: ActivatedRoute, private router: Router) { }
id;
resetPassword:FormGroup;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

   console.log(this.id);
    this.resetPassword = new FormGroup({
        
     password: new FormControl('',Validators.required),
      cpassword: new FormControl('',Validators.required),
    });
  }

  onSubmit(){
    console.log(this.resetPassword.value);
    if(this.resetPassword.value.password === this.resetPassword.value.cpassword){
      console.log(this.resetPassword.value);
      this.userService.resetPassword(this.resetPassword.value,this.id).subscribe((res) => {
        if (res == null) {         
          this.router.navigate(['/login']);
        }
        else
        {
            this.router.navigate(['/login']);
        }
      });  
       
     }
    else{
      this.toastr.error('Password And Confirm Password Dose not Math', 'Renter Passworsd..', {
        timeOut: 3000
      });
      this.router.navigate(['/login']);
    }
  
}
}
