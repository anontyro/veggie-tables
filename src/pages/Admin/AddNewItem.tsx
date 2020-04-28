import React, { useState, useEffect } from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { StockItem } from '../../../types/Stock';
import { defaultButton } from '../../components/Buttons/btnStyles';
import { useHistory, useLocation } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../enum/routes';
import { useDispatch, useSelector } from 'react-redux';
import * as stockActions from '../../redux/modules/stock/actions';
import { RootState } from '../../redux';
import { StockState } from '../../redux/modules/stock/reducer';
import HTTP_VERB from '../../enum/http';

interface StandardInputProps {
  value: any;
  label: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  type?: string;
  isDisabled?: boolean;
}

const StandardInput: React.FC<StandardInputProps> = ({
  value,
  label,
  onChange,
  type = 'text',
  isDisabled = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      disabled={isDisabled}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

const defaultItem: Partial<StockItem> = {
  name: '',
  description: '',
  unitPrice: 0.0,
  currency: 'SGD',
  stockLevel: 0,
};

const useQuery = () => new URLSearchParams(useLocation().search);

const AddNewItem: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const stockState: StockState = useSelector((state: RootState) => state.stock);

  const query = useQuery();
  const id = parseInt(query.get('id')) || null;
  const {
    currentItem,
    update: { isUpdating },
  } = stockState;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nextItem, setNextItem] = useState<Partial<StockItem>>(defaultItem);
  const headerText = id ? `Update ${currentItem?.name}` : `Add New Item `;

  useEffect(() => {
    if (id) {
      dispatch(stockActions.fetchItemDetail(+id));
    }
  }, []);

  useEffect(() => {
    if (id && currentItem?.id === +id) {
      setNextItem({
        ...nextItem,
        ...currentItem,
      });
    }
  }, [currentItem]);

  useEffect(() => {
    const onFetched = () => {
      setIsSubmitted(false);
      setNextItem(defaultItem);
      dispatch(stockActions.fetchStockList(true));
      history.push(FRONTEND_ROUTES.ADMIN.ITEM_LIST);
    };

    if (nextItem.name.length > 0 && isSubmitted && !id) {
      dispatch(stockActions.updateItem(nextItem, HTTP_VERB.POST, onFetched));
    } else if (nextItem.name.length > 0 && isSubmitted && id) {
      dispatch(stockActions.updateItem(nextItem, HTTP_VERB.PUT, onFetched));
    } else {
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <AdminLayout>
      <React.Fragment>
        <MainHeader text={headerText} />
        <div className="w-full sm:max-w-lg m-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <StandardInput
              label="Item Name"
              value={nextItem.name}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setNextItem({
                  ...nextItem,
                  name: event.currentTarget.value,
                });
              }}
            />
            <StandardInput
              label="Item Description"
              value={nextItem.description}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setNextItem({
                  ...nextItem,
                  description: event.currentTarget.value,
                });
              }}
            />
            <StandardInput
              label={`Item Price ${nextItem.currency}`}
              value={nextItem.unitPrice}
              type="number"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setNextItem({
                  ...nextItem,
                  unitPrice: +event.currentTarget.value,
                });
              }}
            />
            <StandardInput
              label={`Stock Level`}
              value={nextItem.stockLevel}
              type="number"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setNextItem({
                  ...nextItem,
                  stockLevel: +event.currentTarget.value,
                });
              }}
            />
            {id ? (
              <button
                className={`${defaultButton}`}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  console.log(nextItem);
                  if (nextItem.name.length > 0) {
                    setIsSubmitted(true);
                  }
                }}
              >
                Update Item
              </button>
            ) : (
              <button
                className={`${defaultButton}`}
                disabled={isUpdating}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  console.log(nextItem);
                  if (nextItem.name.length > 0) {
                    setIsSubmitted(true);
                  }
                }}
              >
                Add Item
              </button>
            )}
          </form>
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default AddNewItem;
