import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

const Money = ({ required, className, id, name, onChange, value: parentValue, placeholder, disabled }: any) => {
  const [money, setMoney] = useState<string | undefined>('')

  useEffect(() => {
    if (parentValue) {
      const value = parentValue
      setMoney(value)
    }
  }, [parentValue]);

  const handleChange = (values: any) => {
    const { value } = values;
    setMoney(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <NumericFormat
        type="text"
        id={id}
        name={name}
        value={money}
        onValueChange={handleChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale={true}
        allowNegative={false}
        autoComplete="on"
        required={required}
      />
    </div>
  );
};

export default Money;
