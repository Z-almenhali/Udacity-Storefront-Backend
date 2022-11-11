import Client from '../database';
import * as bcrypt from 'bcrypt';

export type user = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class User {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM "user"';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM "user" WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO "user" (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING id, firstname, lastname';
      const conn = await Client.connect();

      const hash = bcrypt.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string));

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
    }
  }
}
