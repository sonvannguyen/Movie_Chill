const router = require("express").Router();
const adminAuth = require("../auth/adminAuth");
const adminController = require("../controllers/adminController");
const systemController = require("../controllers/systemController");

// login
router.post("/login", adminController.login);

// comment
router.get("/report/comment", adminAuth, adminController.getAllReportComment);

// system stats
router.get("/system-stats",adminAuth, systemController.getSystemStats);

module.exports = router;
