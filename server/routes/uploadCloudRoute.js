const router = require("express").Router();
const auth = require("../auth/auth");
const cloudinary = require("../utils/cloundinary");

router.post("/image", auth, async (req, res, next) => {
  const image_url = req.body.image_url;
  if (!image_url) {
    next(new Error("No file uploaded!"));
    return;
  }
  const response = await cloudinary.uploader.upload(image_url);
  res.json({ secure_url: response.secure_url });
});

module.exports = router;
