var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../database');
var h = require('./helper');

var allowedParams = ['id', 'userId', 'itemsList', 'total', 'grandTotal', 'taxes', 'status', 'createdAt'];

router.post('/create', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);
	var orderData = new db.order(req.body)
	
	orderData.save(function(err, saveResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(saveResult);
		}
	});
});	

router.get('/', function(req, res) {
	db.order.find().exec(function(err, getResult) {
		res.send(getResult);
	});
});

router.get('/:id', function(req, res) {
	// get all details of order by id
	db.order.find({_id:req.params.id}).populate('userId itemsList').exec(function(err, getResultById) {
		// if you get the results you can continue ...
		if(getResultById.length > 0) {
			var resObj = getResultById[0].toObject(); // convert mongoose document to plain javascript object
			resObj.userId.address = undefined;
			resObj.userId.pwd = undefined;
			
			// add new key for user and remove old key
			resObj["user"] = resObj["userId"];
			resObj["userId"] = undefined;

			// function for getting detail of shop by id
			var returnShopDetail = function(itemObj) {
				return function(callback) {
					db.shops.find({_id: itemObj.shopId}).exec(function(err, shopResult) { // RESULTS ARE ALWAYS IN ARRAY
						if (shopResult.length > 0) {
							callback(err, shopResult[0]);
						} else {
							callback(err, {});
						}
					});
				}
			}
			// create an array of function for async
			var getData = [];
			for (var i = 0; i < resObj.itemsList.length; i++) {
				getData.push(returnShopDetail(resObj.itemsList[i])); 
			}
			async.parallel(getData, function(err, result) {
				// get object from result
				for (var i = 0; i < resObj.itemsList.length; i++) {
					resObj.itemsList[i].shopDetail = result[i];
				}
				console.log(result);
				res.send(resObj);
			});
		} else {
			res.send(getResultById);
		}

	});
});

router.put('/update', function(req, res) {
	req.body = h.filterAllowedParams(req.body, allowedParams);

	db.order.update({"_id":req.body.id}, req.body, function(err, updateResult) {
		if (err) {
			res.send(err);
		} else {
			res.send(updateResult);
		}
	});
});

router.delete('/:id', function(req, res) {
	db.order.remove({_id: req.params.id}, function(err, result) {
		res.send(result);
	});
});

module.exports = router;