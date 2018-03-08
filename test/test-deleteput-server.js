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
			.get('/deleteput')
			.then(function(res){
				updateData.id = res.body[0].id;
				return chai.request(app)
					.put(`/deleteput/${updateData.id}`)
					.send(updateData);
			})
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(updateData);
			});
	});

	it('should delete items on DELETE', function(){
		return chai.request(app)
			.get('/deleteput')
			.then(function(res){
				return chai.request(app)
					.delete(`/deleteput/${res.body[0].id}`);
			})
			.then(function(res){
				expect(res).to.have.status(204);
			})
	})
})