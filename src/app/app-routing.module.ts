import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { QuestionComponent } from './question/question.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  //{path:'', redirectTo:'welcome',pathMatch:"full",component:WelcomeComponent},
  {path:"", component:WelcomeComponent},
  {path:"question", component:QuestionComponent},
  {path:"student-dashboard",component:UserdashboardComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
