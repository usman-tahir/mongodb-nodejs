
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/mongodb-nodejs',
    insertDocuments,
    findDocuments;

insertDocuments = function(db, callback) {
    var collection = db.collection('documents');
    
    collection.insertMany([
        { a: 1 },
        { a: 2 },
        { a: 3 }
    ], function(err, result) {
        assert.equal(null, err);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection.');
        callback(result);
    });
}

findDocuments = function(db, callback) {
    var collection = db.collection('documents');

    collection.find({}).toArray(function(err, docs) {
        assert.equal(null, err);
        console.log('Found the following records:');
        console.log(docs);

        callback(docs);
    });
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Successfully connected to the server.');

    insertDocuments(db, function() {
        findDocuments(db, function() {
            db.close();
        });
    });
});