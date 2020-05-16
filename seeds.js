var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: "Cloud's Rest",
		image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Mount Rinjani',
		image:
			'https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2555&q=80',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Rockies',
		image:
			'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Oeschinen Lake',
		image:
			'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1859&q=80',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Granite Hill',
		image: 'https://destinationgettysburg.com/wp-content/uploads/spotlight-ads/granite-hill-camping-resort-m.jpg',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	},
	{
		name: 'Potato Creek',
		image:
			'https://thedyrt.imgix.net/photo/807/photo/indiana-potato-creek-state-park-family-campground_cf59c025e34c5f339b4beb0681e9d18b.jpg?ixlib=rb-3.1.1',
		description:
			'Bacon ipsum dolor amet pastrami venison hamburger tongue pork loin, strip steak bresaola picanha ham beef ribs swine flank leberkas salami alcatra. Cupim alcatra kevin, beef picanha buffalo strip steak biltong tongue pork prosciutto pork chop hamburger bacon. Ham short loin landjaeger, chislic pig venison capicola hamburger pork loin tongue t-bone shank. Tri-tip venison kielbasa, kevin pork chop ham tail strip steak rump. Salami doner pastrami, corned beef beef ribs pork tri-tip ribeye filet mignon short ribs tongue.',
		author: {
			id: '5ebb46c1de4bfb31b8a42954',
			name: 'Ben Eich'
		}
	}
];

function seedDB() {
	// Remove all campgrounds
	Campground.deleteMany({}, (err) => {
		if (err) {
			console.log(err);
		}
		console.log('Removed Campgrounds');
		Comment.deleteMany({}, (err) => {
			if (err) {
				console.log(err);
			}
			console.log('Removed comments!');
			// add a few campgrounds
			data.forEach((seed) => {
				Campground.create(seed, (err, campground) => {
					if (err) {
						console.log(err);
					} else {
						// create a comment
						Comment.create(
							{
								author: {
									id: '5ebb46c1de4bfb31b8a42954',
									name: 'Ben Eich'
								},
								text: 'This place is great, but I wish there was internet'
							},
							(err, comment) => {
								if (err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
								}
							}
						);
					}
				});
			});
		});
	});
}

module.exports = seedDB;
