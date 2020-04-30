import React from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { CartState } from '../../redux/modules/cart/reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import CartList from './components/CartList';
import EmptyCart from './components/EmptyCart';

const Cart: React.FC = () => {
  const cartState: CartState = useSelector((state: RootState) => state.userCart);

  return (
    <MainLayout>
      <React.Fragment>
        <MainHeader text="Cart" />

        {cartState.cart.length > 0 ? <CartList /> : <EmptyCart />}
      </React.Fragment>
    </MainLayout>
  );
};

export default Cart;
