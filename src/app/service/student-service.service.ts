import { Injectable,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class StudentServiceService
{
  ipAddress:any;
  users: AngularFireObject<any>;
  public stuEmail:any;
  public stuName:any;
  public stuPhoto:any;
  public stuId:any;
  public stuIp:any;
  private id:any;
  private res:any;
  constructor(private db: AngularFireDatabase,private http : HttpClient)
  {
    this.id=localStorage.getItem('token');
    //this.items = this.db.list('users/'+this.id).valueChanges();
    this.users = this.db.object('users/');
    this.users.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      this.stuEmail=action.payload.val()[this.id]['email'];
      this.stuIp=action.payload.val()[this.id]['ip'];
      this.stuName=action.payload.val()[this.id]['name'];
      this.stuPhoto=action.payload.val()[this.id]['photo'];
      this.stuId=action.payload.val()[this.id]['uid'];
    });

  }
  OnInit()
  {
    this.getIPAddress();
    //this.getUserDetailsFromDB();
  }

  public getIPAddress()
  {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
  private getUserDetailsFromDB()
  {
    // this.users.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key);
    //   console.log(action.payload.val()[this.id]['email']);
    //   this.stuEmail=action.payload.val()[this.id]['email'];
    //   this.stuIp=action.payload.val()[this.id]['ip'];
    //   this.stuName=action.payload.val()[this.id]['name'];
    //   this.stuPhoto=action.payload.val()[this.id]['photo'];
    //   this.stuId=action.payload.val()[this.id]['uid'];
    // });


  }
  // getUsersDetails()
  // {
  //   var user:User[];
  //   this.getUserDetailsFromDB().then(value=>{
  //     user=value as User[];
  //   });
  // }
  // getUserDetailsFromDB()
  // {
  //   // return new Promise((resolve,reject)=>{
  //   //   this.db.list('users'+localStorage.getItem('token')).valueChanges().subscribe(value=>{
  //   //       resolve(value);
  //   //   });
  //   // });

  //   // return this.db.object(`lessons/${localStorage.getItem('token')}`);
  //   return this.items;
  // }
  getStudentDetails()
  {
    this.getIPAddress();
    this.stuEmail=this.res.user?.email;
    this.stuIp=this.ipAddress;
    this.stuName=this.res.user?.displayName;
    this.stuPhoto=this.res.user.photoURL;
    this.stuId=this.res.user?.uid;

  }
  registerStudent(res:any)
  {
    this.getIPAddress();
    // this.stuEmail=res.user?.email;
    // this.stuIp=this.ipAddress;
    // this.stuName=res.user?.displayName;
    // this.stuPhoto=res.user.photoURL;
    // this.stuId=res.user?.uid;
    this.res=res;
    this.getStudentDetails();
    const tutRef = this.db.object('users/'+res.user?.uid);
    tutRef.set(
      {
        email: res.user?.email,
        name:res.user?.displayName,
        uid:res.user?.uid,
        ip:"".concat(this.ipAddress),
        photo:res.user.photoURL
      }
    );
    //console.log(res);


    // this.itemRef = this.db.object('users');
    // this.users = this.db.list('users').snapshotChanges();
    // //console.log(this.users)
    // this.itemRef.set(
    //   { users :
    //     {
    //     email: res.user?.email,
    //     name:res.user?.displayName,
    //     uid:res.user?.uid,
    //     ip:"Ip Address :".concat(this.ipAddress),
    //     photo:res.user.photoURL
    //   }
    //   }
    //   );

  }
  // checkStudent()
  // {
  //   // const itemRef = this.db.object('users');


  // }


}
function str(ipAddress: any) {
  throw new Error('Function not implemented.');
}

