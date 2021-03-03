const express = require("express");
const router = express.Router();
const MsgSaveController = require("./lib/controller/msg_save_controller.js");

router
    .post('/api/v1/hardwareMsg/save', MsgSaveController.saveInfo)













module.exports = router;