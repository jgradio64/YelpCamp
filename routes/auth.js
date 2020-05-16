var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// LANDING PAGE
router.get('/', (req, res) => {
	res.render('landing');
});

// REGISTER ROUTES
router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash('error', `ERROR: ${err.message}`);
			return res.redirect('register');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', `Welcome to YelpCamp ${user.username}`);
			res.redirect('/campgrounds');
		});
	});
});

// LOGIN ROUTES
router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;
