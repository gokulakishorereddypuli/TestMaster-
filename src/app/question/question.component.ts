//import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { DOCUMENT } from '@angular/common';
import { Component, Host, HostListener, Inject, OnInit } from '@angular/core';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  template:'<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  //elem=document.documentElement;

  public elem:any;
  public name: string = "";
  public isfullscreen:boolean=false;
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

  constructor(private questionService: QuestionService,@Inject(DOCUMENT) private document: any) { }

  private ESCAPE_KEYCODE:number=27;




  ngOnInit() {
    this.elem=this.document.documentElement;
    // this.name = localStorage.getItem("name")!;
    // this.getAllQuestions();
    // this.startCounter();

  }

  enterFullScreen()
  {

    if (this.elem.requestFullscreen) {
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

    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  closeFullScreen() {
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
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res;  //res.questions
      })
  }
  nextQuestion() {
    //this.currentQuestion++;
  }
  previousQuestion() {
    //this.currentQuestion--;
  }

  answer(currentQno: number, option: any)
  {
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 30;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  }
  resetQuiz(){

  }
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

  @HostListener('window:keydown.esc',['$event'])
  handleKeyDown(event:KeyboardEvent){
    // let x=event.keyCode;
    // if(x===27)
    // {
    //    console.log("Escape");
    // }
    alert("he;;");
    this.isfullscreen=false;
    this.closeFullScreen();
  }
  @HostListener('document.webkitfullscreenchange',['$event'])
  @HostListener('fullscreenchange',['$event'])
  @HostListener('mozfullscreenchange',['$event'])
  @HostListener('MSFullScreenChange',['$event'])
  screenChange(event:KeyboardEvent)
  {
     this.isfullscreen=false;
     this.closeFullScreen();
     alert("Please enter into full Screen");
  }
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


}
