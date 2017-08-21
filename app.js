
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/mongodb-nodejs';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Successfully connected to the server.');

    db.close();
});