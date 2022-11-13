import { Router, Request, Response } from 'express';
import { order, Order } from '../models/order';
import jwt from 'jsonwebtoken';
const store = new Order();

const index = async (_req: Request, res: Response) => {
  try {
    const order = await store.index();
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
 
};

const show = async (req: Request, res: Response) => {
//=====
  try {
    const order = await store.show(req.params.id);
    if (!order) {
      return res.sendStatus(404);
    }
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }


};

const create = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization as string;
  const token = authorizationHeader.split(' ')[1];

  const order: order = {
    user_id: jwt.decode(token, { json: true })?.user_id,
    status: 'active'
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const route = Router();

route.get('/', index);
route.get('/:id', show);
route.post('/', create);
route.post('/:id/products', addProduct);

export default route;
