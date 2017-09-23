'use strict';
const aws = require('aws-sdk');
var firehoser = require('firehoser')
var attr = require('dynamodb-data-types').AttributeValue;

module.exports.write_to_kinesis = (event, context, callback) => {
  let firehose = new firehoser.DeliveryStream('dynamo-s3-delivery-stream');
    event.Records.forEach(function(record) {
      var unwrapped = attr.unwrap(record.dynamodb.NewImage);
      console.log('Writing ' + JSON.stringify(unwrapped))
      firehose.putRecord(JSON.stringify(unwrapped));
    });
};

