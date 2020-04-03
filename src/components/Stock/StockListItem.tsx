import React from 'react';
import { Link } from 'react-router-dom';
import { StockItem } from '../../../types/Stock';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../redux/modules/cart/actions';

const onAddToCart = (addItem: () => void) => (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  addItem();
};

interface StockListItemProps {
  item: StockItem;
}

const StockListItem: React.FC<StockListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const addItem = () => dispatch(cartActions.addItemToCart(item));

  return (
    <Link
      to={`/item/${item.id}`}
      key={item.id}
      className="sm:w-48 p-2 m-2 bg-gray-300 hover:bg-gray-500 rounded border-gray-400 h-56 flex flex-col w-full"
    >
      <img
        src={`${item.imageUrl}`}
        alt={item.name}
        className="object-fill w-32 h-32 flex m-auto rounded"
      />
      <span className="text-center text-lg">{item.name.toUpperCase()}</span>
      <button
        onClick={onAddToCart(addItem)}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default StockListItem;
