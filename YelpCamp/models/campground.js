const mongoose=require('mongoose');
const campSchema= mongoose.Schema;

const camp=new campSchema({
  title:String,
  image:String,
  price:Number,
  description:String,
  location:String
});

const Camp=mongoose.model('Campground',camp);
module.exports=Camp;