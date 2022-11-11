import app from '../server';
import supertest from 'supertest';

const request = supertest(app.app);
describe('Test user endpoint', () => {
  let test_user_token = '';

  beforeAll(async () => {
    const res = await request.post('/users').send({
      firstname: 'test',
      lastname: 'user',
      password: 'test123'
    });
    expect(res.status).toBe(200);
    test_user_token = res.body.token;
  });

  it('post a new user', async () => {
    const res = await request.post('/users').send({
      firstname: 'test',
      lastname: 'user',
      password: 'test123'
    });
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe('test');
    expect(res.body.lastname).toBe('user');
  });

  it('get all users', async () => {
    const res = await request.get('/users').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });
  it('get specific user', async () => {
    const res = await request.get('/users/1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });
  it('get specific user not found', async () => {
    const res = await request.get('/users/-1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(404);
  });
});
