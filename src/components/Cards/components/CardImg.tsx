import React from 'react';

interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  addClasses?: string;
}

const CardImg: React.FC<Props> = ({
  src,
  alt = '',
  width = '32',
  height = '32',
  addClasses = '',
}) => (
  <img
    src={`${src}`}
    alt={alt}
    className={`object-fill w-${width} h-${height} flex rounded ${addClasses}`}
  />
);

export default CardImg;
