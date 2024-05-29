module.exports = {
  isLogged: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo=req.originalUrl;
      req.flash('error', 'You must be signed in first!');

      return res.redirect('/login');
    }
    next();
  },
  //use a middleware function to transfer the returnTo value from the session (req.session.returnTo) to the Express.js app res.locals object before the passport.authenticate() function is executed in the /login POST route.
  storeReturnTo: (req, res, next) => {
    if (req.session.returnTo) {
      
      res.locals.returnTo = req.session.returnTo;
     
    }
    next();
  }
};