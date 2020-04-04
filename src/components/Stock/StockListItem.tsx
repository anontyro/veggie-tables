import React from 'react';
import { Link } from 'react-router-dom';
import { StockItem } from '../../../types/Stock';
import AddToCart from '../Buttons/AddToCart';

interface StockListItemProps {
  item: StockItem;
}

const StockListItem: React.FC<StockListItemProps> = ({ item }) => {
  return (
    <Link
      to={`/item/${item.id}`}
      key={item.id}
      className="sm:w-48 p-2 m-2 bg-gray-300 hover:bg-gray-500 rounded border-gray-400 h-56 flex flex-col w-full"
    >
      <img
        src={`${item?.imageUrl}`}
        alt={item.name}
        className="object-fill w-32 h-32 flex m-auto rounded"
      />
      <span className="text-center text-lg">{item.name.toUpperCase()}</span>
      <AddToCart item={item} />
    </Link>
  );
};

export default StockListItem;
