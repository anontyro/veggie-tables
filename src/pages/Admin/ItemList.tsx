import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import { StockState } from '../../redux/modules/stock/reducer';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import { BACKEND_ROUTES } from '../../enum/routes';
import { removeButton } from '../../components/Buttons/btnStyles';

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

  const [removeId, setRemoveId] = useState(-1);
  useEffect(() => {
    const removeItem = async () => {
      try {
        await fetch(`${BACKEND_ROUTES.STOCK_ROOT}/${removeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRemoveId(-1);
        dispatch(stockActions.fetchStockList(true));
      } catch (err) {
        console.error(err);
      }
    };
    if (removeId > -1) {
      removeItem();
    }
  }, [removeId]);

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
                <button onClick={() => setRemoveId(stockItem.id)} className={removeButton}>
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
