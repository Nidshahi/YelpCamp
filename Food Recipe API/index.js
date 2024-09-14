const express= require('express');
const mongoose = require('mongoose');
const app = express();
const Recipe=require('./models/recipe');
mongoose.connect('mongodb://localhost:27017/Recipe');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.listen(3000,()=>{
  console.log('Server running  at 3000!')
})