import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

const Money = ({ register, className, id, name, onChange, value: parentValue, placeholder, disabled }: any) => {
  const [money, setMoney] = useState<string | undefined>('')

  useEffect(() => {
    if (parentValue) {
      const value = parentValue
      setMoney(value)
    }
  }, [parentValue]);

  const handleChange = (event: any) => {
    const value = event.value;
    setMoney(value);

    if (onChange) {
      onChange(money);
    }
  };

  return (
    <div>
      <NumericFormat
        {...register(name, { value: money })}
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
      />
    </div>
  );
};

export default Money;