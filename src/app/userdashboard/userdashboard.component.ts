import { Component, HostListener } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Auth } from 'firebase/auth';
import { AuthService } from '../service/auth.service';
import { StudentServiceService } from '../service/student-service.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
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
  public homeScreen=false;

  constructor(
    public fb: FormBuilder ,
    public auth:AuthService ,
    public stu_ser :StudentServiceService,
    private route:Router,
    private db: AngularFireDatabase,
    private http : HttpClient
    ){
    //this.stu_ser.OnInit();
    stu_ser=new StudentServiceService(db,http);
    //this.stu_ser.getStudentDetails();
    this.homeScreen=true;
    this.isQuizCompleted=false;
    this.displayUserDetails=false;

    // this.id=localStorage.getItem('token');

  }
  ngOnInit() {
    this.stu_ser.getIPAddress();
    //window.location.reload();
  }

  protected displayUserProfile()
  {
    this.displayUserDetails=true;
    this.homeScreen=false;
    this.isQuizCompleted=false;
  }
  protected displayHomeScreen()
  {
    this.homeScreen=true;
    this.displayUserDetails=false;
    this.isQuizCompleted=false;
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
