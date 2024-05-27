const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/expressErorr');
const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/Yelp-App');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        //client side cannot interfere with our cookie
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
const app = express();
app.use(session(sessionConfig));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//we are telling express to access static folder 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
//app.use: This function is used to set up middleware in an Express.js application
//res.locals: This is an object that contains response local variables scoped to the request. 
//This calls the flash method on the request object to retrieve the flash message stored under the key 'success_msg'. Flash messages are stored temporarily in the session and are meant to be used once. After they are accessed, they are removed from the session.
// It retrieves any flash messages stored under the keys 'success' and 'error'.
// It assigns these messages to res.locals.success and res.locals.error, respectively, making them available to your templates.
// It then calls next() to pass control to the next middleware or route handler.
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);
app.get('/let', (req, res) => {
    res.render('home');
});
app.all('*', (req, res, next) => {
    next(new ExpressError('PAGE NOT FOUND!!!', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!!";
    
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
