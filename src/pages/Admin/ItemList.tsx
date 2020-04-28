import React, { useEffect, useState } from 'react';
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
import StockItemCard from '../../components/Cards/StockItemCard';

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
    dispatch(stockActions.fetchStockImgList());
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
    }
  }, [removeId]);

  return (
    <AdminLayout>
      <React.Fragment>
        <MainHeader text="Item List" />
        <div className="flex flex-col">
          {stockList.map(stockItem => (
            <StockItemCard key={stockItem.id} stockItem={stockItem}>
              <React.Fragment>
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
              </React.Fragment>
            </StockItemCard>
          ))}
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default ItemList;
