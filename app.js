
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/mongodb-nodejs',
    insertDocuments,
    findDocuments,
    updateDocuments,
    removeDocuments;

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

    // Look for a specific record
    collection.find({ 'a': 3 }).toArray(function(err, docs) {
        assert.equal(null, err);
        console.log('Found the following records:');
        console.log(docs);

        callback(docs);
    });
}

updateDocuments = function(db, callback) {
    var collection = db.collection('documents');

    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Updated the document with the field \'a\' equal to 2');
        callback(result);
    });
}

removeDocuments = function(db, callback) {
    var collection = db.collection('documents');

    collection.deleteOne({ a: 3 }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Removed the document with the field \'a\' equal to 3');
        callback(result);
    });
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Successfully connected to the server.');

    insertDocuments(db, function() {
        updateDocuments(db, function() {
            removeDocuments(db, function() {
                db.close();
            });
        });
    });
});