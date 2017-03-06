var express = require('express');
var router = express.Router();
var db = require('../database');
var h = require('./helper');
var allowedParams = ['id', 'shopId', 'categoryId', 'name', 'imgArray', 'prize', 'quantity', 'createdAt']

router.post('/create', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);
	console.log('ok');
	var data = new db.item(req.body);
	console.log('ok1');
	data.save(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).send(result);
		}
	});
});

router.get('/', function(req, res) {
	db.item.find().exec(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	})
});

router.get('/:id', function(req, res) {
	db.item.find({_id:req.params.id}).exec(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	})
});

router.put('/update', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams)
	db.item.update({_id:req.body.id}, req.body, function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

router.delete('/:id', function(req, res) {
	db.item.remove({_id:req.params.id}, function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});


module.exports = router;