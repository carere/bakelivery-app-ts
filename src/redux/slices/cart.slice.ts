import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { append } from 'ramda';

type CartState = {
  products: Array<string>;
  total: number;
};

const initialState: CartState = {
  products: [],
  total: 0.0,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ id: string; price: number }>) => {
      return {
        products: append(action.payload.id, state.products),
        total: state.total + action.payload.price,
      };
    },
  },
});

export default slice.reducer;
export const { add } = slice.actions;
