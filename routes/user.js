var db = require('../services/dbService').db;


exports.createUser = function(request, response){

    console.log("user: " + request.body.user);

    var user = request.body.user;

     db.insert({
                username: user.name,
                role: user.role,
                email: user.email,
                image: user.image,
                unternehmen: user.unternehmen

        }, '', function(err, doc) {
            if (err) {
                console.log(err);
                response.sendStatus(500);
            } else {
                response.sendStatus(200);
            }
            response.end();
        });
};

exports.deleteUser = function(request, response) {
    var id = request.query.id;
    // var rev = request.query.rev; // Rev can be fetched from request. if
    // needed, send the rev from client
    console.log("Removing document of ID: " + id);
    console.log('Request Query: ' + JSON.stringify(request.query));

    if (!id){
        response.sendStatus(410);
        return;
    }

    db.get(id, {
        revs_info: true
    }, function(err, doc) {
        if (!err) {
            db.destroy(doc._id, doc._rev, function(err, res) {
                // Handle response
                if (err) {
                    console.log(err);
                    response.sendStatus(500);
                } else {
                    response.sendStatus(200);
                }
            });
        }
    });
};

exports.getUserById = function(request, response) {
  var id = request.params.userId;

  db.get(id, { revs_info: true }, function(err, body) {
    if (!err){
      console.log(body);
      response.json(body);
    } else {

      response.sendStatus(400);
      response.end();
    }
  });
};

exports.getUsers = function(request, response){
    
    var docList = [];
    var i = 0;
    db.list(function(err, body) {

        if (!err) {
            var len = body.rows.length;
            var i = 0;
            console.log('total # of docs -> ' + len);
            
            if (len > 0) {
            body.rows.forEach(function(document) {

                db.get(document.id, {
                    revs_info: true
                }, function(err, doc) {
                    if (!err) {

                        i++;
                        docList.push({
                            id : doc._id,
                            username : doc.username,
                            email : doc.email,
                            image : doc.image,
                            unternehmen: doc.unternehmen
                        });    
                        
                        if (i >= len) {
                               response.json(docList);
                                console.log('ending response...');
                            }

                    } else {
                        console.log(err);
                        response.end();
                    }
                });

            });
            } else {
                response.end();
            }

        } else {
            console.log(err);
            response.end();
        }
    });
};