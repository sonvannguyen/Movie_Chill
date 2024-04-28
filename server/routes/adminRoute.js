const router = require("express").Router();
const auth = require("../auth/auth");
const adminController = require("../controllers/adminController");
const systemController = require("../controllers/systemController");

// comment
router.get("/report/comment", adminController.getAllReportComment);

// system stats
router.get("/system-stats", systemController.getSystemStats);

module.exports = router;
