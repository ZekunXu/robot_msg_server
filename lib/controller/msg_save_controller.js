const HardwareMsgDB = require('../db/hardware_msg.js');


exports.saveInfo = (req, res, next) => {


    HardwareMsgDB(req.body)
        .save()
        .then((value)=>{
            if(!value){
                res.status(201).json({statusCode: "connected", msg: "fail to store"});
            }
            console.log("store a piece of msg.");
            res.status(200).json({statusCode: "connected", msg: "success", data: value});
        })
        .catch((err)=>{
            res.status(404).json({statusCode: "disconnected", msg: "fail to connected to server."});
        })

}