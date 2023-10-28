import React from 'react';
import { getDaysInMonth, format } from 'date-fns';

const Ruler: React.FC = () => {
  const months: Date[] = [];

  for (let i = 0; i < 12; i++) {
    months.push(new Date(new Date().getFullYear(), i, 1));
  }

  return (
    <div className="flex overflow-x-auto">
      {months.map((month, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">{format(month, 'MMM')}</div>
          <div className="flex">
            {[...Array(getDaysInMonth(month))].map((_, day) => (
              <div key={day} className="h-4 w-1 bg-gray-500 mx-0.5"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ruler;
