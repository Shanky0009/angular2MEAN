var mongoose=require("mongoose"),
   Schema=mongoose.Schema;


 
var userSchema=Schema({
 	// username:{type:String,default:'',index:{unique:true}},
 	emailID:{type:String,default:'',index:{unique:true}},
 	salt:{type:String,default:''},	
	hashedPassword:{type:String,default:''},
	passLength:{type:Number,default:0},
	// answer:{type:String,default:''},
	// token:{type:String,default:''},
	// hotelID:{type:Array,default:[]},
 	created:{type:Date,default:Date.now,index:true}
 });

mongoose.model("User",userSchema);