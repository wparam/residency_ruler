import React, { useState, useEffect } from 'react';
import moment from 'moment';

const VernierRuler: React.FC = () => {
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
    const months = moment.monthsShort();

    const getDaysInMonth = (monthIndex: number, year: number) => {
        return moment(`${year}-${monthIndex + 1}-01`).daysInMonth();
    };

    const currentYear = new Date().getFullYear();
    const monthDays: { [key: string]: number } = {};

    months.forEach((month, index) => {
        monthDays[month] = getDaysInMonth(index, currentYear);
    });

    const totalDaysInYear = Object.values(monthDays).reduce((acc, days) => acc + days, 0);
    const screenWidth = window.innerWidth;
    const dayWidth = screenWidth / totalDaysInYear;

    const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // TODO: Implement drag logic here
        // This will adjust the currentMonthOffset based on the drag movement
    };

    return (
        <div className="flex relative w-full" onMouseMove={handleDrag}>
            {/* Upper Ruler */}
            <div className="flex absolute top-0 left-0">
                {months.map((month, index) => (
                    <React.Fragment key={index}>
                        <div className="border-r h-12 w-px"></div>
                        <div style={{ width: `${monthDays[month] * dayWidth}px` }} className="relative">
                            {Array.from({ length: monthDays[month] }).map((_, dayIndex) => (
                                <div key={dayIndex} className="border-r h-6 w-px absolute top-0" style={{ left: `${dayIndex * dayWidth}px` }}></div>
                            ))}
                            {index % 2 === 0 && <span className="absolute top-0 left-2">{month}</span>}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Bottom Ruler */}
            <div className="flex mt-8">
                {months.slice(currentMonthOffset, currentMonthOffset + 14).map((month, index) => (
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
        </div>
    );
};

export default VernierRuler;
