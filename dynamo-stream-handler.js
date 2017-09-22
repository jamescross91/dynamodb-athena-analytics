'use strict';
const aws = require('aws-sdk');

module.exports.write_to_kinesis = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        console.log('DynamoDB Record: %j', record.dynamodb.NewImage);
    });
};

