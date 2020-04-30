import React from 'react';
import { Link } from 'react-router-dom';
import { StockItem } from '../../../../types/Stock';
import CardImg from '../components/CardImg';

export const defaultStyle = `
sm:w-48 p-2 m-2 bg-gray-300 hover:bg-gray-500 rounded border-gray-400 flex flex-col w-full
`;

interface CompactStockItemCardProps {
  item: StockItem;
  children?: React.ReactChild;
  style?: string;
}

const CompactStockItemCard: React.FC<CompactStockItemCardProps> = ({
  item,
  style = defaultStyle,
  children,
}) => {
  return (
    <Link to={`/item/${item.id}`} key={item.id} className={style}>
      <CardImg src={`${item?.imageUrl}`} alt={item.name} addClasses={`m-auto`} />
      {children}
    </Link>
  );
};

export default CompactStockItemCard;
