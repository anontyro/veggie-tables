import React, { useEffect } from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StockState } from '../../redux/modules/stock/reducer';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import AddToCart from '../../components/Buttons/AddToCart';
import { StockItem } from '../../../types/Stock';

const Item: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const stockState: StockState = useSelector((state: RootState) => state.stock);
  const { currentItem } = stockState;

  useEffect(() => {
    dispatch(stockActions.fetchItemDetail(+id));
  }, []);

  return (
    <MainLayout isBusy={stockState.isBusy}>
      {currentItem && (
        <React.Fragment>
          <MainHeader text={`${currentItem?.item?.name}`} />
          <div className="flex flex-row flex-wrap sm:w-5/6 sm:m-auto">
            <div className="m-6">
              <img
                src={`${currentItem?.item?.imageUrl}`}
                alt={currentItem?.item?.name}
                className="object-fill w-32 h-32 flex rounded"
              />
              <AddToCart item={currentItem as StockItem} styles="w-full" />
            </div>
            <div className="m-6 flex-grow">
              <p>{currentItem?.item?.description}</p>
            </div>
          </div>
        </React.Fragment>
      )}
    </MainLayout>
  );
};

export default Item;
