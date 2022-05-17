import { createAsyncThunk } from '@reduxjs/toolkit';
import { add } from '../redux/slices/cart.slice';
import { AppDispatch, AppState } from '../redux/store';
import { selectors } from '../redux/slices/product.slice';
import { error } from '../redux/slices/notify.slice';
import { match, P } from 'ts-pattern';

export const addProduct = createAsyncThunk<
  unknown,
  string,
  { dispatch: AppDispatch; state: AppState }
>('cart/add-product', (id, { dispatch, getState }) => {
  const product = selectors.selectById(getState(), id);

  return match(product)
    .with(P.nullish, () => dispatch(error({ title: 'product-does-not-exist', description: id })))
    .with({ status: 'NotAvailable' }, () =>
      dispatch(error({ title: 'product-not-available', description: id })),
    )
    .with({ status: 'Available' }, ({ id, price }) => dispatch(add({ id, price })))
    .exhaustive();
});
