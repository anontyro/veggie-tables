import React from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { CartState } from '../../redux/modules/cart/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import * as cartActions from '../../redux/modules/cart/actions';
import { cancelButton } from '../../components/Buttons/btnStyles';

const gridHeaderClasses = 'col-span-1 font-bold text-teal-700';

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  const cartState: CartState = useSelector((state: RootState) => state.userCart);
  const { cart } = cartState;

  return (
    <MainLayout>
      <React.Fragment>
        <MainHeader text="Cart" />
        <div className="grid grid-cols-3 gap-2 sm:m-auto sm:w-4/5 text-center">
          <div className={gridHeaderClasses}>Actions</div>
          <div className={gridHeaderClasses}>Item</div>
          <div className={gridHeaderClasses}>Total SGD</div>

          {cart.map(cartItem => (
            <React.Fragment key={cartItem.item.id}>
              <div key={`modify-${cartItem.item.id}`} className="col-span-1">
                <button
                  className={cancelButton}
                  onClick={() => dispatch(cartActions.removeItemFromCart(cartItem.item.id))}
                >
                  Remove
                </button>
              </div>
              <div key={`name-${cartItem.item.id}`} className="col-span-1">
                {cartItem.item.name}
              </div>
              <div key={`price-${cartItem.item.id}`} className="col-span-1">
                {cartItem.item.unitPrice * cartItem.quantity}
              </div>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    </MainLayout>
  );
};

export default Cart;
