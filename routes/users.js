var express = require('express');
var router = express.Router();
var db = require('../database');
var h = require('./helper');
var allowedParams = ['id', 'fname', 'lname', 'address', 'phone', 'email', 'pwd', 'createdAt'];

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.user.find().exec(function(err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(result);
		}
	});
});

router.get('/:id', function(req, res) {
	db.user.find({_id:req.params.id}).exec(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

router.post('/create', function(req, res, next) {

	req.body = h.filterAllowedParams(req.body, allowedParams);
	console.log(req.body);
		var data = new db.user(req.body);
			data.save(function(err, saveResult) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(saveResult);
				}
			});	
		});

router.put('/update', function(req,res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);
	db.user.update({_id: req.body.id}, req.body, {new:true}, function(err, updateResult) {
			if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(updateResult);
		}
	});
});

router.delete('/:id', function(req, res) {
	db.user.remove({_id: req.params.id}, function(err, deleteResult) {
			if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(deleteResult);
		}
	});
});

module.exports = router;
