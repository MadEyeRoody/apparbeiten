var db = require('../services/dbService').db;
const collection = "vorhaben";

exports.createVorhaben = function(request, response){

    var vorhaben = request.body.vorhaben;

    console.log("vorhaben: ", vorhaben);

    var user = request.body.user;

    db().collection(collection).insertOne(vorhaben, function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
};

// getVorhaben

exports.getVorhaben = function(request, response){
    
  db().collection(collection).find().toArray(function (err, words) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.json(words);
    }
  });
    
};

exports.deleteVorhaben = function(request, response) {
    var name = request.body.name;

    db().collection(collection).deleteOne({ name : name }, function(err, result) {
        response.send(result);
      });
};

exports.updateVorhaben = function(request, response){

    var vorhaben = request.body.vorhaben;

    console.log("vorhaben: ", vorhaben);

    db().collection(collection).updateOne({ name : vorhaben.name }
    , { $set: {
         scope: vorhaben.scope,
         beschreibung: vorhaben.beschreibung,
         users : vorhaben.users, 
         aufgaben : vorhaben.aufgaben
    } }, 
    function(err, result) {
        if (!err) {
            response.json(result);
        }
        else {
        response.status(400).send(err);
        }
    });  
};