'use strict';
const aws = require('aws-sdk');
var firehoser = require('firehoser')

module.exports.write_to_kinesis = (event, context, callback) => {
  let firehose = new firehoser.DeliveryStream('dynamo-s3-delivery-stream');

  console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        firehose.putRecord(JSON.stringify(record.dynamodb.NewImage, null, 2));
    });
};

