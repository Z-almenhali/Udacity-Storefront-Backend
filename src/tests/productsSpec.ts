import app from '../server';
import supertest from 'supertest';

const request = supertest(app.app);
describe('Test product endpoint', () => {
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

  it('post a new product', async () => {
    const res = await request
      .post('/products')
      .set({ Authorization: `Baerer ${test_user_token}` })
      .send({
        name: 'Ice tea',
        price: 2,
        category: 'Drinks'
      });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Ice tea');
    expect(res.body.price).toBe(2);
  });

  it('get all products', async () => {
    const res = await request.get('/products').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });

  it('get specific product', async () => {
    const res = await request.get('/products/1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });

  it('get specific product not found', async () => {
    const res = await request.get('/products/-1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(404);
  });
});
