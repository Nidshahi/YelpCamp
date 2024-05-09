const express=require('express');
const app = express();
const path = require('path');
const mongoose= require('mongoose');
const camp = require('./models/campground');
//This line establishes a connection to the MongoDB database named "YelpApp" running on the local machine at port 27017. 
mongoose.connect('mongodb://127.0.0.1:27017/YelpApp',);
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

app.get('/',(req,res)=>{
  res.render('home');
})
app.get('/makeCampground',async(req,res)=>{
const Camp = new camp({title:'My BackYard',price:'$400',description:"Cozy experience"});
await Camp.save();
res.send(Camp);
})
app.listen(3000,()=>{
  console.log('listening at the port 3000');
})