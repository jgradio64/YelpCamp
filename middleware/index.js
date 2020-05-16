// ALL THE MIDDLEWARE GOES HERE
let Campground = require('../models/campground');
var Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that.');
	res.redirect('/login');
};

middlewareObj.isAuthorComment = (req, res, next) => {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				req.flash('error', 'Error finding the comment.');
				res.redirect('back');
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You do not have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that.');
		res.redirect('back');
	}
};

middlewareObj.isAuthorCampground = (req, res, next) => {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampground) => {
			if (err) {
				req.flash('error', 'Error finding the campground.');
				res.redirect('back');
			} else {
				if (!foundCampground) {
					req.flash('error', 'Item not found.');
				}
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You do not have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that.');
		res.redirect('back');
	}
};

module.exports = middlewareObj;
