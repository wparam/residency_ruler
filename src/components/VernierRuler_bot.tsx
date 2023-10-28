import React from 'react';
import moment from 'moment';

const VernierRuler: React.FC = () => {
    const months = moment.monthsShort();

    const getDaysInMonth = (monthIndex: number) => {
        const currentYear = new Date().getFullYear();
        return moment(`${currentYear}-${monthIndex + 1}-01`).daysInMonth();
    };

    const monthDays: { [key: string]: number } = {};

    months.forEach((month, index) => {
        monthDays[month] = getDaysInMonth(index);
    });

    const totalDaysInYear = Object.values(monthDays).reduce((acc, days) => acc + days, 0);
    const parentWidth = document.documentElement.clientWidth - 32; // subtracting the total padding (left and right) from the viewport width
    const dayWidth = parentWidth / totalDaysInYear;

    return (
        <div className="flex w-full">
            {months.map((month, index) => (
                <React.Fragment key={index}>
                    <div className="border-r h-12 w-px"></div>
                    <div style={{ width: `${monthDays[month] * dayWidth}px` }} className="relative">
                        {Array.from({ length: monthDays[month] }).map((_, dayIndex) => (
                            <div key={dayIndex} className="border-r h-6 w-px absolute top-0" style={{ left: `${dayIndex * dayWidth}px` }}></div>
                        ))}
                        {index % 2 !== 0 && <span className="absolute top-0 left-2">{month}</span>}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default VernierRuler;
