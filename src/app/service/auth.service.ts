import { Injectable } from '@angular/core';
//import{ ILogin} from 'src/app/interfaces/login';
//import { Login } from '../interfaces/login';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { GoogleAuthProvider } from 'firebase/auth';
import { StudentServiceService } from './student-service.service';
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

    }
    public googleSignUpSignIn()
    {
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
      }, err=>{
        this.route.navigate(['']);
      })

      return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
        //alert(res);
        //this.route.navigate(['/welcome']);
        console.log(res);
        this.stu_ser.registerStudent(res);
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('token',JSON.stringify(res.user?.email));
        //localStorage.setItem('token',JSON.stringify(res.user?.uid));
        this.route.navigate(['/student-dashboard']);
      },err => {
        alert(err.message);
      })
    }

    public logout()
    {
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        this.route.navigate(['']);
      }, err=>{
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
