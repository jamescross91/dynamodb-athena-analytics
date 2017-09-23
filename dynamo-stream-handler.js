'use strict';
const aws = require('aws-sdk');
var firehoser = require('firehoser')
var attr = require('dynamodb-data-types').AttributeValue;
var stringify = require('csv-stringify');

module.exports.write_to_kinesis = (event, context, callback) => {
  let firehose = new firehoser.DeliveryStream('dynamo-s3-delivery-stream');

  console.log(event.Records.map(attr.unwrap).map(stringify))

    // event.Records.forEach(function(record) {
    //   var unwrapped = attr.unwrap(record.dynamodb.NewImage);
    //   console.log('Writing ' + csv)
    //   firehose.putRecord(csv);
    // });
};

