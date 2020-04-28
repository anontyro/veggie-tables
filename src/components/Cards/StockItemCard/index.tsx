import React from 'react';
import styled from 'styled-components';
import { StockItem } from '../../../../types/Stock';

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface StockItemCardProps {
  stockItem: Partial<StockItem>;
  children?: React.ReactChild;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ stockItem, children }) => (
  <div className="flex flex-col bg-gray-300 rounded m-4 h-48">
    <div className=" flex flex-row p-4 pb-0">
      <img
        src={`${stockItem?.imageUrl}`}
        alt={stockItem?.name}
        className="object-fill w-32 h-32 flex rounded"
      />
      <div className="flex flex-col flex-grow mx-6">
        <h1>{stockItem.name || ''}</h1>
        <p>{`${stockItem.unitPrice || 0} ${stockItem.currency || 'SGD'}`}</p>
        <p>{`Stock Level: ${stockItem.stockLevel || 0}`}</p>
        <Desc>{stockItem.description || ''}</Desc>
      </div>
    </div>
    {children && <div className="flex mx-6 text-right justify-end">{children}</div>}
  </div>
);

export default StockItemCard;
