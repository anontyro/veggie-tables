import React from 'react';
import { StockImage } from '../../../types/Stock';
import { convertKebabCase } from '../../utils/string';

interface BaseInputProps {
  label: string;
  onChange: (event: any) => any;
  type?: string;
  isDisabled?: boolean;
}

interface UploadInputProps extends BaseInputProps {
  multiple?: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface StandardInputProps extends BaseInputProps {
  value: any;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface DropDownInputProps extends BaseInputProps {
  value: any;
  dropDownItems: StockImage[];
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export const StandardInput: React.FC<StandardInputProps> = ({
  value,
  label,
  onChange,
  type = 'text',
  isDisabled = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      disabled={isDisabled}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const DropDownInput: React.FC<DropDownInputProps> = ({
  dropDownItems,
  value,
  label,
  onChange,
  isDisabled = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={convertKebabCase(label)}>
      {label}
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={convertKebabCase(label)}
      onChange={onChange}
      disabled={isDisabled}
      value={value}
    >
      {dropDownItems.map((item: StockImage) => (
        <option key={item.path} value={item.path}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

export const UploadInput: React.FC<UploadInputProps> = ({
  label,
  onChange,
  isDisabled = false,
  multiple = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="file"
      disabled={isDisabled}
      multiple={multiple}
      onChange={onChange}
    />
  </div>
);
