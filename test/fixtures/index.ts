import { nanoid } from '@reduxjs/toolkit';
import { Product } from '../../src/redux/slices/product.slice';

export const ZionProduct: Product = {
  id: nanoid(),
  name: 'Zion Midnight',
  price: 20.0,
  status: 'Available',
};

export const SnakeProduct: Product = {
  id: nanoid(),
  name: 'Snake Sun',
  price: 40.0,
  status: 'Available',
};

export const ElephantProduct: Product = {
  id: nanoid(),
  name: 'Elephant Tor',
  price: 10.0,
  status: 'NotAvailable',
};

export const TurtleProduct: Product = {
  id: nanoid(),
  name: 'Turtle Poise',
  price: 60.0,
  status: 'Available',
};
