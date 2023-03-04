import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private route :Router,private register:AuthService){}
  OnSubmit(name:string,email:string)
  {
      // this.quizService.insertParticipant(name,email).subscribe(
      //       (data:any)=>{
      //         localStorage.clear();
      //         localStorage.setItem('participant',JSON.stringify(data));
      //         this.route.navigate(['/quiz']);
      //       }
      // );

      this.register.registerUser(name,email);
  }
  SignInWithGoogle()
  {
    this.register.googleSignIn();
  }
  logout()
  {
    this.register.logout();
  }

}
