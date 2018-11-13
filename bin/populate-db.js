const mongoose = require('mongoose');

const Photo = require('../models/photo-model.js');

mongoose
	.connect('mongodb://localhost/apex', {useNewUrlParser: true})
	.then(x => {
	console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	})
	.catch(err => {
	console.error('Error connecting to mongo', err)
	});

const Flickr = require('flickrapi');
flickrOptions = {
		api_key: "97bda13ff6fcf92c6e75fb345fe56e5c",
		secret: "58ed5e732758decb"
    };

let photoArray = [];

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
	flickr.photos.search({
		user_id: flickr.options.user_id,
		page: 1,
		per_page: 30000,
		ispublic: 1,
		has_geo: 1,
	}, function(err, result) {
		result.photos.photo.forEach(onePhoto => {
			flickr.photos.geo.getLocation ({
				user_id: flickr.options.user_id,
				photo_id: onePhoto.id,
			}, function(err, result) {
				onePhoto.geo = result.photo.location;
			})
			photoArray.push(onePhoto);
			console.log(`added PHOTO ${onePhoto.id} `)


		})
					
	})
	.then(() => {
			photoArray.forEach(onePhoto => {
				
				Photo.create(onePhoto)
				.then(() => {
					console.log("added photo to DB");				
				})
				.catch(err => {
					console.log("photo add FAILURE", err)
				});
			});
		}) 		
	
});








