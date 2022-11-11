import { Router, Request, Response } from 'express';
import { product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const product = await store.index();
  res.json(product);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  if (!product) {
    return res.sendStatus(404);
  }
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product: product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const route = Router();

route.get('/', index);
route.get('/:id', show);
route.post('/', create);

export default route;
