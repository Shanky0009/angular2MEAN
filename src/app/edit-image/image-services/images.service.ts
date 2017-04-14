import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, RequestMethod, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
declare var $: any;

import 'rxjs/add/operator/map'

@Injectable()
export class ImagesService {
  requestUrl: string;
  responseData: any;
  handleError: any;


  constructor(
    private router: Router,
    private http: Http
    ) { 
      this.http = http;
  }

  postFile (postData: any, files: File[]){
    let headers = new Headers();
    let formData:FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if(postData !== '' && postData !== undefined && postData !== null){
      for(var property in postData) {
        if(postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }

    var returnResponse = new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/uploadFile', formData, {
         headers: headers
      }).subscribe(
         res => {
            this.responseData = res.json();
            resolve(this.responseData);
         },
         error => {
            this.router.navigate(['/login']);
            reject(error);
         }
        )
      });
    localStorage.setItem('imagePath', JSON.stringify(returnResponse));
      return returnResponse;
   }

  getImagePath(){
  		return localStorage.getItem('imagePath');
  }
  removeImage() {
  		localStorage.removeItem('imagePath');
  }
  // uplaodImage() {
  		
  // }
}
