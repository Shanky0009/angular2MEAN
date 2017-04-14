import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { CommonModule } from '@angular/common';  

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './routes/app-routing.module';
import { LoginComponent } from './accounts/login/login.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { AlertComponent } from './_directives/alert/alert.component';

import { UsersService, AuthenticationService, AlertService } from './accounts/user-services/index';
import { EditorComponent } from './edit-image/editor/editor.component';
import { ImagesService } from './edit-image/image-services/index';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AlertComponent, 
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    AlertModule.forRoot()
  ],
  providers: [ UsersService, AuthenticationService, AlertService, ImagesService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
