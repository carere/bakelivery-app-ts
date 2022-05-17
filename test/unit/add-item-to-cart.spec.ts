/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-unused-expression */

import { createStore } from '../../src/redux/store';
import {
  store as storeProducts,
  selectors as productSelector,
} from '../../src/redux/slices/product.slice';
import { ElephantProduct, ZionProduct } from '../fixtures';
import { addProduct } from '../../src/handlers/add-product-to-cart';
import { selectors as notificationSelector } from '../../src/redux/slices/notify.slice';

describe('Adding a product to my basket,', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('when the product exist', () => {
    describe('and is also available', () => {
      it('should allow me to see the item in my basket', async () => {
        store.dispatch(storeProducts([ZionProduct]));
        await store.dispatch(addProduct(ZionProduct.id));
        expect(productSelector.selectIds(store.getState())).toEqual([ZionProduct.id]);
        expect(store.getState().app.cart.total).toEqual(ZionProduct.price);
      });
    });

    describe('and is not available', () => {
      it('should alert me that the product is not available', async () => {
        store.dispatch(storeProducts([ElephantProduct]));
        await store.dispatch(addProduct(ElephantProduct.id));
        expect(notificationSelector.selectAll(store.getState())).toContainEqual(
          expect.objectContaining({
            title: 'product-not-available',
            description: ElephantProduct.id,
          }),
        );
      });
    });
  });

  describe('when the product does not exist', () => {
    it('should alert me that the product does not exist', async () => {
      await store.dispatch(addProduct(ElephantProduct.id));
      expect(notificationSelector.selectAll(store.getState())).toContainEqual(
        expect.objectContaining({
          title: 'product-does-not-exist',
          description: ElephantProduct.id,
        }),
      );
    });
  });
});
