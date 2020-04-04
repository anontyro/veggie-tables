import React, { useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import { StockState } from '../../redux/modules/stock/reducer';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemList: React.FC = () => {
  const dispatch = useDispatch();
  const stockState: StockState = useSelector((state: RootState) => state.stock);
  const { stockList, isBusy } = stockState;

  useEffect(() => {
    dispatch(stockActions.fetchStockList());
  }, []);
  return (
    <AdminLayout>
      <React.Fragment>
        <MainHeader text="Item List" />
        <div className="flex flex-col">
          {stockList.map(stockItem => (
            <div key={stockItem.id} className="flex flex-col bg-gray-300 rounded m-4 h-48">
              <div className=" flex flex-row p-4 pb-0">
                <img
                  src={`${stockItem?.imageUrl}`}
                  alt={stockItem.name}
                  className="object-fill w-32 h-32 flex rounded"
                />
                <div className="flex flex-col flex-grow mx-6">
                  <h1>{stockItem.name}</h1>
                  <p>{`${stockItem.unitPrice} ${stockItem.currency}`}</p>
                  <p>{`Stock Level: ${stockItem.stockLevel}`}</p>
                  <Desc>{stockItem.description}</Desc>
                </div>
              </div>
              <div className="mx-6 text-right">
                <button className="text-purple-600 hover:text-purple-900 border border-purple-600 hover:border-purple-900 rounded py-1 px-4">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default ItemList;
