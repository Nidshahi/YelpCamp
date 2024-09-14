const mongoose=require('mongoose');
const schema = mongoose.Schema;

const recipeSchema= schema({
  index:Number,
  name:String,
  instructions:String,
  ingredients:[String],
  cuisine:String,
  diet:String,
  webURL:String,
  transIngredient:[String],
  transInst:String,
  prepTime:Number,
  cookTime:Number,
  totalTime:Number,
  Servings:Number,
  course:String

  })

const Recipe = new mongoose.model('Recipe',recipeSchema);

 module.exports=Recipe;