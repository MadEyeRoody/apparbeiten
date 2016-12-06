var db = require('../services/dbService').db;

exports.createVorhaben = function(request, response){

    console.log("user: " + request.body.vorhaben);

    var vorhaben = request.body.user;

    var id;

    if (id === undefined) {
        // Generated random id
        id = '';
    }

     db.insert({
                username: vorhaben.name,
                image: vorhaben.image,
                users: []
        }, id, function(err, doc) {
            if (err) {
                console.log(err);
                response.sendStatus(500);
            } else {
                response.sendStatus(200);
            }
            response.end();
        });
};