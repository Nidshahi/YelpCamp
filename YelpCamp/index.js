const express=require('express');
const app = express();
const path = require('path');
const mongoose= require('mongoose');
const camp = require('./models/campground');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
//This line establishes a connection to the MongoDB database named "YelpApp" running on the local machine at port 27017. 
mongoose.connect('mongodb://127.0.0.1:27017/YelpApp');
//This line creates a reference to the database connection object returned by mongoose.connection. This object allows you to listen for events and interact with the database.
const db = mongoose.connection;
//on is used for recurring events, like handling errors that might happen multiple times,
db.on("error",console.error.bind(console,"connection error:"));
//once is used for one-time events, like performing an action when the database connection is opened for the first time.
db.once("open",()=>{
  console.log("Database connencted");
});
// Set the directory where your views/templates are located
//app.set('views', path.join(__dirname, 'my_custom_views_folder'));
//set the views directory to a folder named 'my_custom_views_folder'. 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);

app.get('/',(req,res)=>{
  res.render('home');
})

app.get('/campgrounds',async(req,res)=>{
const Camp = await camp.find({});
res.render('campgrounds/index',{Camp});
})
app.get('/campgrounds/new',(req,res)=>{
 res.render('campgrounds/new');
})
app.post('/campgrounds',async(req,res)=>{
  const Data = req.body.camp;
  const newPlace=new camp(Data);
  console.log(newPlace);
  await newPlace.save();
  console.log(newPlace);
  res.redirect(`/campgrounds/${newPlace.id}`);
})
app.get('/campgrounds/:id',async(req,res)=>{
 
    const loca = await camp.findById(req.params.id);
   
    res.render('campgrounds/show', { loca });
  
})
app.get('/campgrounds/:id/edit',async(req,res)=>{
  const {id} =req.params;
  const place= await camp.findById(id);
  res.render('campgrounds/edit',{place});
})
app.put('/campgrounds/:id',async(req,res)=>{
  const { id } = req.params;
  console.log(req.body);
  const { title, location ,description,image,price } = req.body.camp; 
  try {
    const updatedCampground = await camp.findByIdAndUpdate(id, { title, location,description,image,price },{runValidators:true}, { new: true });
    res.redirect(`/campgrounds/${updatedCampground.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/campgrounds/${id}/edit`);
  }
})
app.delete('/campgrounds/:id',async(req,res)=>{
  const {id} = req.params;
  await camp.findByIdAndDelete(id);
  res.redirect('/campgrounds');
})

app.listen(3000,()=>{
  console.log('listening at the port 3000');
})