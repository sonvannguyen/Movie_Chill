const router = require("express").Router();
const auth = require("../auth/auth");
const adminAuth = require("../auth/adminAuth");
const notificationController = require("../controllers/notificationController");

router.get(
  "/user/:userId/:action",
  auth,
  notificationController.getNotificationForUser
);
router.get(
  "/history",
  adminAuth,
  notificationController.getNotificationHistoryForAdmin
);

router.post("/create", adminAuth, notificationController.createNotification);
router.delete(
  "/delete/:notificationId",
  adminAuth,
  notificationController.deleteNotification
);

module.exports = router;
