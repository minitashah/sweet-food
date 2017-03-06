var express = require('express');
var router = express.Router();
var db = require("../database");

router.post('/', function(req, res) {
	var data = new db.itemCategory(req.body);

	data.save(function(err, result) {
		res.send(result);
	});
});

router.get('/', function(req, res) {
	db.itemCategory.find().exec(function(err, result) {
		res.send(result);
	})
});

router.get('/:id', function(req, res) {
	db.itemCategory.find({_id:req.params.id}).exec(function(err, result) {
		res.send(result);
	})
});

router.put('/', function(req, res) {
	db.itemCategory.update({_id:req.body.id}, req.body, function(err, result) {
		res.send(result);
	});
});

router.delete('/:id', function(req, res) {
	db.itemCategory.remove({_id:req.params.id}, function(err, result) {
		res.send(result);
	});
});

module.exports = router;