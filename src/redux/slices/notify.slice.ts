import { createEntityAdapter, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

type Type = 'error' | 'info' | 'warning';
type Title = 'product-does-not-exist' | 'product-not-available';

export type Notification = {
  id: string;
  title: Title;
  type: Type;
  description: string;
};

const adapter = createEntityAdapter<Notification>({
  selectId: (crypto) => crypto.id,
  sortComparer: (a, b) => a.type.localeCompare(b.type),
});

const slice = createSlice({
  name: 'notification',
  initialState: adapter.getInitialState(),
  reducers: {
    error: (state, action: PayloadAction<{ title: Title; description: string }>) => {
      return adapter.addOne(state, {
        id: nanoid(),
        type: 'error',
        title: action.payload.title,
        description: action.payload.description,
      });
    },
  },
});

export default slice.reducer;
export const { error } = slice.actions;
export const selectors = adapter.getSelectors((state: AppState) => state.app.notification);
