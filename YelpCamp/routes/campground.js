const express=require('express');
const router = express.Router();
const campgrounds=require('../controllers/campground');
const catchAsync = require('../utils/catchAsync');
const {isLogged,validateData,isAuthor}= require('../middleware');

router.route('')
      .get( catchAsync(campgrounds.index))
      .post( isLogged,validateData, catchAsync(campgrounds.CreateCampground));

router.get('/new',isLogged, campgrounds.newForm);

router.route('/:id')
      .get( catchAsync(campgrounds.showCamp))
      .put( isLogged,isAuthor,validateData, catchAsync(campgrounds.editCamp))
      .delete(isLogged,isAuthor, catchAsync(campgrounds.deleteCamp));

router.get('/:id/edit',isLogged,isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports=router;

