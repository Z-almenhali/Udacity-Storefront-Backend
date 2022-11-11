import app from '../server';
import supertest from 'supertest';

const request = supertest(app.app);
describe('Test order endpoint', () => {
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

  it('post a new order', async () => {
    const res = await request.post('/orders').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });

  it('post a new order missing token', async () => {
    const res = await request.post('/orders');
    expect(res.status).toBe(401);
  });

  it('get all orders', async () => {
    const res = await request.get('/orders').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });

  it('get specific not found order', async () => {
    const res = await request.get('/orders/-1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(404);
  });

  it('get specific order', async () => {
    const res = await request.get('/orders/1').set({ Authorization: `Baerer ${test_user_token}` });
    expect(res.status).toBe(200);
  });

  it('add product to order', async () => {
    const create_product_res = await request
      .post('/products')
      .set({ Authorization: `Baerer ${test_user_token}` })
      .send({
        name: 'Ice tea',
        price: 2,
        category: 'Drinks'
      });
    const product_id = create_product_res.body.id;

    const create_order_res = await request.post('/orders').set({ Authorization: `Baerer ${test_user_token}` });
    const order_id = create_order_res.body.id;

    const res = await request
      .post(`/orders/${order_id}/products`)
      .set({ Authorization: `Baerer ${test_user_token}` })
      .send({
        productId: product_id,
        quantity: 2
      });
    expect(res.status).toBe(200);
  });
});
