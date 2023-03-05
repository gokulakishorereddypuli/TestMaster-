import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public ipAddress:String="";
  constructor(private loginRegister:AuthService,public http:HttpClient) { }

  ngOnInit(): void {
    this.getIPAddress();
  }
  // startQuiz(){
  //   localStorage.setItem("name",this.nameKey.nativeElement.value);
  // }
  UserLoginRegister()
  {
    this.loginRegister.googleSignUpSignIn();
  }
  getIPAddress()
  {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress =res.ip;
      //alert(this.ipAddress);
    });
  }

}
