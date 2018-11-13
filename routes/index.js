const express = require('express');
const router  = express.Router();

//flickr setup
const Flickr = require('flickrapi');
flickrOptions = {
      api_key: "97bda13ff6fcf92c6e75fb345fe56e5c",
      secret: "58ed5e732758decb"
    };



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/search', (req, res, next) => {
	const { query } = req.query;

	res.locals.originalQuery = query

	query.replace(" ", "+");
	console.log(query);

	res.locals.userQuery = query;
	res.render('map');
});


router.get("/flickr", (req, res, next) => {
	// const oauth = flickr.auth.oauth.getAccessToken({api_key: '97bda13ff6fcf92c6e75fb345fe56e5c'})
	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
	flickr.photos.geo.getLocation({
		user_id: flickr.options.user_id,
		photo_id: "45860112131"
	}, function(err, result) {
			console.log(result)
  			res.send(result);
	});
});
	


	// flickr.photos.search( { ispublic: 1, has_geo: 1, } )
	// 	.then(result => {
	// 		res.send(result);
	// 	})


	
})

module.exports = router;
