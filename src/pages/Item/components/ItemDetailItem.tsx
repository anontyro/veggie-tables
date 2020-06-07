import React from 'react';
import { StockDetails } from '../../../../types/Stock';

interface Props {
  detailList: StockDetails[];
}

const ItemDetailItem: React.FC<Props> = ({ detailList }) => {
  return (
    <React.Fragment>
      {detailList.map(
        item =>
          item.isShown && (
            <div>
              <h3 className="pb-2 font-semibold">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          )
      )}
    </React.Fragment>
  );
};

export default ItemDetailItem;
