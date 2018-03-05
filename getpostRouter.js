const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//create some posts here
BlogPosts.create('Routine', 'Eat and sleep', 'me', '2018');
BlogPosts.create('Music', 'All kinds', 'me', '2018');
BlogPosts.create('Movies', 'Comedy', 'me', '2018');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i=0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
});

module.exports = router;