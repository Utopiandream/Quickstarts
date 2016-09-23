//This application connects to the mongoDB and then inserts data, first set in Mongoose, second is just mongo Client 

	
	// Load mongoose package
	var mongoose = require('mongoose');
	// Connect to MongoDB and create/use database called todoAppTest
	mongoose.connect('mongodb://localhost/local');
	// Create a schema
	var TodoSchema = new mongoose.Schema({
	  name : String,
	  price : Number,
	  description : String,
	  images : [{ 
		  			_id:false,
		  		   full: String,
	        	   thumb: String
	        	   }],
	  reviews : [{ 
		  			_id:false,	
		  			stars : Number,
	            	body : String,
	            	author : String
	            	}],
	  canPurchase : Boolean,
	  soldOut : Boolean
	}, {
		versionKey: false // You should be aware of the outcome after set to false
	});
	
	// Create a model based on the schema
	var Todo = mongoose.model('Todo', TodoSchema);	
	
	// Create a todo in memory
	var todo = new Todo({name: "JankyPC",
		  price: 50.99,
		  description: "Your average Craig's List CPU",
		  reviews: [{ stars: 2.0, body: "This is an okay PC", author: "Dstroer@lmiaerospace.com"}],
		  canPurchase: true,
		  soldOut: false});
	/*
	// Save it to database
	todo.save(function(err){
	  if(err)
	    console.log(err);
	  else
	    console.log(todo);
	});*/
	/*
	// Find all data in the Todo collection
	Todo.find(function (err, todos) {
	  if (err) return console.error(err);
	  console.log(todos)
	});*/
	
	// callback function to avoid duplicating it all over
	var callback = function (err, data) {
	  if (err) { return console.error(err); }
	  else { console.log(data); }
	}
	// Get ONLY completed tasks
	Todo.find({canPurchase: true }, callback);
	// Get all tasks ending with `top`
	//Todo.find({name: /top$/ }, callback);
	
	// Model.update(conditions, update, [options], [callback])
	// update `multi`ple tasks from complete false to true
	Todo.update({ name: "JankyPC" }, { canPurchase: false }, { multi: true }, callback);
	
	//check to see if iPad is now purchasible
	Todo.find({canPurchase: true }, callback);
	
	//Model.findOneAndUpdate([conditions], [update], [options], [callback])
	Todo.findOneAndUpdate({name: /Pad$/ }, {canPurchase: false}, callback);

	
	
	//check to see if iPad is not purchasible
	//Todo.find({canPurchase: true }, callback);

	/*
	// Loading MongoClient
	var MongoClient = require('mongodb').MongoClient
	  , assert = require('assert');

	// Connection URL
	var url = 'mongodb://localhost:27017/local';
	// Use connect method to connect to the server, this also calls the other METHODS!!!!!!!!!!!!!!!!!!!!!!!
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");

	  insertDocuments(db, function() {
	    updateDocument(db, function() {
	      removeDocument(db, function() {
	        db.close();
	      });
	    });
	  });
	});
	
	// Adding a document inside mongoDB
	var insertDocuments = function(db, callback) {
		  // Get the documents collection
		  var collection = db.collection('products');
		  // Insert some documents
		  collection.insertMany([
		    {a : 1}, {a : 2}, {a : 3}
		  ], function(err, result) {
		    assert.equal(err, null);
		    assert.equal(3, result.result.n);
		    assert.equal(3, result.ops.length);
		    console.log("Inserted 3 documents into the collection");
		    callback(result);
		  });
	}
	
	//Deleting a document within mongoDB
	var removeDocument = function(db, callback) {
		  // Get the documents collection
		  var collection = db.collection('documents');
		  // Insert some documents
		  collection.deleteOne({ a : 3 }, function(err, result) {
		    assert.equal(err, null);
		    assert.equal(1, result.result.n);
		    console.log("Removed the document with the field a equal to 3");
		    callback(result);
		  });    
		}
	//Editing a document within mongoDB
	var updateDocument = function(db, callback) {
		  // Get the documents collection
		  var collection = db.collection('documents');
		  // Update document where a is 2, set b equal to 1
		  collection.updateOne({ a : 2 }
		    , { $set: { b : 1 } }, function(err, result) {
		    assert.equal(err, null);
		    assert.equal(1, result.result.n);
		    console.log("Updated the document with the field a equal to 2");
		    callback(result);
		  });  
		}
	
	
*/