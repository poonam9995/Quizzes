import { Component } from '@angular/core';
import { AdminService } from './admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizWeb';
  constructor(private adminService:AdminService){}
}
