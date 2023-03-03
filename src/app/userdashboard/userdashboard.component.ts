import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent
{
  public RegisterForm:any;
  public isQuizCompleted:boolean=false;
  public displayUserDetails:boolean=false;
  public homeScreen=false;




  constructor( public fb: FormBuilder){
    this.homeScreen=true;
    this.isQuizCompleted=false;
    this.displayUserDetails=false;

  }
  ngOnInit() {
    //this.crudApi.GetStudentsList();
    this.RegisterForm();
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

  registerForm() {
    this.RegisterForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],

      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  get Name() {
    return this.RegisterForm.get('Name');
  }

  get Email() {
    return this.RegisterForm.get('Email');
  }
  get MobileNumber() {
    return this.RegisterForm.get('MobileNumber');
  }


}
