const express = require('express');
//we have to include id from the params as it is not prsent in the route here that's why i set mergeparamas to true
const router = express.Router({ mergeParams: true });

const reviews=require('../controllers/review');
const catchAsync = require('../utils/catchAsync');
const{validateReview, isReviewAuthor,isLogged}=require('../middleware');




router.post('/', isLogged, validateReview, catchAsync(reviews.postReview));
router.delete('/:reviewId',isReviewAuthor, catchAsync(reviews.deleteReview));
module.exports = router;