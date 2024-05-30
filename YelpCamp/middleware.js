const Campground = require('./models/campground');
const { campgroundSchema, reviewSchema } = require('./schemas/validateJoi');
const ExpressError = require('./utils/expressErorr');
const Review = require('./models/review');
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
  },
   validateReview : (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
  },
 validateData : (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
  },
  isAuthor:async(req,res,next)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground.author.equals(req.user._id)){
      req.flash('error','You do not have permission to do that');
      return res.redirect(`/campgrounds/${campground._id}`);
      }else{
        next();
      }

  },
  isReviewAuthor:async(req,res,next)=>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
  }
};