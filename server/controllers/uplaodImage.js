/*
Load all models here
*/
var mongoose=require("mongoose"),
	ImageFile=mongoose.model("ImageFile"),
	express=require("express"),
	app=express(),
	fs=require('fs'),
	Busboy = require('busboy'),
	bodyParser=require("body-parser");
	router = express.Router();

/*
Empty HTTP method object.
*/
var imageMethod={};


/*
Routings/controller goes here
*/

module.exports=function(router)
{
    router.post('/uploadFile',imageMethod.uploadImage);
}

imageMethod.uploadImage=function(req,res){
    var busboy = new Busboy({ headers: req.headers });
    let imagesPath;
    let fileName;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) { 
      fileName= filename;
      imagePath = `/images/${filename}`
    	let path = `${process.env["PWD"]}/public/images/${filename}`
      var fstream = fs.createWriteStream(path); 
      file.pipe(fstream)	      
      file.on('data', function(data) {   });
      file.on('end', function() {
      		
      	   });
    });
    busboy.on('finish', function() {   
          console.log(imagesPath)
        res.status(200).json({imageName:fileName, imagePath:imagePath});
    res.end();
    });
    req.pipe(busboy);
    
}