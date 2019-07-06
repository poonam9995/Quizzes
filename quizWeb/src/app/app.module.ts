import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule ,HTTP_INTERCEPTORS}  from '@angular/common/http';
import { UserModule } from './user/user.module';

import { ModalModule } from 'ngx-bootstrap';
import { AuthGuard } from './user/auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
    timeOut: 10000,
   positionClass: 'toast-top-center',
   preventDuplicates: true, 
 }),
    BrowserAnimationsModule ,
    ModalModule.forRoot()
  ],
  providers: [AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
