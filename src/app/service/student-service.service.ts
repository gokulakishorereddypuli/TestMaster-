import { Injectable,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService
{
  ipAddress:any;
  users: Observable<any[]>;
  constructor(private db: AngularFireDatabase,private http : HttpClient)
  {
    this.users = db.list('users').snapshotChanges();
  }
  OnInit()
  {
    this.getIPAddress();
  }

  public getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
  registerStudent(res:any)
  {
    const itemRef = this.db.object('users')
    itemRef.set(
      { name :{
        email: res.user?.email,
        name:res.user?.displayName,
        uid:res.user?.uid,
        ip:"Ip Address :".concat(this.ipAddress),
        photo:res.user.photoURL
      }
      }
      );

  }
  checkStudent()
  {
    // const itemRef = this.db.object('users');


  }


}
function str(ipAddress: any) {
  throw new Error('Function not implemented.');
}

