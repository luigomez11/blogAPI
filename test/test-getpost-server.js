const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Get Post', function(){
	before(function(){
		return runServer();
	});
	after(function(){
		return closeServer();
	});

	it('should list items on GET', function(){
		return chai.request(app)
			.get('/getpost')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('array');
				expect(res.body.length).to.be.at.least(1);

				const expectedKeys = ['title', 'content', 'author', 'publishDate'];

				res.body.forEach(function(item){
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				});
			});
	});

	it('should add an item on POST', function(){
		const newItem = {
			title: 'workout',
			content: 'pushup',
			author: 'me',
			publishDate: 'today'
		};
		return chai.request(app)
			.post('/getpost')
			.send(newItem)
			.then(function(res){
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('id','title','content', 'author', 'publishDate');
				expect(res.body.id).to.not.equal(null);
				expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
			});
	});
});