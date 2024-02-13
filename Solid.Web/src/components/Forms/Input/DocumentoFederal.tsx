import { useState, useEffect } from 'react';
import { cpfCnpjMask } from 'util-mask';

const DocumentoFederal = ({ register, className, id, name, value: parentValue, onChange, placeholder }: any) => {
  const [doc, setDoc] = useState('');

  useEffect(() => {
    if (parentValue) {
      setDoc(cpfCnpjMask(parentValue));
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

  const inputClass = className ? className : '';

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
        className={inputClass}
        maxLength={18}
        required
      />
    </div>
  );
};

export default DocumentoFederal;