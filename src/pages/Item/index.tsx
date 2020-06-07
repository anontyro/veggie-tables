/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import MainLayout from '../_layout/MainLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StockState } from '../../redux/modules/stock/reducer';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import AddToCart from '../../components/Buttons/AddToCart';
import { StockItem, StockDetails } from '../../../types/Stock';
import ItemDetailItem from './components/ItemDetailItem';

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
          <div className="flex flex-col sm:w-5/6 m-6 sm:m-auto">
            <MainHeader text={`${currentItem?.item?.name}`} classOverride="uppercase" />
            <div className="flex flex-row flex-wrap mb-6">
              <div className="flex-grow">
                <img
                  src={`${currentItem?.item?.imageUrl}`}
                  alt={currentItem?.item?.name}
                  className="object-fill w-32 h-32 flex rounded"
                />
              </div>
              <div className="ml-6 flex-grow">
                <div className="text-2xl my-2 text-left">{`Price: ${currentItem.item.currency} ${currentItem.item.unitPrice}`}</div>
                <div className="w-32">
                  <AddToCart item={currentItem.item as StockItem} styles="w-full" />
                </div>
              </div>
            </div>
            <p className="">{currentItem?.item?.description}</p>
            <div className="item-info flex-col py-6">
              {currentItem?.details.length > 0 && (
                <ItemDetailItem detailList={currentItem.details as StockDetails[]} />
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </MainLayout>
  );
};

export default Item;
