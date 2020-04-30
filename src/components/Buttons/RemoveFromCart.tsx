import React from 'react';
import * as cartActions from '../../redux/modules/cart/actions';
import { useDispatch } from 'react-redux';
import { defaultLinkText } from './btnStyles';

interface RemoveProps {
  id: number;
}

const RemoveFromCard: React.FC<RemoveProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${defaultLinkText} w-20 text-center`}
      onClick={() => dispatch(cartActions.removeItemFromCart(id))}
    >
      Remove
    </button>
  );
};

export default RemoveFromCard;
