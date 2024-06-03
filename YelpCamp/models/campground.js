const mongoose=require('mongoose');
const campSchema= mongoose.Schema;
const{Review}=require('./review');
const ImageSchema = new campSchema({
  url: String,
  filepath: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});
const opts = { toJSON: { virtuals: true } };
const camp=new campSchema({
  title:String,
  image:[ImageSchema],
  geometry:{
    type:{
       type:String,
       enum:['Point'],
       required:true
    },
    coordinates:{
      type:[Number],
    required:true
  }
  },
  price:Number,
  description:String,
  location:String,
  author:{
    type: campSchema.Types.ObjectId,
    ref: 'User'
},
  reviews:[{
    type:campSchema.Types.ObjectId,
    ref:'Review'
  }]
},opts);

//to make virtual property
camp.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
  <p>${this.description.substring(0, 20)}...</p>`
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