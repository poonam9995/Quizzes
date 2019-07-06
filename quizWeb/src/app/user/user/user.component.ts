import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { commonValidation } from '../common/validation/common.validation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  quizzes;
  quiz;
  changePass:FormGroup;
  modalRef: BsModalRef;
  question1=null;
  questionForm: FormGroup;
  result;
  constructor(private toastr: ToastrService,private userService:UserService,private modalService: BsModalService, private router:Router) { }

  ngOnInit() {
   
     this.questionForm= new FormGroup({
      question :new FormControl(),
       answer :new FormControl('',Validators.required)
     });
     this.userService.getQuizeName().subscribe((res: any) => {
      this.quizzes=res; 
     console.log(this.quizzes);
     });
    this.userService.getUserResult().subscribe((res: any) => {
      res[0].Quiz.splice(0, 1);
      this.result=res[0].Quiz; 
     console.log(this.result);
     
     
    });
    
  }

  refresh(){
    this.changePass.controls['password'] = null;
    this.changePass.controls['cpassword'] = null;
  }

  openModal(template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


//   getQuestion(quiz){

// console.log(quiz);
// for(var i =0 ; i<this.quizzes.length; i++){
// if(this.quizzes[i].title == quiz)
// {
//  this.question1 = this.quizzes[i];
//   console.log(this.question1)
//  }
// // console.log(this.question1.Question);
// // this.questionForm.patchValue({
// //  question : this.question1.Question
// // });

// }


// console.log(quiz);
// this.userService.getQuestionName(quiz).subscribe((res: any) => {   
//    console.log(res);
//  });
//  }


}
