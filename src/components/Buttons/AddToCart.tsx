import React from 'react';
import { useDispatch } from 'react-redux';
import { StockItem } from '../../../types/Stock';
import * as cartActions from '../../redux/modules/cart/actions';
import { defaultButton } from './btnStyles';

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
    <button onClick={onAddToCart(addItem)} className={`${defaultButton} ${styles}`}>
      {buttonLabel}
    </button>
  );
};

export default AddToCart;
