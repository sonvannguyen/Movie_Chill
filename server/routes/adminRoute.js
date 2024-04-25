const router = require("express").Router();
const auth = require("../auth/auth");
const adminController = require("../controllers/adminController");

// comment
router.get("/report/comment", adminController.getAllReportComment);

module.exports = router;
