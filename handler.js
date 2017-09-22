'use strict';
const aws = require('aws-sdk');

var kinesis = new aws.Kinesis({region : 'eu-west-1'});
const stream_name = 'my-first-stream'

module.exports.produce = (event, context, callback) => {
  for(var i =0; i < 1000; i++) {
    _writeToKinesis();  
  }
};

module.exports.consume = (event, context, callback) => {
  var totalReading = 0;
  event.Records.forEach((record) => {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        const payloadObj = JSON.parse(payload)
        console.log('Decoded positive record:', payloadObj);
        totalReading += payloadObj.reading
        console.log('Total reading now is ' + totalReading)
    });

    var avgReading = totalReading / event.Records.length
    console.log('Successfully processed ' + event.Records.length + ' records')
    console.log(null, 'Average reading in batch was ' + avgReading);
};

function _writeToKinesis() {
    var currTime = new Date().getMilliseconds();
    var sensor = 'sensor-' + Math.floor(Math.random() * 100000);
    var reading = Math.floor(Math.random() * 1000000);

    var record = JSON.stringify({
      time : currTime,
      sensor : sensor,
      reading : reading
    });

    var recordParams = {
      Data : record,
      PartitionKey : sensor,
      StreamName : stream_name
    };

    kinesis.putRecord(recordParams, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Successfully sent data to Kinesis.');
      }
    });
  }


