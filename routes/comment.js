var db = require('../services/dbService').db;
const collection = "comment";

//var watsonService = require('../services/watsonService');



//var exphbs  = require('express-handlebars');
// exports.analyzeComment = function(request, response){ 

//     watsonService.analyze(request.body.text, function(res) {
//         response.json(res);
//     });
// };


exports.insertComment = function(request, response){
    var comment = request.body.comment;
    console.log("comment: " + request.body.comment);

    db().collection(collection).insertOne(comment, function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
};

exports.deleteComment = function(request, response) {
    var id = request.query.id;

    db().collection(collection).deleteOne({ id : id }, function(err, result) {
        response.send(result);
    });
};

exports.getComments = function(request, response){


    db().collection(collection).find().toArray(function (err, result) {
    if (err) {
        response.status(500).send(err);
    } else {
        response.json(result);
    }
    });

};