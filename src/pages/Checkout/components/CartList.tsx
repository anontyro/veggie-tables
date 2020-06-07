import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { CartItem, cartSubTotal, CartState } from '../../../redux/modules/cart/reducer';
import CardImg from '../../../components/Cards/components/CardImg';
import RemoveFromCard from '../../../components/Buttons/RemoveFromCart';

const gridHeaderClasses = 'col-span-1 font-bold text-teal-700';

const getCurrencyDefault = (cart: CartItem[]) => {
  const currency = cart[0]?.item?.currency;
  return currency ? currency : 'SGD';
};

interface Props {}

const CartList: React.FC<Props> = () => {
  const cartState: CartState = useSelector((state: RootState) => state.userCart);
  const subTotal = useSelector((state: RootState) => cartSubTotal(state.userCart)).toFixed(2);
  const { cart } = cartState;

  return (
    <React.Fragment>
      <div className="grid grid-cols-3 gap-2 sm:m-auto sm:w-4/5 text-center">
        <div className={gridHeaderClasses}>Item</div>
        <div className={gridHeaderClasses}>{`Total ${getCurrencyDefault(cart)}`}</div>
        <div className={gridHeaderClasses}>Quantity</div>

        {cart.map(cartItem => (
          <React.Fragment key={cartItem.item.id}>
            <div key={`item-${cartItem.item.id}`} className="col-span-1">
              <div className="flex flex-col">
                <div className="flex md:space-x-4 flex-col md:flex-row items-center">
                  <CardImg width="12" height="12" src={cartItem.item.imageUrl} />
                  <div className="capitalize">{cartItem.item.name}</div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <RemoveFromCard id={cartItem.item.id} />
                </div>
              </div>
            </div>

            <div key={`price-${cartItem.item.id}`} className="col-span-1">
              <div className="flex items-center justify-center h-full">
                {(cartItem.item.unitPrice * cartItem.quantity).toFixed(2)}
              </div>
            </div>
            <div key={`name-${cartItem.item.id}`} className="col-span-1">
              <div className="flex items-center justify-center h-full">{cartItem.quantity}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:m-auto sm:w-4/5 text-center border-t-2">
        <div className="col-span-1">
          <span>Sub Total:</span>
        </div>
        <div className="col-span-1">
          <span>{`${getCurrencyDefault(cart)} ${subTotal}`}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartList;
