const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

const eventController = require("../../../controllers/eventController");
// router.get("/app/events?:id", eventController.getById);
router.get("/app/events?:q", eventController.getEventDetails);
router.post(
  "/app/events",
  upload.array("photos", 2),
  eventController.createEvent
);
router.put(
  "/app/events/:id",
  upload.array("photos", 2),
  eventController.updateEvent
);
router.delete("/app/events/:id", eventController.deleteEvent);

module.exports = router;
