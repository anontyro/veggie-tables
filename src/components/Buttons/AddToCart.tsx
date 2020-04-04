import React from 'react';
import { useDispatch } from 'react-redux';
import { StockItem } from '../../../types/Stock';
import * as cartActions from '../../redux/modules/cart/actions';

const onAddToCart = (addItem: () => void) => (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  addItem();
};

interface Props {
  item: StockItem;
  styles?: string;
  buttonLabel?: string;
}

const AddToCart: React.FC<Props> = ({ item, styles = '', buttonLabel = 'Add To Cart' }) => {
  const dispatch = useDispatch();
  const addItem = () => dispatch(cartActions.addItemToCart(item));

  return (
    <button
      onClick={onAddToCart(addItem)}
      className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${styles}`}
    >
      {buttonLabel}
    </button>
  );
};

export default AddToCart;
