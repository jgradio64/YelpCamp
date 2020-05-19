let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	flash = require('connect-flash'),
	LocalStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	seedDB = require('./seeds'),
	User = require('./models/user'),
	Comment = require('./models/comment');

// require routes
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	authRoutes = require('./routes/auth');

// MONGOOSE SETUP

let url = process.env.DATABASEURL || 'mongodb://localhost:27017/yelpCamp';

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to db');
	})
	.catch((err) => {
		console('ERROR', err.message);
	});

// mongoose.connect('mongodb://localhost:27017/yelpCamp', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

// SOLVE MONGOOSE DEPRICATION
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: 'Ning is an awesome cat',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// seedDB(); // SEED THE DATABAST

// Require routes
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/', authRoutes);

// Tell express to listen
var port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('YelpCamp server has started');
});
