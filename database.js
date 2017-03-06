var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// connection with mongodb
mongoose.connect('mongodb://localhost/sweetFood');

mongoose.connection.on('error', console.error.bind(console, 'Connection error'));

mongoose.connection.once('open', function() {
	console.log('database connected.');
});

var db = {}

var userSchema = new mongoose.Schema({
								id: String,
								fname: String,
								lname: String,
								address: Object,
								phone: Object,
								email: String,
								pwd: String,
								createdAt: Date
}, {
	versionKey: false
});

var itemsSchema = new mongoose.Schema({
								id: String,
								shopId: {
									type:mongoose.Schema.Types.ObjectId,
									ref:'shops'
								},
								categoryId: {
									type:mongoose.Schema.Types.ObjectId,
									ref:'itemCategories'
								},
								name: String,
								imgArray: Array,
								prize: Number,
								quantity: String,
								createdAt: {
										type: Date,
										Default: Date.now
								}
}, {
	versionKey: false
});

var shopsSchema = new mongoose.Schema({
								id: String,
								name: String,
								address: Object,
								info: String,
								description: String,
								createdAt: {
									type: Date,
									Default: Date.now
								}
}, {
	versionKey: false
});

var orderSchema = new mongoose.Schema({
								id: String,
								userId: {
									type: mongoose.Schema.Types.ObjectId,
									ref: 'users'	
								},
								itemsList: [{ type : mongoose.Schema.Types.ObjectId, ref: 'items' }],
								total: Number,
								grandTotal: Number,
								taxes: Number,
								status: String,
								createdAt: {
									type: Date,
									Default: Date.now
								}
}, {
	versionKey: false
});
var itemCategorySchema = new mongoose.Schema({
								id: String,
								categoryName: String,
								createdAt: {
									type: Date,
									Default: Date.now
								}
}, {
	versionKey: false
});
db.user = mongoose.model('users',userSchema);
db.item = mongoose.model('items', itemsSchema);
db.shops = mongoose.model('shops', shopsSchema);
db.order = mongoose.model('orders', orderSchema);
db.itemCategory = mongoose.model('itemCategories', itemCategorySchema);

module.exports = db;