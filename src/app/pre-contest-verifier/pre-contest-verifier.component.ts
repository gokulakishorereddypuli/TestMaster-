import { Component, Host, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreContestVerifierService } from '../service/pre-contest-verifier.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pre-contest-verifier',
  templateUrl: './pre-contest-verifier.component.html',
  styleUrls: ['./pre-contest-verifier.component.css']
})
export class PreContestVerifierComponent implements OnInit
{

  quizId:any;
  quizType:any;
  is_quiz_eligible=false;
  constructor(
    private route:ActivatedRoute,
    private pre_contest_ser:PreContestVerifierService,
    private routeRedirect:Router
  )
  {

  }
  ngOnInit()
  {
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params);
        this.quizId=params.quizId,
        this.quizType=params.quizType
      }
    );
    this.pre_contest_ser.getVerifyContest(this.quizId);
    //console.log("PreContestVerifierComponent ===========");
    //console.log(this.quizId);
    //console.log(this.quizType);

  }
  verifyIdentity()
  {
    //console.log("verifyIdentity"+this.pre_contest_ser.is_quiz_eligible)
    //console.log("=========== true/false "+this.pre_contest_ser.is_quiz_eligible);
    if(this.pre_contest_ser.is_quiz_eligible)
    {
      this.is_quiz_eligible=true;
    }
  }
  takeTest()
  {
    if(this.is_quiz_eligible)
    {
      this.routeRedirect.navigate(['/assessment-for-students-certification-internships-from-easyinternships.in'], {
        queryParams: { quizId: this.quizId,quizType :this.quizType},
      });
    }

  }

}
