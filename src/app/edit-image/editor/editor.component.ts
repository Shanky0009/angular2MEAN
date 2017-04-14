import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ImagesService } from '../image-services/index';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	imagePath: any;
    image = '';
    tools = {};
    source: any;
    degree = 0;
    countLeft = 0;
  	show: boolean = true;
   context: CanvasRenderingContext2D;

 @ViewChild("editor") editor: ElementRef;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
  	this.imagePath = localStorage.getItem('imagePath');

    // if(this.imagePath){
    //   this.show=false
    // }
  	// this.imagesService.getImagePath().subscribe(result => {this.imagePath = result});
  }

  // ngAfterViewInit() {
    

  // }

  onChange($event) {
    let file = $event.srcElement.files;
    this.show=false;
    let postData = {field1: 'field1', field2:'field2'};
    this.imagesService.postFile(postData, file).then((result:any) => {
      
      if(result){
          let canvas = this.editor.nativeElement;
          let context = canvas.getContext('2d');
          this.source = new Image(); 
          this.source.crossOrigin = 'Anonymous';
          this.source.onload = () => {
              canvas.height = this.source.height;
              canvas.width = this.source.width;
              context.drawImage(this.source, 0, 0);
              // this.image = canvas.toDataURL();
          };
          this.image = result.imagePath
          this.source.src = result.imagePath;
      }
      
    })
  }

  selectTool($event){
   $event.preventDefault();          
    //call the relevant function
    // this[$event.target.id}];

    this.tools[$event.target.id].call($event.target); 
    console.log( $event.target.id) 
    // tools[this.id].call(this); 
  }

  save() {
     let canvas = this.editor.nativeElement;
        var dt = canvas.toDataURL('image/png');
        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
         let link = document.createElement("a");
         link.href = dt;
         link.download = "edit.png";
         console.log(canvas)
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
 }

   rotateL() { 
      let canvas = this.editor.nativeElement;
      let context = canvas.getContext('2d');
      this.degree -= 90 ;
      console.log(this.degree)
      // var conf;
      this.countLeft++;
      if((this.degree/180) % 1 != 0 && this.countLeft == 1){
        var conf = { 
            x: 0, 
            y: canvas.width, 
            r: this.degree * Math.PI / 180 
         } 
      } else if((this.degree/180) % 1 == 0 && this.countLeft == 2) {
          conf = { 
            x: canvas.width, 
            y: canvas.height, 
            r: this.degree * Math.PI / 180 
         }; 
      }else if ((this.degree/180) % 1 != 0 && this.countLeft == 3) {
          conf = { 
            x: canvas.height, 
            y: 0, 
            r: this.degree * Math.PI / 180 
         }; 
      }else  {
          conf = { 
            x: 0, 
            y: 0, 
            r: this.degree * Math.PI / 180 
         }; 
         this.countLeft = 0;
      }
        console.log(conf, this.countLeft)

      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.translate(conf.x, conf.y); 
      context.rotate(conf.r); 
      // redraw saved image 
      context.drawImage(this.source, conf.x, conf.y);
   }
   rotateR() { 
      let canvas = this.editor.nativeElement;
      let context = canvas.getContext('2d');
      var conf = { 
         x: canvas.width, 
         y: 0, 
         r: 90 * Math.PI / 180 
      }; 
      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.translate(conf.x, conf.y); 
      context.rotate(conf.r); 
      //redraw saved image 
      context.drawImage(this.source, 0, 0);
   }

}
