import Client from '../database';
export type order = {
  id?: string;
  status: string;
  user_id: number;
};

export class Order {
  async index(): Promise<order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`);
    }
  }

  async show(id: string): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${id}`);
    }
  }

  async create(orders: order): Promise<order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *;';
      const result = await conn.query(sql, [orders.status, orders.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Order ${orders.id}: ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<order> {
    try {
      const sql = 'INSERT INTO order_products (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}
