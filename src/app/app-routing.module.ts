import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [
  //{path:'', redirectTo:'welcome',pathMatch:"full",component:WelcomeComponent},
  {path:'', component:HomeComponent},

  {path:"question", component:QuestionComponent},
  {path:"student-dashboard",component:UserdashboardComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
