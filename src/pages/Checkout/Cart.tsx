import React from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';

const Cart: React.FC = () => {
  return (
    <MainLayout>
      <React.Fragment>
        <MainHeader text="Cart" />
      </React.Fragment>
    </MainLayout>
  );
};

export default Cart;
