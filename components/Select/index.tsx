import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { isNull, isUndefined } from 'underscore';

import { OptionsProps } from 'types/options';

interface Props {
  name: string;
  label: string;
  options: OptionsProps[];
  defaultValue?: any;
}

const Index = ({ name, label, options, ...rest }: Props) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        return ref.value;
      },
      setValue: (ref, v) => {
        if (!isUndefined(options) && !isNull(options)) {
          return options.find(option => option.value === v).value;
        }
      },
      clearValue: () => {
        return '';
      },
    });
  }, [registerField, fieldName, options]);

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        id={name}
        ref={selectRef}
        name={name}
        defaultValue={defaultValue}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...rest}
      >
        <option value="">Selecione</option>
        {options.map(option => (
          <option
            key={isUndefined(option.value) ? option.label : option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </span>
      )}
    </>
  );
};

export default Index;
