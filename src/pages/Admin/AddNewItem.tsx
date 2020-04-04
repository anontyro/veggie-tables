import React, { useState, useEffect } from 'react';
import AdminLayout from '../_layout/AdminLayout';
import { MainHeader } from '../../components/Headers/MainHeader';
import { StockItem } from '../../../types/Stock';
import { defaultButton } from '../../components/Buttons/btnStyles';
import { useHistory } from 'react-router-dom';
import { BACKEND_ROUTES } from '../../enum/routes';

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

const AddNewItem: React.FC = () => {
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nextItem, setNextItem] = useState<Partial<StockItem>>(defaultItem);

  useEffect(() => {
    const addItem = async () => {
      try {
        await fetch(BACKEND_ROUTES.STOCK_ROOT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nextItem),
        });
        setIsSubmitted(false);
        setNextItem(defaultItem);
        history.push('/admin/item-list');
      } catch (err) {
        console.error(err);
      }
    };

    if (nextItem.name.length > 0 && isSubmitted) {
      addItem();
    }
  }, [isSubmitted]);

  return (
    <AdminLayout>
      <React.Fragment>
        <MainHeader text="Add New Item" />
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
              Add Item
            </button>
          </form>
        </div>
      </React.Fragment>
    </AdminLayout>
  );
};

export default AddNewItem;
