/**
 * forAll msg comming from hardware that can be collected from future analysis
 * msgType: 
 *    1. statusReport
 *    2. onlineOfflineReport
 *    3. GPSLocationReport
 *    4. powerReport
 *    5. backPowerChangeReport
 *    6. FaceReport
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/robot');

var HardwareMsgSchema = new Schema({
    "hardwareType": {type: String, required: true},
    "hardwareID": {type: String, required: true},
    "msgType": {type: String, required: true},
    "timeStamp": {type: Number, default: Date.now},
    "param": {
        "status": {type: String}, // statusReport 的数据，一般为 offline 或 online
        "realtimeStatus": {type: String}, // realtimeStatus 的数据，比如导航和暂停导航
        "GPSInformation": {
            "longtitude": {type: Number},
            "latitude": {type: Number},
            "altitude": {type: Number},
        },
        "power": {type: Number},
        "backPower": {type: Number},
        "FaceReport": {
            "url": {type: String},
            "personId": {type: String},
            "blackList": {type: Number, enum: [0, 1, 2]} // 0 is blacklist, 1, is normal, 2 is whitelist
        }
    }
});


//导出模型构造函数
module.exports = mongoose.model('hardwareMsg', HardwareMsgSchema);