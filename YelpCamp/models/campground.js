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
//mongoose post middleware associated with findByIdAndDelete
camp.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Review.deleteMany({
          _id: {
              $in: doc.reviews
          }
      })
  }
})
const Camp=mongoose.model('Campground',camp);
module.exports=Camp;