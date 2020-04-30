import React from 'react';

interface Props {}

const EmptyCart: React.FC<Props> = () => {
  return (
    <div className="w-6/12 m-auto text-center align-middle h-screen">
      <img
        src="/static/icons/undraw_empty_cart_co35.svg"
        alt="empty cart"
        className="object-fill w-48 h-32 flex rounded m-auto"
      />
      <span>Looks Like you Cart is Empty</span>
    </div>
  );
};

export default EmptyCart;
