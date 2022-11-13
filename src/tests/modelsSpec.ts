import { product, ProductStore } from '../models/product';
import { user, User } from '../models/user';
import { order, Order } from '../models/order';

const p = new ProductStore();
const u = new User();
const o = new Order();

describe('product model test', () => {
  it('fetch all products', async function () {
    const product: product = {
      name: "Hp Laptop",
      price: 4500,
      category: "Laptop"
    }
    await p.create(product)
    const products = await p.index()

    expect(products.length).toBeGreaterThan(0);
  });

  it('fetch one product', async function () {
    const product: product = {
      name: "Hp Laptop",
      price: 4500,
      category: "Laptop"
    }

    const product_DB = await p.create(product)
    const result = await p.show(product_DB.id as string)
    expect(result.name).toBe("Hp Laptop");
    expect(result.id).toBe(product_DB.id);
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

describe('user model test', () => {
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

  it('fetch all users', async function () {
    const NewUser: user = {
      firstname: 'Hesham',
      lastname: 'Ali',
      password: 'password321'
    };
    await u.create(NewUser)
    const users = await u.index()
    expect(users.length).toBeGreaterThan(0);
  });

  it('fetch one user', async function () {
    const NewUser: user = {
      firstname: 'Hesham',
      lastname: 'Ali',
      password: 'password321'
    };
    const user_DB = await u.create(NewUser)
    const result = await u.show(user_DB.id as string)
    expect(result.firstname).toBe("Hesham");
    expect(result.id).toBe(user_DB.id);
  });
});

describe('order model test', () => {
  it('fetch all orders', async function () {
    const order: order = {
      status: "active",
      user_id: 1
    }
    await o.create(order)
    const orders = await o.index()
    expect(orders.length).toBeGreaterThan(0);
  });

  it('fetch one order', async function () {
    const order: order = {
      status: "active",
      user_id: 1
    }

    const order_DB = await o.create(order)
    const result = await o.show(order_DB.id as string)
    expect(result.status).toBe("active");

  });

  it('create method should create an order', async () => {
    const result = await o.create({
      status: 'active',
      user_id: 1
    });
    expect(result.status).toBe('active');
  });
});