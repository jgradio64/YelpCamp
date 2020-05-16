var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
let middleware = require('../middleware');

// Comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
	// find campground by if
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: foundCampground });
		}
	});
});

// Comments create
router.post('/', middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					req.flash('error', 'Something went wrong.');
					console.log(err);
				} else {
					// ADD USERNAME AND ID TO COMMENT
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash('success', 'Comment sucessfully added.');
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});

// EDIT A COMMENT
router.get('/:comment_id/edit', middleware.isAuthorComment, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', { campgound_id: req.params.id, comment: foundComment });
		}
	});
});

// UPDATE COMMENT ROUTE
router.put('/:comment_id', middleware.isAuthorComment, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

// DESTROY ROUTE
router.delete('/:comment_id', middleware.isAuthorComment, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted.');
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

module.exports = router;
