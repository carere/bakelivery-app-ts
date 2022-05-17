import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/product.slice';
import cart from './slices/cart.slice';
import notification from './slices/notify.slice';

export const createStore = () => {
  return configureStore({
    reducer: {
      domain: combineReducers({
        products,
      }),
      app: combineReducers({
        cart,
        notification,
      }),
    },
  });
};

// Used only to get the following types 'AppState' & 'AppDispatch'.
export const store = createStore();
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
