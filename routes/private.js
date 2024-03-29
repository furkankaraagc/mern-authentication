const express = require("express");
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getPrivateData);

module.exports = router;
