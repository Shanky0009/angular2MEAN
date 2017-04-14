import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { PostsComponent } from '../posts/posts.component';
import { LoginComponent } from '../accounts/login/login.component';
import { SignUpComponent } from '../accounts/sign-up/sign-up.component';
import { EditorComponent } from '../edit-image/editor/editor.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch:'full'},
	{path: 'home', component: HomeComponent},
	{path:'imageEdit', component: EditorComponent},
	{path:'posts', component: PostsComponent},
	{path:'login', component: LoginComponent},
	{path:'sign-up', component: SignUpComponent},
];

@NgModule({
	imports : [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}