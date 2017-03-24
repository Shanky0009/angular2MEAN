import { Component, OnInit } from '@angular/core';
import {NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../user-services/users.service';
import { AlertService } from '../user-services/index';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
	returnUrl: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private usersService: UsersService
	) {}
	response = {}

  ngOnInit() {
  		this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
  }

    
   
   // passwordMatchValidator(g: FormGroup) {
   //    return g.get('psw').value === g.get('pswRepeat').value
   //       ? null : {'mismatch': true};
   // }

   onSubmit(formElement: NgForm) {
   		console.log(formElement.value);  // { first: '', last: '' }
    	console.log(formElement.valid);  // false
    	let signUpData = {
    		emailID: formElement.value.email,
    		password: formElement.value.psw
    	}
    	this.usersService.signUpUser(signUpData).subscribe(
        data => {
  				this.router.navigate([this.returnUrl]);
  			},
  			error => {
  				console.log(error, '======>eoor')
  				this.alertService.error(error._body);
  			}
        // }
      );
    	return false;
  	}
}
