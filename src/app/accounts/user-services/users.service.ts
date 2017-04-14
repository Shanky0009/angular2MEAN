import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
	private headers = new Headers({'Content-type': 'application/json'});

	constructor(private http: Http) {}

	signUpUser(data) {
		console.log('data', data)
		return this.http.post('http://localhost:3000/api/users', data)
								.map((res:Response) => res.json())
								.catch((error:any) => {
									if(error.status == 400) {
										return Observable.throw(error)
									}
								})
	}

}
