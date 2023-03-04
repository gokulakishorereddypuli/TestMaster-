import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  //@ViewChild('name') nameKey!: ElementRef;
  constructor(private loginRegister:AuthService) { }

  ngOnInit(): void {
  }
  // startQuiz(){
  //   localStorage.setItem("name",this.nameKey.nativeElement.value);
  // }
  UserLoginRegister()
  {
    this.loginRegister.googleSignUpSignIn();
  }

}
