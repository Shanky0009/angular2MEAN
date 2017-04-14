var mongoose=require("mongoose"),
   Schema=mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;

//profile schema 
var imageSchema=Schema({
 	imageName:{type:String,default:''},
 	imagePath:{type:String,default:''},
 	created:{type:Date,default:Date.now,index:true}
 });

//profile model
mongoose.model("ImageFile",imageSchema);