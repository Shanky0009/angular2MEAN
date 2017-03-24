import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

import { AlertService, AuthenticationService } from '../user-services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	returnUrl: string;

  constructor(
  		private route: ActivatedRoute,
  		private router: Router,
  		private authenticationService: AuthenticationService,
  		private alertService: AlertService
  		) { }

  ngOnInit() {
  		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(formElement: NgForm) {
  	this.loading = true;
  	this.authenticationService.login(formElement.value.email, formElement.value.psw).subscribe(
  			data => {
  				this.router.navigate([this.returnUrl]);
  			},
  			error => {
  				this.alertService.error(error._body);
  				this.loading = false;
  			}
  	)
  }
}
