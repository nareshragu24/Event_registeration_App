var mongoose = require('mongoose');
const shortid = require('shortid');

var imageSchema = new mongoose.Schema({
  _id:{
    type: String,
    default: shortid.generate
  },
  date:{
    type:String,
  },
  name: String,
	email: {
    type:String,
    unique: true,
    required: true
  },
  ticket: Number,
  phone: {
    type: Number,
    unique: true,
    required: true
  },
  Regtype: {
		type: String
	},
	img:
	{
		data: Buffer,
		contentType: String
	}
},{
  timestamps: true
});
//users is the collection created in db
module.exports = new mongoose.model('users', imageSchema);
