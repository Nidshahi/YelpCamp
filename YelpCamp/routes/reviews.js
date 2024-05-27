const express = require('express');
//we have to include id from the params as it is not prsent in the route here that's why i set mergeparamas to true
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../schemas/validateJoi');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressErorr');
const Campground = require('../models/campground');

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

router.post('', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  const review = new Review(req.body.review);
  camp.reviews.push(review);
  await review.save();
  await camp.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${camp._id}`);
}));
router.delete('/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  //the $pull operator removes the specified reviewId from the reviews array of the campground document.
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted the review!');
  res.redirect(`/campgrounds/${id}`);
}))
module.exports = router;