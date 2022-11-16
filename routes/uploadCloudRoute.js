const router = require('express').Router();
const fileUploader = require("../configs/cloudinary")
const auth = require('../middlewares/auth')

router.post('/cloudinary-upload', auth , fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'))
    return;
  }
 
  res.json({ secure_url: req.file.path })
});

module.exports = router;
