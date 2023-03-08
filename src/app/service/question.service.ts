import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireObject } from '@angular/fire/compat/database';
import { QuestionComponent } from '../question/question.component';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // constructor(private http : HttpClient) { }
  // getQuestionJson(){
  //   return this.http.get<any>("assets/questions.json");
  // }
  items: Observable<any[]>;
  item: AngularFireObject<any>;
  quizlist:Observable<any[]>;
  public is_quiz_available=false;
  constructor(private db: AngularFireDatabase,private http : HttpClient)
  {

    this.is_quiz_available=false;
    this.items = db.list('questions').valueChanges();
    this.quizlist=db.list('quizTable').valueChanges();
    //console.log(this.items);
    this.item = this.db.object('quiz/');

    this.item.snapshotChanges().subscribe(action => {
      //console.log(action.type);
      //console.log(action.key);
      //console.log(action.payload.val()["TypeScript_abcZdsff"]);
    });
    // return this.items;
    this.getQuizList()
  }
  getQuestionJson(quizId:any){
    //   return this.http.get<any>("assets/questions.json");
    //this.items = db.list('questions').valueChanges();
    this.items = this.db.list('quiz/'+quizId).valueChanges();
    return this.items;
    //console.log("======================================="+this.items);
    return this.http.get<any>("assets/questions.json");
    //return this.items;
 }

  getQuizList()
  {
    return this.quizlist;
  }
  getSortList()
  {
    // this.topusers = this.db.list('users',{
    //   query: {
    //    orderByChild: "uid"
    //   }
   // });

   this.db.list('/users', ref =>
    ref.orderByChild('uid').equalTo('Aw9BNiAcNlcoUX8jDwXA1ssrIzQ2'))
    .valueChanges()
    .subscribe(categoryItems => {
      //this.items=categoryItems[0];
      console.log(categoryItems[0]);
      console.log("-----------------------");
    });
   }

}
