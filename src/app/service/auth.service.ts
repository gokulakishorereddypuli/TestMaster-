import { Injectable } from '@angular/core';
//import{ ILogin} from 'src/app/interfaces/login';
//import { Login } from '../interfaces/login';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private fireAuth:AngularFireAuth,private route:Router, private db: AngularFireDatabase,private http : HttpClient) { }



 // const result = randomString.generate(40);

  registerUser(email:string,password:string)
  {
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert("Registration Successful");
      localStorage.setItem('token','true');
      this.route.navigate(['/quiz']);
    },err=>{
      alert(err.message);
      this.route.navigate(['/register']);
    }
    )
  }
  loginUser(email:string,password:string)
  {
    //alert("sing ok");
    this.fireAuth.signInWithEmailAndPassword(email,password).then(()=>{
      const itemRef = this.db.object('users');
      itemRef.set({email: email,password:password});
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('token',email);
      this.route.navigate(['/question'])

    },err=>{
      alert("Something Went Wrong");
      this.route.navigate(['/register']);
    }
    )
  }

  logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.route.navigate(['/']);
    }, err=>{
      alert(err.message);
    })
  }
  // constructor() { }
  // logout():void{
  //   localStorage.setItem('isLoggedIn','false');
  //   localStorage.removeItem('token');
  // }


}
