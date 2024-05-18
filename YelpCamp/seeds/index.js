const mongoose= require('mongoose');
const camp = require('../models/campground');

const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers');


mongoose.connect('mongodb://127.0.0.1:27017/YelpApp');
const db = mongoose.connection;
//on is used for recurring events, like handling errors that might happen multiple times,
db.on("error",console.error.bind(console,"connection error:"));
//once is used for one-time events, like performing an action when the database connection is opened for the first time.
db.once("open",()=>{
  console.log("Database connected");
});



const seedRandom = (array)=>array[Math.floor(Math.random()*array.length)];
const Data = async()=>{
  try{
    await camp.deleteMany({});
    for (let i = 0; i < 50; i++) {
      const randomCity = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 40) + 10;

    
      
      const newCamp = new camp({
        location: `${cities[randomCity].city},${cities[randomCity].state}`,
        
        title: `${seedRandom(descriptors)} ${seedRandom(places)}`,
        image: '', // Use the fetched image URL
        description: 'This is a sample description for the campground.',
        price
      });
      
     await newCamp.save();
  }
    console.log('data successfully seeded');
  }
  catch (err) {
    console.error("Error seeding data:", err);
  }
  
};
Data();
