import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export type Product = {
  id: string;
  name: string;
  price: number;
  status: 'Available' | 'NotAvailable';
};

const adapter = createEntityAdapter<Product>({
  selectId: (crypto) => crypto.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const slice = createSlice({
  name: 'product',
  initialState: adapter.getInitialState(),
  reducers: {
    store: (state, action: PayloadAction<Product[]>) => {
      return adapter.upsertMany(state, action.payload);
    },
  },
});

export default slice.reducer;
export const { store } = slice.actions;
export const selectors = adapter.getSelectors((state: AppState) => state.domain.products);
