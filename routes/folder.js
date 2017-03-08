var express = require('express');
var router = express.Router();
var db = require('../database');
var fs = require('fs');
var dir = './tmp';

// create new folder
router.post('/', function(req, res, next) {
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	    res.send('ok');
	}	

});

router.delete('/delete', function(req, res, next) {
	if (fs.existsSync(dir)) {
		fs.unlink('./tmp/world', (err) => {
  			if (err) throw err;
  			res.send('successfully deleted /tmp/world');
		});
	}
});

module.exports = router;