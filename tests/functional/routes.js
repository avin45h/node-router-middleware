var request = require('supertest');
var should = require('should');
var app = require('../../server');


describe('Routes', function (done) {
    //GET VERB TEST CASES

    it('Should trigger GET @ http://localhost:8080/get', function (done) {
        request(app)
            .get('/get')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written everywhere via middleware 2, Get request');
                done();
            });
    });
    it('Should trigger GET @ http://localhost:8080/', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written at just / via middleware 1, Written everywhere via middleware 2, Get @ / request and Chaining works at / for get request');
                done();
            });
    });

    //POST VERB TEST CASES

    it('Should trigger POST @ http://localhost:8080/post', function (done) {
        request(app)
            .post('/post')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written everywhere via middleware 2, Post request');
                done();
            });
    });
    it('Should trigger POST @ http://localhost:8080/', function (done) {
        request(app)
            .post('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written at just / via middleware 1, Written everywhere via middleware 2, Post @ / request');
                done();
            });
    });

    //PUT VERB TEST CASES

    it('Should trigger PUT @ http://localhost:8080/put', function (done) {
        request(app)
            .put('/put')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written everywhere via middleware 2, Put request');
                done();
            });
    });
    it('Should trigger PUT @ http://localhost:8080/', function (done) {
        request(app)
            .put('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written at just / via middleware 1, Written everywhere via middleware 2, Put @ / request');
                done();
            });
    });

    //DELETE VERB TEST CASES

    it('Should trigger DELETE @ http://localhost:8080/delete', function (done) {
        request(app)
            .delete('/delete')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written everywhere via middleware 2, Delete request');
                done();
            });
    });
    it('Should trigger DELETE @ http://localhost:8080/', function (done) {
        request(app)
            .delete('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('Written at just / via middleware 1, Written everywhere via middleware 2, Delete @ / request');
                done();
            });
    });

    //RANDOM 404 TESTS

    it('Should NOT trigger GET @ http://localhost:8080/post', function (done) {
        request(app)
            .get('/post')
            .expect(404)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('404');
                done();
            });
    });

    it('Should NOT trigger POST @ http://localhost:8080/get', function (done) {
        request(app)
            .post('/get')
            .expect(404)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('404');
                done();
            });
    });

    it('Should NOT trigger PUT @ http://localhost:8080/post', function (done) {
        request(app)
            .put('/post')
            .expect(404)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('404');
                done();
            });
    });

    it('Should NOT trigger DELETE @ http://localhost:8080/put', function (done) {
        request(app)
            .delete('/put')
            .expect(404)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.be.equal('404');
                done();
            });
    });

});