import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/login';
import { AuthService } from '../service/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 // template:'<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <title>Angular5</title> <base href="/"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="icon" type="image/x-icon" href="favicon.ico"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> </head> <body> <div class="row"> <div class="col s6 offset-s3"> <div class="card"> <div class="col s6"> <h2>Quiz Login</h2> </div> <div class="col s6"> <img src="/assets/img/logo.png" style="width:250px;height:250px;" class="offset-s3"> </div> <div class="card-content"> <form #registerForm="ngForm" (ngSubmit)="OnSubmit(Email.value,Password.value)"> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">mail_outline</i> <input type="email" name="Email" #Email ngModel required [pattern]="emailPattern"> <label>Email</label> </div> </div> <div class="row"> <div class="input-field col s12"> <i class="material-icons prefix">lock_outline</i> <input type="password" name="Password" #Password ngModel required> <label>Password</label> </div> </div> <div class="row"> <div class="input-field col s12"> <button class="btn-large btn-submit" type="submit" [disabled]="!registerForm.valid">Login</button> </div> </div> <div class="row"> <div class="input-field col s12"> <a href="/register"><u><b>Sign Up</b></u></a> </div> </div> </form> </div> </div> </div> </div> </body> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script> </html>',
  styleUrls: ['./login.component.css']

})
export class LoginComponent
{
  public route:string;
  constructor(private router:Router,private signin:AuthService)
  {
    this.route=this.router.url;
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  OnSubmit(email:string,password:string)
  {
    alert("ok");
      // this.quizService.insertParticipant(name,email).subscribe(
      //       (data:any)=>{
      //         localStorage.clear();
      //         localStorage.setItem('participant',JSON.stringify(data));
      //         this.route.navigate(['/quiz']);
      //       }
      // );

      //this.signin.registerUser(name,email);
      this.signin.loginUser(email,password);
  }

}
