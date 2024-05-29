const express = require('express');
const router= express.Router();
const passport=require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const {storeReturnTo} = require('../middleware');
router.get('/register',(req,res)=>{
  res.render('campgrounds/register');
})
router.post('/register',catchAsync(async(req,res)=>{
  try {
    const {username,email}=req.body;
    const newUser = new User({ username,email });
    const User1= await User.register(newUser, req.body.password);

    //req,login is used to directly login for the newly registered users
    req.login(User1,err=>{
     //the return statement is used to immediately exit the function and return a value.  
      if(err) return next(err);
      req.flash('success', 'Registration successful. Welcome to YelpCamp!');
    res.redirect('/campgrounds');
    })
   
    
} catch (error) {
    console.log(error);
    req.flash('error', error.message); // Flash a user-friendly error message
    res.redirect('/register');
}
}))
router.get('/login',(req,res)=>{
  res.render('campgrounds/login');
})
//responsible for authenticating user credentials using Passport's local strategy
router.post('/login',
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    // Now we can use res.locals.returnTo to redirect the user after login
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
        console.log("Login",redirectUrl);
        res.redirect(redirectUrl);
    });
router.get('/logout',(req,res,next)=>{
  req.logout(function (err) {
    if (err) {
        return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
});
})
module.exports = router;