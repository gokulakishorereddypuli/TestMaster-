import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService
{


  constructor(
    private db: AngularFireDatabase,
    private http : HttpClient,
    items: Observable<any[]>
    )
  {

  }

  registerStudent(res:any)
  {
    const itemRef = this.db.object('users');
    itemRef.set(
      {
        email: res.user?.email,
        uid:res.user?.uid,
        name:res.user?.name
      });
    return ;
  }
  checkStudent()
  {
    const itemRef = this.db.object('users');


  }


}
