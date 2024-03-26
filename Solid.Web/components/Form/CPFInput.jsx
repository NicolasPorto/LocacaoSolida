import React, { useState, useEffect } from 'react';
import { cpfMask } from 'util-mask';

const CPFInput = ({ className, id, name, value: parentValue, onChange }) => {
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    if (parentValue) {
      setCpf(cpfMask(parentValue));
    }
  }, [parentValue]);

  const handleChange = (event) => {
    const { value } = event.target;
    const CpfComMask = cpfMask(value);
    setCpf(CpfComMask);

    if (onChange) {
      onChange(event);
    }
  };

  const inputClass = className ? className : '';

  return (
    <div>
      <input
        type="text"
        id={id}
        name={name}
        value={cpf}
        onChange={handleChange}
        className={inputClass}
        maxLength={14}
        required
      />
    </div>
  );
};

export default CPFInput;