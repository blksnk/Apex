const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
	id: { type: String, required: true },
	owner: { type: String, required: true },
	secret: { type: String, required: true },
	server: { type: String },
	farm: { type: Number },
	title: { type: String },
	ispublic: { type: Number, required: true, max: 1, min: 0 },
	isfriend: { type: Number, required: true, max: 1, min: 0 },
	isfamily: { type: Number, required: true, max: 1, min: 0 },
	geo: { type: Object, required: true },
}, {
	timestamps: true,
});


const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;