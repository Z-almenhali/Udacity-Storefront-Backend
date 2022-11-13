import { Router, Request, Response } from 'express';
import { product, ProductStore } from '../models/product';
import middleware from '../middleware/middleware';
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await store.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
 
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    if (!product) {
      return res.sendStatus(404);
    }
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }

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
route.post('/',middleware.validateJwt, create);

export default route;
