const mongoose=require('mongoose');
const campSchema= mongoose.Schema;
const{Review}=require('./review');
const camp=new campSchema({
  title:String,
  image:String,
  price:Number,
  description:String,
  location:String,
  reviews:[{
    type:campSchema.Types.ObjectId,
    ref:'Review'
  }]
});

const Camp=mongoose.model('Campground',camp);
module.exports=Camp;