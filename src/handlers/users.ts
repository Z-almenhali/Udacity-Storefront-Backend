import { Router, Request, Response } from 'express';
import { user, User } from '../models/user';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/middleware';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const store = new User();

const index = async (_req: Request, res: Response) => {

  try {
    const user = await store.index();
  res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }

};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }

};

const create = async (req: Request, res: Response) => {
  const user: user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user_id: newUser.id }, TOKEN_SECRET as string);
    res.json({
      ...newUser,
      token: token
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const route = Router();

route.get('/',middleware.validateJwt, index);
route.get('/:id', middleware.validateJwt,show);
route.post('/', create);

export default route;
