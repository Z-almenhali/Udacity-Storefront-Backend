import Client from '../database';

export type product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM product WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: product): Promise<product> {
    try {
      const sql = 'INSERT INTO product ( name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
