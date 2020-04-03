import React from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useParams } from 'react-router-dom';

const Item: React.FC = () => {
  const { id } = useParams();
  return (
    <MainLayout>
      <React.Fragment>
        <MainHeader text={`item: ${id}`} />
      </React.Fragment>
    </MainLayout>
  );
};

export default Item;
