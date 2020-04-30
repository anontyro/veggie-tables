import React, { useState, useEffect } from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { StockItem } from '../../../types/Stock';
import {
  defaultButton,
  defaultButtonLayout,
  defaultLinkText,
} from '../../components/Buttons/btnStyles';
import { useHistory, useLocation } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../enum/routes';
import { useDispatch, useSelector } from 'react-redux';
import * as stockActions from '../../redux/modules/stock/actions';
import * as modalActions from '../../redux/modules/modal/actions';
import { RootState } from '../../redux';
import { StockState } from '../../redux/modules/stock/reducer';
import HTTP_VERB from '../../enum/http';
import StockItemCard from '../../components/Cards/StockItemCard';
import { StandardInput, DropDownInput } from '../../components/Form/Inputs';
import { modalType as imageUploadModalType } from '../../components/Modals/ImageUpload';

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
              <div className={`${defaultButtonLayout}`}>
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
                <button
                  type="button"
                  className={defaultLinkText}
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    dispatch(
                      modalActions.showModal({
                        modalType: imageUploadModalType,
                      })
                    );
                  }}
                >
                  Upload Image
                </button>
              </div>
            </form>
          </div>

          <div id="item-preview" className="flex-grow xl:max-w-xl m-auto sm:w-3/6">
            <h3 className="m-4">Preview</h3>
            <StockItemCard stockItem={nextItem} />
          </div>
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default AddNewItem;
