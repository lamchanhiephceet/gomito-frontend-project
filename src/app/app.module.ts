import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MainComponent} from './dashboard/components/main/main.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SignupComponent} from './auth/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './auth/login/login.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TokenInterceptor} from './token-interceptor';
import {ListUpdateComponent} from './list/list-update/list-update.component';
import {CreatListComponent} from './list/creat-list/creat-list.component';
import {CreateCardComponent} from './card/create-card/create-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ViewCardComponent} from './card/view-card/view-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {LabelComponent} from './label/label.component';

import {AddAttachmentComponent} from './attachment/add-attachment/add-attachment.component';
import {DeleteAttachmentComponent} from './attachment/delete-attachment/delete-attachment.component';
import {EditAttachmentComponent} from './attachment/edit-attachment/edit-attachment.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ViewAttachmentComponent} from './attachment/view-attachment/view-attachment.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ViewCommentComponent } from './comment/view-comment/view-comment.component';
import { EditCommentComponent } from './comment/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './comment/delete-comment/delete-comment.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { AddMemberVerifyTokenComponent } from './add-member-verify-token/add-member-verify-token.component';
// import { GBoardComponent } from './gboard/gboard.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    BoardViewComponent,
    SignupComponent,
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    ListUpdateComponent,
    CreatListComponent,
    CreateCardComponent,
    ViewCardComponent,
    AddAttachmentComponent,
    DeleteAttachmentComponent,
    EditAttachmentComponent,
    ViewAttachmentComponent,
    LabelComponent,
    ViewCommentComponent,
    EditCommentComponent,
    DeleteCommentComponent,
    NotificationComponent,
    HomeComponent,
    AddMemberVerifyTokenComponent,
    // GBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ScrollingModule
  ],
  // providers: [],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
