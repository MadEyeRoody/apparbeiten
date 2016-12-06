var db = require('../services/dbService').db;
const collection = 'users';

exports.createUser = function(request, response){

    console.log("user: " + request.body.user);

    var user = request.body.user;

    db().collection(collection).insertOne(user, function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
};

exports.deleteUser = function(request, response) {
    var id = request.query.id;

    db().collection(collection).deleteOne({ id : id }, function(err, result) {
        response.send(result);
      });
};

exports.getUserByName = function (request, response) {
  var name = request.params.username;

  db().collection(collection).findOne({username : name }, function (err, result) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.json(result);
    }
  });
};

exports.getUsers = function(request, response){
    
  db().collection(collection).find().toArray(function (err, words) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.json(words);
    }
  });
    
};