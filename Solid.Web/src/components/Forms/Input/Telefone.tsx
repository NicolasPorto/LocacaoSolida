import { useState, useEffect } from 'react';
import { phoneMask } from 'util-mask';

const Telefone = ({ register, className, id, name, value: parentValue, required: required }: any) => {
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if (parentValue) {
      setTelefone(phoneMask(parentValue));
    }
  }, [parentValue]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    const TelefoneComMask = phoneMask(value);
    setTelefone(TelefoneComMask);
  };

  const inputClass = className ? className : '';

  return (
    <div>
      <input
        {...register(name)}
        type="tel"
        id={id}
        name={name}
        value={telefone}
        onChange={handleChange}
        placeholder='(__) ____-____'
        className={inputClass}
        maxLength={15}
        required={required}
        autoComplete="on"
      />
    </div>
  );
};

export default Telefone;