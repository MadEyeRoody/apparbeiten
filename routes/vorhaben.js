var db = require('../services/dbService').db;
const collection = "vorhaben";

exports.createVorhaben = function(request, response){

    var vorhaben = request.body.user;

    console.log("vorhaben: ", vorhaben);

    var user = request.body.user;

    db().collection(collection).insertOne(vorhaben, function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
}