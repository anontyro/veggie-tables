import React from 'react';

interface Props {
  text: string;
}

export const MainHeader: React.FC<Props> = ({ text }) => (
  <h1 className="text-center text-2xl my-4">{text}</h1>
);
