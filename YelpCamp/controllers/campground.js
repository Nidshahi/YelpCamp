const Campground = require('../models/campground');
const{cloudinary}=require('../Cloudinary');
const opencage = require('opencage-api-client');
module.exports.index= async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

module.exports.newForm=(req, res) => {
  res.render('campgrounds/new');
};
module.exports.CreateCampground=async (req, res) => {
  const geocode= await opencage.geocode({ q: req.body.campground.location });
  const r = geocode.results[0].geometry;
  
  const loc = {
    type: 'Point',
    coordinates: [r.lng, r.lat] 
  };
 
   const campground = new Campground(req.body.campground);
   campground.geometry=loc;

  campground.image=req.files.map(f => ({ url: f.path, filepath: f.filename }));
  campground.author = req.user._id;
  
  await campground.save();
  
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.showCamp=async (req, res,) => {
  const campground = await Campground.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
          path: 'author'
      }
  }).populate('author');
  
  if (!campground) {
      req.flash('error', 'Cannot find that campground!');
      return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};
module.exports.renderEditForm=async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
}
  res.render('campgrounds/edit', { campground });
};
module.exports.editCamp=async (req, res) => {
  const { id } = req.params;
  
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  const imgs = req.files.map(f => ({ url: f.path, filepath: f.filename }));
  console.log(imgs);
    campground.image.push(...imgs);
    await campground.save();
    console.log(campground);
    if (req.body.deleteImages) {
      for (let filepath of req.body.deleteImages) {
          await cloudinary.uploader.destroy(filepath);
      }
      await campground.updateOne({ $pull: { image: { filepath: { $in: req.body.deleteImages } } } })
  }
  req.flash('success', 'Successfully updated the campground!');
  res.redirect(`/campgrounds/${campground._id}`);
  
};
module.exports.deleteCamp=async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted the campground!');
  res.redirect('/campgrounds');
};
