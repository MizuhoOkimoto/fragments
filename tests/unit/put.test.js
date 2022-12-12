const request = require('supertest');
const app = require('../../src/app');
var path = require('path');

var updateFragment;
beforeAll(async () => {
  const res = await request(app)
    .post('/v1/fragments')
    .auth('user1@email.com', 'password1')
    .set({ 'Content-Type': 'text/plain' })
    .send('{"This is a new fragment"}');
    updateFragment = path.basename(res.headers.location);
  });

  describe(`put v1/fragments/${updateFragment}`, () => {
    // If the wrong username/password pair are used (no such user), it should be forbidden
    //test('unauthenticated requests are denied', () => request(app).post(`/v1/fragments/${updateFragment}`).expect(401));
  
    // If the wrong username/password pair are used (no such user), it should be forbidden
    //test('incorrect credentials are denied', () =>
      //request(app).put(`/v1/fragments/${updateFragment}`).auth('invalid@email.com', 'incorrect_password').expect(401));
  
    // Using a valid username/password pair should post fragments
    test('authenticated users are able to put fragment', async () => {
      const res = await request(app)
        .put(`/v1/fragments/${updateFragment}`)
        .auth('user1@email.com', 'password1')
        .send('This is fragment')
        .set({ 'Content-type': 'text/plain' });
      expect(res.statusCode).toBe(201);
    });

    // Using a valid username/password pair with unsupported content type return 415
//   test('authenticated users receive 415 from unsupported type', async () => {
//     const res = await request(app)
//       .put(`/v1/fragments/${updateFragment}`)
//       .send('This is fragment')
//       .set({ 'Content-type': 'invalid/invalid' })
//       .auth('user1@email.com', 'password1');
//     expect(res.statusCode).toBe(415);
//   });

});