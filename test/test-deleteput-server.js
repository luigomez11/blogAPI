const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Delete Put', function(){
	before(function(){
		return runServer();
	});
	after(function(){
		return closeServer();
	});

	it('should update items on PUT', function(){
		const updateData = {
			title: 'workout2',
			content: 'pullups',
			author: 'someone',
			publishDate: 'yesterday'
		};
		return chai.request(app)
			.get('/getpost')
			.then(function(res){
				updateData.id = res.body[0].id;
				return chai.request(app)
					.put(`/deleteput/${updateData.id}`)
					.send(updateData);
			})
			.then(function(res){
				expect(res).to.have.status(204);
			});
	});

	it('should delete items on DELETE', function(){
		return chai.request(app)
			.get('/getpost')
			.then(function(res){
				return chai.request(app)
					.delete(`/deleteput/${res.body[0].id}`);
			})
			.then(function(res){
				expect(res).to.have.status(204);
			})
	})
})