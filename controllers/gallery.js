const Image = require('../models/Image');
const User = require('../models/User');

exports.uploadImage = async (req, res) => {
  const { category } = req.body;
  const newImage = new Image({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    user: req.user._id,
    category
  });
  await newImage.save();
  res.redirect('/gallery');
};

exports.getGallery = async (req, res) => {
  const { category, search, page = 1 } = req.query;
  const limit = 9;
  let query = {};

  if (category) query.category = category;
  if (search) query.filename = { $regex: search, $options: 'i' };

  const total = await Image.countDocuments(query);
  const pages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const images = await Image.find(query)
    .populate('user')
    .skip(skip)
    .limit(limit);

  const categories = await Image.distinct('category');
  
  res.render('gallery/index', { 
    images, 
    categories, 
    currentCategory: category,
    search,
    page: parseInt(page),
    pages,
    total
  });
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  const images = await Image.find({ user: user._id });
  res.render('gallery/profile', { user, images });
};