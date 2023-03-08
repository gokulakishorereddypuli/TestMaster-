//import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { DOCUMENT } from '@angular/common';
import { Component, Host, HostListener, Inject, OnInit } from '@angular/core';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { ActivatedRoute } from '@angular/router';
import { StudentContestReportsService } from '../service/student-contest-reports.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  template:'<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

      private quizId:any;
      private quizType:any;
      name:any;
      public elem:any;
      public isfullscreen:boolean=false;
      public questionList: any = [];
      public currentQuestion: number = 0;
      public points: number = 0;

      sessionTime=0;
      SessionSeconds=60;
      counter = 30;

      clicked=false;
      answeredCount:number=0;
      unansweredCount:number=0;
      correctAnswer: number = 0;
      inCorrectAnswer: number = 0;

      interval$: any;
      sessionInterval$: any;

      progress: string = "0";

      spoofDetected:boolean=false;

      isQuizCompleted : boolean = false;
      isQuizStarted:boolean=false;

      constructor(
        private questionService: QuestionService,
        private route:ActivatedRoute,
        private stu_contest_rep:StudentContestReportsService,
        @Inject(DOCUMENT) private document: any)
        {

        }

      ngOnInit()
      {
        this.elem=this.document.documentElement;
        this.route.queryParams
          .subscribe((params: any) => {
            console.log(params);
            this.quizId=params.quizId,
            this.quizType=params.quizType
          }
        );
      }

      startTest()
      {
        this.getAllQuestions();
        this.startCounter();
        this.sessionCounter();
        this.isQuizStarted=true;
      }
      enterFullScreen()
      {
        if (this.elem.requestFullscreen)
        {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
        this.isfullscreen=true;
        this.spoofDetected=false;
      }
      closeFullScreen()
      {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          /* Firefox */
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          /* IE/Edge */
          this.document.msExitFullscreen();
        }
        this.isfullscreen=false;
      }

      getAllQuestions() {
        this.questionService.getQuestionJson(this.quizId)
          .subscribe(res => {
            this.questionList = res;  //res.questions
            // console.log(this.questionList)
          })
      }


      // answer(currentQno: number, option: any)
      // {

      //   if(option.correct)
      //   {
      //     this.points += 10;
      //     this.correctAnswer++;

      //     setTimeout(() => {
      //       this.currentQuestion++;
      //       this.resetCounter();
      //       this.getProgressPercent();
      //     }, 1000);
      //   }
      //   else {
      //     setTimeout(() => {
      //       this.currentQuestion++;
      //       this.inCorrectAnswer++;
      //       this.resetCounter();
      //       this.getProgressPercent();
      //     }, 1000);
      //     // this.points -= 10;
      //   }
      //   this.answeredCount++;

      //   if(currentQno === this.questionList.length){
      //     this.isQuizCompleted = true;
      //     this.stopCounter();
      //   }
      //   else
      //   {
      //     setTimeout(() => {
      //       this.currentQuestion++;
      //       this.resetCounter();
      //       this.getProgressPercent();
      //     }, 1000);
      //   }
      // }

      answer(currentQno: number, option: any,$event :any)
      {

        //this.clicked=true;
        ($event.target as HTMLButtonElement).disabled = true;
        //console.log(this.clicked)
        if(this.currentQuestion <= this.questionList.length)
        {
            if(option.correct)
            {
              this.points += 10;
              this.correctAnswer++;
            }
            else {
                this.inCorrectAnswer++;
            }
            this.answeredCount++;
            if( this.currentQuestion+1 === this.questionList.length){
              this.isQuizCompleted = true;
              this.stopCounter();
              this.stu_contest_rep.submitStudentContestReport(localStorage.getItem('token'),this.quizId,this.correctAnswer,this.inCorrectAnswer,this.points);
            }
            else
            {
              setTimeout(() => {
                this.currentQuestion++;
                this.clicked=false;
                this.resetCounter();
                this.getProgressPercent();
              }, 1000);
            }
        }
        else{
          this.isQuizCompleted = true;
              this.stopCounter();
        }

      }


      sessionCounter()
      {
        // this.sessionInterval$ = interval(1000)
        //   .subscribe(val => {
        //     this.SessionSeconds--;
        //     if (this.SessionSeconds === 0)
        //     {
        //       if(this.sessionTime==0)
        //       {

        //         this.isQuizCompleted = true;
        //         this.stopSessionCounter();
        //         alert("SessionTimeOut");
        //       }
        //       else{
        //         this.sessionTime--;
        //         this.SessionSeconds=60;

        //       }

        //     }
        //   });
        // setTimeout(() => {
        //   this.sessionInterval$.unsubscribe();
        // }, 600000);
      }

      startCounter()
      {
        this.interval$ = interval(1000)
          .subscribe(val => {
            this.counter--;
            if( this.currentQuestion+1 > this.questionList.length){
              this.isQuizCompleted = true;
              this.stopCounter();
              this.stu_contest_rep.submitStudentContestReport(localStorage.getItem('token'),this.quizId,this.correctAnswer,this.inCorrectAnswer,this.points);
            }
            if (this.counter === 0)
            {
              if( this.currentQuestion+1 === this.questionList.length){
                this.isQuizCompleted = true;
                this.stopCounter();
                this.stu_contest_rep.submitStudentContestReport(localStorage.getItem('token'),this.quizId,this.correctAnswer,this.inCorrectAnswer,this.points);
              }
              else{
                this.currentQuestion++;
                this.counter = 30;
                // this.points -= 10;
                this.unansweredCount++;
              }
            }

          });
        setTimeout(() => {
          this.interval$.unsubscribe();
        }, 600000);
      }

      stopSessionCounter()
      {
        // this.sessionInterval$.unsubscribe();
        // this.SessionSeconds=0;
        // this.sessionTime=0;
      }

      stopCounter() {
        this.interval$.unsubscribe();
        this.counter =0;
      }
      resetCounter() {
        this.stopCounter();
        this.counter = 30;
        this.startCounter();
      }
  // resetQuiz(){

  // }
  // resetQuiz() {
  //   this.resetCounter();
  //   this.getAllQuestions();
  //   this.points = 0;
  //   this.counter = 60;
  //   this.currentQuestion = 0;
  //   this.progress = "0";
  // }
      getProgressPercent() {
        this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
        return this.progress;
      }

      //Escape Detection
      // @HostListener('window:keydown.esc',['$event'])
      // handleKeyDown(event:KeyboardEvent){
      //   this.isfullscreen=false;
      //   this.closeFullScreen();
      // }
      // @HostListener('document.webkitfullscreenchange',['$event'])
      // @HostListener('fullscreenchange',['$event'])
      // @HostListener('mozfullscreenchange',['$event'])
      // @HostListener('MSFullScreenChange',['$event'])
      // screenChange(event:KeyboardEvent)
      // {
      //   this.isfullscreen=false;
      //   this.closeFullScreen();
      //   alert("Please enter into full Screen");
      // }
      @HostListener('paste',['$event']) blockPaste(e:KeyboardEvent)
      {
        e.preventDefault();
      }
      @HostListener('copy',['$event']) blockCopy(e:KeyboardEvent)
      {
        e.preventDefault();
      }
      @HostListener('cut',['$event']) blockCut(e:KeyboardEvent)
      {
        e.preventDefault();
      }

      // @HostListener('window:resize', ['$event'])
      // onWindowResize() {

      //   if(this.isfullscreen==true)
      //   {
      //     this.getScreenWidth = window.innerWidth;
      //     this.getScreenHeight = window.innerHeight;
      //     this.isfullscreen=false;
      //     this.closeFullScreen();
      //     alert("Please enter into full Screen");

      //   }

      // }z

      // spoof Detection
      @HostListener('document:fullscreenchange', ['$event'])
      @HostListener('document:webkitfullscreenchange', ['$event'])
      @HostListener('document:mozfullscreenchange', ['$event'])
      @HostListener('document:MSFullscreenChange', ['$event'])
      fullscreenmodes(){
            this.chkScreenMode();
      }
      chkScreenMode(){
        if(document.fullscreenElement){
          //fullscreen
          this.isfullscreen = true;
        }else{
          //not in full screen

          this.isfullscreen = false;
          this.spoofDetected=true;
          //alert("Spoof detected");
        }
      }
        // Spoof detection
      @HostListener('document:visibilitychange',['$event'])
      newTabOpen()
      {
        console.log("New Tab Opened");
        //alert('console.log("New Tab Opened");')
        this.spoofDetected=true;
      }

      //Online event or Offiline event
      @HostListener('window:offline', ['$event'])
      OfflineEvent(event: Event) {
       console.log(event);
      }

      @HostListener('window:online', ['$event'])
      OnlineEvent(event: Event)
      {
        console.log(event);
        console.log("Connected");
      }

  }



