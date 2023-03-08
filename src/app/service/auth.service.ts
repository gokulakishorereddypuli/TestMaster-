import { Injectable } from '@angular/core';
//import{ ILogin} from 'src/app/interfaces/login';
//import { Login } from '../interfaces/login';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { GoogleAuthProvider } from 'firebase/auth';
import { StudentServiceService } from './student-service.service';
import { NonNullAssert } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rea:any;
  constructor(
    private fireAuth:AngularFireAuth,
    private route:Router,
     private db: AngularFireDatabase,
     private http : HttpClient,
     private stu_ser:StudentServiceService
     )
    {
      //this.stu_ser=new StudentServiceService()
    }
    public googleSignUpSignIn()
    {
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
      }, (_err: any)=>{
        this.route.navigate(['']);
      })

      return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
        //alert(res);
        //this.route.navigate(['/welcome']);
        //console.log(res);
        try
        {
          var x:any=res.user?.uid;
          this.stu_ser.registerStudent(res);
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('token',x);
          //localStorage.setItem('token',JSON.stringify(res.user?.uid));
          this.route.navigate(['/student-dashboard']);
        }
        catch(exception : any)
        {
            this.route.navigate(['']);
            alert("!!! Something went wrong !!!"+exception);
            console.log(exception);
        }
      },(err: { message: any; }) => {
        alert(err.message);
      })
    }

    public logout()
    {
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        //this.stu_ser=null;
        //this.stu_ser.deleteLogs();
        this.route.navigate(['']);
      }, (err: { message: any; })=>{
        alert(err.message);
      })
    }





  // registerUser(email:string,password:string)
  // {
  //   this.fireAuth.createUserWithEmailAndPassword(email,password).then(()=>{
  //     alert("Registration Successful");
  //     localStorage.setItem('token','true');
  //     this.route.navigate(['/quiz']);
  //   },err=>{
  //     alert(err.message);
  //     this.route.navigate(['/register']);
  //   }
  //   )
  // }
  // loginUser(email:string,password:string)
  // {
  //   //alert("sing ok");
  //   this.fireAuth.signInWithEmailAndPassword(email,password).then(()=>{
  //     const itemRef = this.db.object('users');
  //     itemRef.set({email: email,password:password});
  //     localStorage.setItem('isLoggedIn','true');
  //     localStorage.setItem('token',email);
  //     this.route.navigate(['/question'])

  //   },err=>{
  //     alert("Something Went Wrong");
  //     this.route.navigate(['/register']);
  //   }
  //   )
  // }


  // constructor() { }
  // logout():void{
  //   localStorage.setItem('isLoggedIn','false');
  //   localStorage.removeItem('token');
  // }

//   ngOnInit() {
//     this.getIPAddress();
// }
  // getIPAddress()
  // {
  //   this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
  //     this.ipAddress = res.ip;
  //   });
  // }

}
