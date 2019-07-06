import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {
public quizzes;
  constructor(private userService:UserService,private modalService: BsModalService) { }
  quizResult : FormGroup;
  public results;
modalRef: BsModalRef;
questionAnswer=[];
username;
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
    this.userService.DisplayUserResult(this.quizResult.value.quiz).subscribe((res: any) => {
    console.log(res);
    this.results = res;
    });  
  }

  openModal(template: TemplateRef<any>,result) {
       this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    console.log("***************",this.quizzes);
     for(var i =0; i<this.quizzes.length;i++)
     {
       if(this.quizzes[i]._id == result.id){
        console.log('result ',this.quizzes[i].Question[i]);  
        console.log(result.result[i]);
        if(result.result[i] == this.quizzes[i].Question[i])
        {
          console.log('result ',result.result );
        }
               this.username=result;
        this.questionAnswer=this.quizzes[i].Question;
       }
      
     }
  }
}
