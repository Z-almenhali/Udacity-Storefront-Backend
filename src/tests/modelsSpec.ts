import { product, ProductStore } from '../models/product';
import { user, User } from '../models/user';
import { Order } from '../models/order';

const p = new ProductStore();
const u = new User();
const o = new Order();

describe('product model test', () => {
  it('should have an index method', async () => {
    expect(p.index).toBeDefined();
  });

  it('should have an show method', async () => {
    expect(p.show).toBeDefined();
  });

  it('should have an create method', async () => {
    expect(p.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const NewProduct: product = {
      name: 'phone',
      price: 250,
      category: 'electronics'
    };
    const result = await p.create(NewProduct);
    expect(result.name).toBe('phone');
    expect(result.price).toBe(250);
    expect(result.category).toBe('electronics');
  });
});

describe('order model test', () => {
  it('should have an index method', async () => {
    expect(o.index).toBeDefined();
  });

  it('should have an show method', async () => {
    expect(o.show).toBeDefined();
  });

  it('should have an create method', async () => {
    expect(o.create).toBeDefined();
  });

  it('create method should create an order', async () => {
    const result = await o.create({
      status: 'active',
      user_id: 1
    });
    expect(result.status).toBe('active');
  });
});

describe('user model test', () => {
  it('should have an index method', async () => {
    expect(u.index).toBeDefined();
  });

  it('should have an show method', async () => {
    expect(u.show).toBeDefined();
  });

  it('should have an create method', async () => {
    expect(u.create).toBeDefined();
  });

  it('create method should create a user', async () => {
    const NewUser: user = {
      firstname: 'Hesham',
      lastname: 'Ali',
      password: 'password321'
    };
    const result = await u.create(NewUser);
    expect(result.firstname).toBe('Hesham');
    expect(result.lastname).toBe('Ali');
  });
});
