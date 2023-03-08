import { Component, HostListener } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Auth } from 'firebase/auth';
import { AuthService } from '../service/auth.service';
import { StudentServiceService } from '../service/student-service.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../service/question.service';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent
{

  public ipAddress:any;
  public RegisterForm:any;
  public isQuizCompleted:boolean=false;
  public displayUserDetails:boolean=false;
  public quizDetails:boolean=false;
  public homeScreen=false;

  public quizList: any = [];

  constructor(
    public fb: FormBuilder ,
    public auth:AuthService ,
    public stu_ser :StudentServiceService,
    private route:Router,
    private db: AngularFireDatabase,
    private http : HttpClient,
    private question_com :QuestionService
    ){
    //this.stu_ser.OnInit();
    //this.stu_ser.getStudentDetails();
    this.homeScreen=true;
    this.isQuizCompleted=false;
    this.displayUserDetails=false;

    // this.id=localStorage.getItem('token');


    // this.questionService.getQuestionJson()
    // .subscribe(res => {
    //   this.questionList = res;  //res.questions
    //   console.log(this.questionList)
    // })


  }
  ngOnInit() {
    this.stu_ser.getIPAddress();
    //window.location.reload();
  }

  protected displayUserProfile()
  {
    this.stu_ser.getUserDetailsFromDB();
    this.displayUserDetails=true;
    this.homeScreen=false;
    this.isQuizCompleted=false;
    this.quizDetails=false;
  }
  protected displayHomeScreen()
  {
    this.homeScreen=true;
    this.displayUserDetails=false;
    this.isQuizCompleted=false;
    this.quizDetails=false;
  }
  protected displayQuizList()
  {
    this.homeScreen=false;
    this.displayUserDetails=false;
    this.isQuizCompleted=false;
    this.quizDetails=true;
    this.question_com.getQuizList().subscribe((res: any) => {
      this.quizList = res;  //res.questions
      console.log(this.quizList)
    })
  }
  OnSubmit(){

  }
  deleteLogs()
  {



  }
  // @HostListener('unloaded')
  // ngOnDestroy()
  // {
  //    console.log("Destroyed");
  // }

  //  getUsersDetails()
  // {
  //   //var user:User[];
  //    this.stu_ser.getUserDetailsFromDB().subscribe((res: any) => {
  //     //user=value as User[];
  //     this.UserDataList=res;
  //   })
  //   //this.UserDataList=this.UserDataList[""+localStorage.getItem('token')]
  //   console.log(this.UserDataList);

  // }

  // registerForm() {
  //   this.RegisterForm = this.fb.group({
  //     Name: ['', [Validators.required, Validators.minLength(2)]],

  //     Email: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
  //       ],
  //     ],
  //     MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  //   });
  // }
  // get Name() {
  //   return this.RegisterForm.get('Name');
  // }

  // get Email() {
  //   return this.RegisterForm.get('Email');
  // }
  // get MobileNumber() {
  //   return this.RegisterForm.get('MobileNumber');
  // }

}
// class User{
//   id:any;
//   email:any;
//   name:any;
//   photo:any;
// }
