var express = require('express');
var router = express.Router();
var db = require('../database');
var h = require('./helper');
var allowedParams = ['id', 'name', 'address', 'info', 'description', 'createdAt'];


router.post('/create', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);
	console.log(req.body);
	var data = new db.shops(req.body);
	console.log(data);

	data.save(function(err, saveResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(saveResult);
		}
	});
});

router.get('/', function(req, res) {
	db.shops.find().exec(function(err, getResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(getResult);
		}
	});
});

router.get('/:id', function(req, res) {
	db.shops.find({_id:req.params.id}).exec(function(err, getResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(getResult);
		}
	});
});

router.put('/update', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);

	db.shops.update({_id: req.body.id}, req.body, function(err, updateResult){
		if (err) {
			res.send(err);
		} else {
			res.send(updateResult);
		}
	});
});

router.delete('/:id', function(req, res) {
	db.shops.remove({_id: req.params.id}, function(err,deleteResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(deleteResult);
		}
	});
});

module.exports = router;