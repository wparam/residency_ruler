import React, { useState, useRef } from 'react';
import moment from 'moment';

const VernierRuler: React.FC = () => {
    const months = moment.monthsShort();
    const dayWidth = 10;  // set day width to 10px

    const getDaysInMonth = (monthIndex: number) => {
        const currentYear = new Date().getFullYear();
        return moment(`${currentYear}-${monthIndex + 1}-01`).daysInMonth();
    };

    const monthDays: { [key: string]: number } = {};

    months.forEach((month, index) => {
        monthDays[month] = getDaysInMonth(index);
    });

    const totalDaysInYear = Object.values(monthDays).reduce((acc, days) => acc + days, 0) + getDaysInMonth(0) + getDaysInMonth(1); // 14 months

    // Dragging state
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef(0);

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        dragStartX.current = event.clientX;
    };

    const handleDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;

        const dx = event.clientX - dragStartX.current;
        setDragOffset(prevOffset => prevOffset + dx);

        dragStartX.current = event.clientX;
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="flex flex-col overflow-x-auto" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
            <div 
                className="relative bg-blue-100 h-8" 
                style={{ 
                    width: `${365 * dayWidth}px`,
                    transform: `translateX(${dragOffset}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleDragStart}
            >
                {/* Left pointer */}
                <div className="absolute top-0 left-0 border-t-4 border-l-4 border-transparent border-b-4 border-gray-600 w-0 h-0"></div>
                {/* Right pointer */}
                <div className="absolute top-0 right-0 border-t-4 border-r-4 border-transparent border-b-4 border-gray-600 w-0 h-0"></div>
            </div>

            {/* Bottom Ruler (14 months) */}
            <div className="flex">
                {Array.from({ length: 14 }).map((_, index) => (
                    <React.Fragment key={index}>
                        <div className="border-r h-12 w-px"></div>
                        <div style={{ width: `${monthDays[months[index % 12]] * dayWidth + monthDays[months[index % 12]]}px` }} className="relative">
                            {Array.from({ length: monthDays[months[index % 12]] }).map((_, dayIndex) => (
                                <div key={dayIndex} className="border-r h-6 w-px absolute top-0" style={{ left: `${dayIndex * (dayWidth + 1)}px` }}></div>
                            ))}
                            <span className="absolute top-0 left-2">{months[index % 12]}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default VernierRuler;
