'use strict';
const aws = require('aws-sdk');
const table = 'dynamo-table-name';
var uuid = require('node-uuid');

aws.config.update({
    region: "eu-west-1"
});

var docClient = new aws.DynamoDB.DocumentClient();

module.exports.insert = (event, context, callback) => {
  for (var i=0; i < 100; i++) {
    insertEventData();
  }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    console.log("Added item:", JSON.stringify(data, null, 2));
    callback(null, response);
}

function insertEventData() {
  var params = {
        TableName: table,
        Item:{
          "event_uuid": uuid.v4();,
          "event_hander_1": randomInt(1, 100),
          "event_handler_2": randomInt(1, 100),
          "event_handler_3": randomInt(1, 100)
        }
  }

  console.log("Inserting item " + params.Item)

  docClient.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 501,
        body: 'Couldn\'t create the event item.',
      });
      return;
    }
  })
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}