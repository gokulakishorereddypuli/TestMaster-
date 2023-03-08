import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PreContestVerifierComponent } from './pre-contest-verifier/pre-contest-verifier.component';
import { CerfiticationComponentComponent } from './cerfitication-component/cerfitication-component.component';
const routes: Routes = [
  //{path:'', redirectTo:'welcome',pathMatch:"full",component:WelcomeComponent},
  {path:'', component:HomeComponent},
  {path:"assessment-for-students-certification-internships-from-easyinternships.in", component:QuestionComponent,canActivate:[AuthGuard]},
  {path:"student-dashboard",component:UserdashboardComponent,canActivate:[AuthGuard]},
  {path:"pre-contest-verifier-for-easyinternships.in-certification-for-students",component:PreContestVerifierComponent,canActivate:[AuthGuard]},
  {path:'certificate',component:CerfiticationComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
