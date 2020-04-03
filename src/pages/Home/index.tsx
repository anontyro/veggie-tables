import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import MainLayout from '../_layout/MainLayout';
import { StockState } from '../../redux/modules/stock/reducer';
import { MainHeader } from '../../components/Headers/MainHeader';
import StockListItem from '../../components/Stock/StockListItem';

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
            <StockListItem key={item.id} item={item} />
          ))}
        </div>
      </React.Fragment>
    </MainLayout>
  );
};

export default HomePage;
