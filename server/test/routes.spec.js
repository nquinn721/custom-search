const request = require('supertest'),
      expect = require('chai').expect;


describe('loading express', () => {
  let app;
    beforeEach(() => {
        app = require('../../app');
    });
    afterEach(() => {
        app.close();
    });

    it('should login', (done) => {
        request(app)
            .post('/login')
            .send({username: 'nate', password: 'nate123'})
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                expect(response.body.loggedIn).to.equal(true);
                done();
            });
    });

    it('should fail login', (done) => {
        request(app)
            .post('/login')
            .send({username: 'nate', password: 'nate1234'})
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                expect(response.body.loggedIn).to.equal(false);
                done();
            });
    });

    it('responds with companies', (done) => {
        request(app)
            .post('/api/companies')
            .send({companies: [{name: 'nike'}]})
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                expect(response.body[0].name).to.equal('nike');
                expect(response.body[0].domain).to.equal('https://www.nike.com/');
                done();
            });
    });

    it('responds with api call times', (done) => {
        request(app)
            .get('/api/api-call-times')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                if(response.body.length){
                    expect(response.body[0].apiCallTime).to.not.be.undefined;
                }
                done();
            });
    });

});