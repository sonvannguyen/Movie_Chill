const router = require("express").Router();
// const auth = require("../auth/auth");
const notificationController = require("../controllers/notificationController");

router.get("/user/:userId/:action", notificationController.getNotificationForUser);
router.get("/history", notificationController.getNotificationHistoryForAdmin);

router.post("/create", notificationController.createNotification);
router.delete(
  "/delete/:notificationId",
  notificationController.deleteNotification
);

module.exports = router;
