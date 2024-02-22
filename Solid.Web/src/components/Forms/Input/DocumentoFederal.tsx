import { useState, useEffect } from 'react';
import { cpfCnpjMask } from 'util-mask';

const DocumentoFederal = ({ register, className, id, name, value: parentValue, onChange, placeholder, disabled, maxLength }: any) => {
  const [doc, setDoc] = useState('');

  useEffect(() => {
    if (parentValue) {
      const value = cpfCnpjMask(parentValue)
      setDoc(value)
    }
  }, [parentValue]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    const DocComMask = cpfCnpjMask(value);
    setDoc(DocComMask);

    if (onChange) {
      onChange(DocComMask);
    }
  };

  return (
    <div>
      <input
        {...register(name)}
        type="text"
        id={id}
        name={name}
        value={doc}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
        disabled={disabled}
        required
        autoComplete="on"
      />
    </div>
  );
};

export default DocumentoFederal;