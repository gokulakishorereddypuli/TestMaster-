import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // constructor(private http : HttpClient) { }
  // getQuestionJson(){
  //   return this.http.get<any>("assets/questions.json");
  // }
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase,private http : HttpClient)
  {
    this.items = db.list('questions').valueChanges();
    // return this.items;
  }
  getQuestionJson(){
    //   return this.http.get<any>("assets/questions.json");
    //this.items = db.list('questions').valueChanges();
    return this.items;
    //console.log("======================================="+this.items);
    return this.http.get<any>("assets/questions.json");
    //return this.items;
 }
}
