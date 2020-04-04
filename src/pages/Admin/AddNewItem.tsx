import React from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';

const AddNewItem: React.FC = () => {
  return (
    <AdminLayout>
      <MainHeader text="Add New Item" />
    </AdminLayout>
  );
};

export default AddNewItem;
