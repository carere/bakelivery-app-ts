import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        ...state,
        products: [...state.products, action.payload.id],
        total: state.total + action.payload.price,
      };
    },
  },
});

export default slice.reducer;
export const { add } = slice.actions;
