import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './dashboard/components/main/main.component';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardGuard} from './guard/auth-guard.guard';
import {HomeComponent} from './home/home.component';
import {AddMemberVerifyTokenComponent} from './add-member-verify-token/add-member-verify-token.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserUpdateComponent} from './user/user-update/user-update.component';
import {ExcelReportComponent} from './excel-report/excel-report.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'dashboard', component: DashboardComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'change-password', component: ChangePasswordComponent}
    ],
    canActivate: [AuthGuardGuard]
  },
  {path: 'board/:boardId', component: BoardViewComponent, canActivate: [AuthGuardGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuardGuard]},
  {path: 'redirect', redirectTo: 'dashboard' , pathMatch: 'full', canActivate: [AuthGuardGuard]},
  {path: 'add-member-verify-token/:token', component: AddMemberVerifyTokenComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: 'user-update', component: UserUpdateComponent},
  {path: 'excel-report', component: ExcelReportComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
