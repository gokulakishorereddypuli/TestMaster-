import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class StudentContestReportsService {

  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  todos$: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {

    this.studentsRef=this.db.list('students-reports');
    this.studentRef=this.db.object('students-reports/');
    this.todos$=this.db.list('students-reports/');

    //topusers: FirebaseListObservable<any>;
  }
  submitStudentContestReport(stuId:any,quizId:any,correctAns:number,incorrecAns:number,points:number)
  {


    // this.todos$ = this.db.list('students-reports/', (ref: any) =>

    //       ref.orderByChild="uid"
    //       ref.equalsTo="2377"

    //   );

      // this.todos$=this.db.list('students-reports/', ref =>
      // ref.orderByChild('stuId').equalTo(stuId)
      // );
      // console.log(this.todos$);

    this.studentsRef.push({
       stuId:stuId,
       quizId:quizId,
       correctAns:correctAns,
       incorrecAns:incorrecAns,
       points:points
    });
  }
}
