import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  id;
  public aswerArr = [];
  show = true;
  public respons;
  public question;
  public title;
  public queId;
  questionForm: FormGroup;
  public queNo = 0;
  public countAns = 0;
  public attendQue = 0;
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    //  console.log(this.id);
    this.questionForm = new FormGroup({
      id: new FormControl(''),
     
      answer: new FormControl('', Validators.required)
    });

    this.userService.getQuestionName(this.id).subscribe((res: any) => {
      // console.log(res);
      this.respons = res[0];
      //console.log(this.respons);
      this.title = this.respons.title;
      this.question = this.respons.Question[0];
      // console.log(this.question);
      this.questionForm.patchValue({
        'id': 0,
       
        'option': this.question,
      });
      this.startTimer();
    });


  }

  onSubmit() {
    console.log(this.questionForm.value.id);
    if (this.questionForm.value.id < this.respons.Question.length) {
     console.log(this.questionForm.value);
      this.question = this.respons.Question[this.questionForm.value.id];
    //  console.log(this.questionForm.value.answer, this.question.correctAns);
      if (this.questionForm.value.answer == this.question.correctAns) {

        this.aswerArr.push(this.questionForm.value.answer);
        this.countAns++;
      //  console.log(this.countAns);
      }
      else {
       console.log('incorrect Answer');
        this.aswerArr.push(this.questionForm.value.answer);
      }

     // console.log('*************', this.aswerArr);
      this.queNo = this.questionForm.value.id + 1;


      this.question = this.respons.Question[this.queNo];
      if (this.question !== undefined) {
        this.questionForm.patchValue({
          'id': this.queNo,
         
          'answer':false
        });
        
      }
      else{
        console.log("*****************");
        this.final();
      }
      this.attendQue++;
    }
  
  }
  final(){
    this.timeLeft=0;
    console.log("??????????/", this.aswerArr.length)
    var attend =  this.aswerArr.length;
    var j = this.respons.Question.length - this.aswerArr.length;
    console.log('************',j);
    for (var i = 0; i < j; i++) {
      this.aswerArr.push("0");
    }
    console.log(this.attendQue);
    var queResult = {
      id: this.respons._id,
      result:this.aswerArr,
      markes: this.countAns,
      attended:attend
      }
 console.log(queResult);
 this.userService.sendResult(queResult).subscribe((res: any) => {
if(res){
  console.log(res);
}
  
 });
   console.log(this.respons, '*************', this.aswerArr);
    this.question = false;
  }

  timeLeft: number = 60;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } 
        if(this.timeLeft == 1)
        {
          this.final(); 
         return ;      
        } 
        if(this.timeLeft == 0){
         return ;
        }
      
      console.log(this.timeLeft);
    },1000)

    console.log("*****" ,this.interval);
  }

  //Pause Timer 
  //pauseTimer() {
  //   clearInterval(this.interval);
  // }
}
