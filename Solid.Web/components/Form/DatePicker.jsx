import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataInput = ({ id, name }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate)
    return (
        <div class="relative max-w-sm">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
            <DatePicker
                id={id}
                name={name}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
            />
        </div>
    );
};

export default DataInput;
