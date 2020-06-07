import React from 'react';

const defaultStyle = 'text-center text-2xl my-4';

interface Props {
  text: string;
  classOverride?: string;
}

export const MainHeader: React.FC<Props> = ({ text, classOverride = '' }) => (
  <h1 className={`${defaultStyle} ${classOverride}`}>{text}</h1>
);
