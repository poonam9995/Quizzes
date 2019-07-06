import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-update-quizzes',
  templateUrl: './update-quizzes.component.html',
  styleUrls: ['./update-quizzes.component.css']
})
export class UpdateQuizzesComponent implements OnInit {
  quizResult: FormGroup;
  quizzeslist: any;
  id;
  constructor(private userService:UserService) { }
  quizzes;
  ngOnInit() {
    this.userService.displayQuizeName().subscribe((res: any) => {
      this.quizzes=res; 
     console.log(this.quizzes);
     });
     this.quizResult=new FormGroup({
       quiz:new FormControl('',Validators.required)
     });
  }

  onSubmit(){
    console.log(this.quizResult.value.quiz);
    console.log(this.quizzes);
   for(var i =0;i<this.quizzes.length;i++)
   {
    if(this.quizzes[i]._id == this.quizResult.value.quiz){
      console.log(this.quizzes[i]);
       this.id=this.quizzes[i]._id;
       console.log(this.id);
      this.quizzeslist = this.quizzes[i].Question;
      console.log(this.quizzeslist);
    }
   }
  }
  Delete(quiz){
    console.log(quiz,this.id);
    this.userService.deleteQuiz(quiz,this.id).subscribe((res:any)=>{
  console.log(res);
    });
  }
}
