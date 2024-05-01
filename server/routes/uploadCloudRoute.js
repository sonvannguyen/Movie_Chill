const router = require("express").Router();
const fileUploader = require("../utils/cloundinary");
const adminAuth = require("../auth/adminAuth");

router.post("/image", adminAuth, fileUploader.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path });
});

module.exports = router;
