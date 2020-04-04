import React from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';

const ItemList: React.FC = () => {
  return (
    <AdminLayout>
      <MainHeader text="Item List" />
    </AdminLayout>
  );
};

export default ItemList;
