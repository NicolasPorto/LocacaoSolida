import React, { useState } from 'react';

const Checkbox = ({ id, label, isChecked, onCheckboxChange }) => {
    return (
        <div>
            <label htmlFor={id} className="flex cursor-pointer select-none items-center mt-2">
                <div className="relative">
                    <input
                        type="checkbox"
                        id={id}
                        className="sr-only"
                        onChange={onCheckboxChange}
                        checked={isChecked}
                    />
                    <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${isChecked && 'border-person-500'}`}>
                        <span className={`h-2.5 w-2.5 rounded-full bg-transparent ${isChecked && '!bg-person-500'}`} />
                    </div>
                </div>
                {label}
            </label>
        </div>
    );
};

const CheckboxGroup = ({ options }) => {
    const [checkedStates, setCheckedStates] = useState(() => {
        const initialState = {};
        options.forEach(option => {
            initialState[option.id] = option.checked || false;

            if (option.id === 'pessoaF')
                initialState[option.id] = true
        });
        return initialState;
    });

    const handleCheckboxChange = id => {
        const newCheckedStates = {};
        options.forEach(option => {
            newCheckedStates[option.id] = option.id === id;
        });
        setCheckedStates(newCheckedStates);
    };

    return (
        <div>
            {options.map(option => (
                <Checkbox
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    isChecked={checkedStates[option.id]}
                    onCheckboxChange={() => handleCheckboxChange(option.id)}
                />
            ))}
        </div>
    );
};

export default CheckboxGroup;
