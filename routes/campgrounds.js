let express = require('express');
let router = express.Router();
let Campground = require('../models/campground');
let middleware = require('../middleware');

// INDEX - display a list of all dogs
router.get('/', (req, res) => {
	// get all campgrounds from DB
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds });
		}
	});
});

// CREATE - Add new campgrounds to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let descr = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = { name: name, price: price, image: image, description: descr, author: author };

	// Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// NEW - Display a form to make a new dog
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// PUT THIS AT THE END OF THE GET ROUTS
// SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
		if (err || !foundCampground) {
			req.flash('error', 'Sorry, that campground does not exist.');
			return res.redirect('/campgrounds');
		} else {
			//render show template with that campground
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.isAuthorCampground, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) req.flash('error', 'Campground is not found.');
		res.render('campgrounds/edit', { campground: foundCampground });
	});
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.isAuthorCampground, (req, res) => {
	// find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.isAuthorCampground, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground deleted.');
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
