const User = require('../models/user');
module.exports.renderRegister=(req,res)=>{
  res.render('campgrounds/register');
};
module.exports.register=async(req,res)=>{
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
};
module.exports.renderLogin=(req,res)=>{
  res.render('campgrounds/login');
};
module.exports.Login=(req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout=(req,res,next)=>{
  req.logout(function (err) {
    if (err) {
        return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
});
};