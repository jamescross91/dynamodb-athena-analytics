var stringify = require("csv-stringify")
var data = {
  "NewImage": {
    "Message": {
      "S": "New item!"
    },
    "Id": {
      "N": "101"
    }
  }
}

//console.log(data.NewImage.Message)

// console.log(stringify(data.NewImage.Message, null, ))


input = [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ];
stringify(data, function(err, output){
  console.log(output)
});
