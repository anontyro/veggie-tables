import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import MainLayout from '../_layout/MainLayout';
import { StockState } from '../../redux/modules/stock/reducer';
import { MainHeader } from '../../components/Headers/MainHeader';
import CompactStockItemCard, {
  defaultStyle as stockCardStyle,
} from '../../components/Cards/CompactStockItemCard';
import AddToCart from '../../components/Buttons/AddToCart';

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
            <CompactStockItemCard key={item.id} item={item} style={`${stockCardStyle} h-56`}>
              <React.Fragment>
                <span className="text-center text-lg">{item.name.toUpperCase()}</span>
                <AddToCart item={item} />
              </React.Fragment>
            </CompactStockItemCard>
          ))}
        </div>
      </React.Fragment>
    </MainLayout>
  );
};

export default HomePage;
