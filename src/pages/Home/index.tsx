import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import MainLayout from '../_layout/MainLayout';
import { StockState } from '../../redux/modules/stock/reducer';
import { MainHeader } from '../../components/Headers/MainHeader';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const stockState: StockState = useSelector((state: RootState) => state.stock);
  const { stockList, isBusy } = stockState;

  useEffect(() => {
    dispatch(stockActions.fetchStockList());
  }, []);

  return (
    <MainLayout isBusy={isBusy}>
      <React.Fragment>
        <MainHeader text="Home" />
        <div className="flex flex-row flex-wrap">
          {stockList.map(item => (
            <div
              key={item.id}
              className="p-2 m-2 bg-gray-300 hover:bg-gray-500 rounded border-gray-400 w-48 h-56 flex flex-col"
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                console.log('go to item page');
              }}
            >
              <img
                src={`${item.imageUrl}`}
                alt={item.name}
                className="object-fill w-32 h-32 flex m-auto rounded"
              />
              <span className="text-center text-lg">{item.name.toUpperCase()}</span>
              <button
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  console.log('add to cart');
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </React.Fragment>
    </MainLayout>
  );
};

export default HomePage;
