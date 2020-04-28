import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import { StockState } from '../../redux/modules/stock/reducer';
import { RootState } from '../../redux';
import * as stockActions from '../../redux/modules/stock/actions';
import { FRONTEND_ROUTES } from '../../enum/routes';
import { removeButton } from '../../components/Buttons/btnStyles';
import { useHistory } from 'react-router-dom';
import HTTP_VERB from '../../enum/http';

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stockState: StockState = useSelector((state: RootState) => state.stock);
  // const authHeader = useSelector((state: RootState) => getBearerHeader(state.user));
  const {
    stockList,
    update: { isUpdating },
  } = stockState;

  useEffect(() => {
    dispatch(stockActions.fetchStockList());
  }, []);

  const [removeId, setRemoveId] = useState(-1);
  useEffect(() => {
    if (removeId > -1) {
      dispatch(
        stockActions.updateItem({ id: removeId }, HTTP_VERB.DELETE, () => {
          setRemoveId(-1);
          dispatch(stockActions.fetchStockList(true));
        })
      );
      // itemFetcher({
      //   url: `${BACKEND_ROUTES.STOCK_ROOT}/${removeId}`,
      //   method: HTTP_VERB.DELETE,
      //   extraHeaders: authHeader,
      //   onFetched: () => {
      //     setRemoveId(-1);
      //     dispatch(stockActions.fetchStockList(true));
      //   },
      // });
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
              <div className="flex mx-6 text-right justify-end">
                <button
                  disabled={isUpdating}
                  onClick={() =>
                    history.push(`${FRONTEND_ROUTES.ADMIN.ADD_ITEM}?id=${stockItem.id}`)
                  }
                  className={`${removeButton} mr-2`}
                >
                  Edit
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => setRemoveId(stockItem.id)}
                  className={removeButton}
                >
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
