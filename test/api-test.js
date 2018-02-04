const supertest = require('supertest');
require('chai').should();

const server = supertest.agent('http://localhost:8080');

describe('api.js', function () {
    describe('GET /api/rooms', function () {
        it('should return a list of rooms', function (done) {
            server.get('/api/rooms')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.not.empty;
                    done();
                });
        });
    });

    describe('GET /api/rooms/:roomId/messages', function () {
        it('should return a list of messages associated with the input room id', function (done) {
            let roomId = 'f2754172-1c58-41ed-ae84-74e046888adb';
            server.get('/api/rooms/' + roomId + '/messages')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.should.not.be.empty;
                    res.body.room.should.not.be.null;
                    res.body.messages.length.should.at.least(3);
                    done();
                });
        });
    });

    describe('POST /api/rooms/:roomId/messages', function () {
        it('should return 201', function (done) {
            let roomId = 'f2754172-1c58-41ed-ae84-74e046888adb';
            server.post('/api/rooms/' + roomId + '/messages')
                .send({text: 'my-test'})
                .expect(201)
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                });
        })
    });

    describe('DEL /api/rooms/:roomId/messages', function () {
        it('should return 204', function (done) {
            let roomId = 'f2754172-1c58-41ed-ae84-74e046888adb';
            server.delete('/api/rooms/' + roomId + '/messages')
                .expect(204)
                .end((err, res) => {
                    res.status.should.equal(204);
                    done();
                });
        })
    });
})