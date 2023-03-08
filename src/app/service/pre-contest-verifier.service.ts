import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PreContestVerifierService
{
  public is_quiz_eligible=false;
  private item: AngularFireObject<any>;
  constructor(private db:AngularFireDatabase)
  {
    this.item=this.db.object('questions');
  }
  getVerifyContest(quizId:any)
  {
     var key:any;
        this.item = this.db.object('quiz/'+quizId);
        this.item.snapshotChanges().subscribe(action => {

            console.log(action.type);
            console.log(action.key);
            console.log(action.payload.val());
            key=action.key;
            console.log("Key -------------------- "+key);
          if(""+key==quizId)
          {
            this.is_quiz_eligible=true;
            console.log("QUiz exists"+this.is_quiz_eligible);
          }
          else{
            this.is_quiz_eligible=false;
            console.log("QUiz does not  exists");
            console.log("question service "+this.is_quiz_eligible);
          }
     });

  }


}
