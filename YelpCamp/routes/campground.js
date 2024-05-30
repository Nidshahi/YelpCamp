const express=require('express');
const router = express.Router();
const campgrounds=require('../controllers/campground');
const catchAsync = require('../utils/catchAsync');
const {isLogged,validateData,isAuthor}= require('../middleware');
const multer=require('multer');
const upload=multer({dest:'uploads/'});
router.route('')
      .get( catchAsync(campgrounds.index))
      // .post( isLogged,validateData, catchAsync(campgrounds.CreateCampground));
      .post(upload.single('image'),function(req,res){
            res.send(req.file);
            console.log(req.body);
            console.log(req.file);
      })

router.get('/new',isLogged, campgrounds.newForm);

router.route('/:id')
      .get( catchAsync(campgrounds.showCamp))
      .put( isLogged,isAuthor,validateData, catchAsync(campgrounds.editCamp))
      .delete(isLogged,isAuthor, catchAsync(campgrounds.deleteCamp));

router.get('/:id/edit',isLogged,isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports=router;

