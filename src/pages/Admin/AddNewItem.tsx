import React, { useState, useEffect } from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { StockItem, StockImage } from '../../../types/Stock';
import { defaultButton } from '../../components/Buttons/btnStyles';
import { useHistory, useLocation } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../enum/routes';
import { useDispatch, useSelector } from 'react-redux';
import * as stockActions from '../../redux/modules/stock/actions';
import { RootState } from '../../redux';
import { StockState } from '../../redux/modules/stock/reducer';
import HTTP_VERB from '../../enum/http';
import StockItemCard from '../../components/Cards/StockItemCard';

const convertKebabCase = (str: string) => str.replace(/\s/g, '-');

interface BaseInputProps {
  value: any;
  label: string;
  onChange: (event: any) => any;
  type?: string;
  isDisabled?: boolean;
}

interface StandardInputProps extends BaseInputProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface DropDownInputProps extends BaseInputProps {
  dropDownItems: StockImage[];
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
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

const DropDownInput: React.FC<DropDownInputProps> = ({
  dropDownItems,
  value,
  label,
  onChange,
  isDisabled = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={convertKebabCase(label)}>
      {label}
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={convertKebabCase(label)}
      onChange={onChange}
      disabled={isDisabled}
      value={value}
    >
      {dropDownItems.map((item: StockImage) => (
        <option key={item.path} value={item.path}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

const defaultItem: Partial<StockItem> = {
  name: '',
  description: '',
  unitPrice: 0.0,
  currency: 'SGD',
  stockLevel: 0,
  imageUrl: '/static/images/default_placeholder.png',
};

const useQuery = () => new URLSearchParams(useLocation().search);

const AddNewItem: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    currentItem,
    update: { isUpdating },
    stockImageList,
  }: StockState = useSelector((state: RootState) => state.stock);

  const query = useQuery();
  const id = parseInt(query.get('id')) || null;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nextItem, setNextItem] = useState<Partial<StockItem>>(defaultItem);
  const headerText = id ? `Update ${currentItem?.name}` : `Add New Item `;

  useEffect(() => {
    dispatch(stockActions.fetchStockImgList());
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
        <div className="flex xl:flex-row md:flex-col flex-wrap">
          <div className="flex-grow-0 w-full sm:max-w-lg m-auto ">
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
              <DropDownInput
                label="Item Image"
                dropDownItems={stockImageList}
                value={nextItem.imageUrl}
                onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                  setNextItem({
                    ...nextItem,
                    imageUrl: event.currentTarget.value,
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
                  type="submit"
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
                  type="submit"
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

          <div id="item-preview" className="flex-grow xl:max-w-xl m-auto sm:w-3/6">
            <h3>Preview</h3>
            <StockItemCard stockItem={nextItem} />
          </div>
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default AddNewItem;
