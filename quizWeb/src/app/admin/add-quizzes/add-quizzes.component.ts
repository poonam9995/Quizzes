import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl, FormControlName } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {
  items;

  constructor(private toastr:ToastrService,private adminService: AdminService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
  addQuiz: FormGroup;
  ngOnInit() {
    this.addQuiz = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      Question: new FormArray([this.createItem()])
    });
  }


  createItem(): FormGroup {
    return this.formBuilder.group({
      question: new FormControl(''),
      option: new FormArray([this.createOption()]),
      correctAns: new FormControl('')
    });
  }
  createOption(): FormGroup {
    return this.formBuilder.group({
      option1: new FormControl(''),
    });
  }
  // divs: number[] = [];

  // createDiv(): void {
  //   this.divs.push(this.divs.length);
  // }
  addgroupClick(): void {
    (<FormArray>this.addQuiz.get('Question')).push(this.createItem());
  }
  addOPtionGroupClick(i): void {
    // this.addQuiz.get('Question').controls[i].get('option').controls[j].get('options');
    //reviewForm.controls.controlArray.controls[i].controls.DATAYOULIKEBIND.value
    var temp = (<FormArray>this.addQuiz.get('Question'));

    (<FormArray>temp.controls[i].get('option')).push(this.createOption());
  }

  onSubmit() {
    console.log(this.addQuiz.value);
    this.adminService.addQuize(this.addQuiz.value).subscribe((res: any) => {
      if (res === null) {
        this.toastr.error('error', 'Quize Not insert SuccessFully');
        this.router.navigate(['/']);
      }
      else {
       
        console.log(res);
      this.toastr.success(' Successfully', 'Quize inserted SuccessFully.');
       this.router.navigate(['/add']);
      }
      

    });
  }
}
