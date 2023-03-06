import { Component } from '@angular/core';
import { StudentServiceService } from '../service/student-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{
  stuName:any;
  constructor(private stu_ser:StudentServiceService,private db: AngularFireDatabase,private http : HttpClient)
  {
    stu_ser=new StudentServiceService(db,http);

    this.stuName=this.stu_ser.stuName;
    console.log(this.stuName);
  }

  ngOnInit(): void {
  }

}
