import React, { useState } from 'react';
import Ruler from './Ruler';

const UpperRuler: React.FC = () => {
  const [position, setPosition] = useState<number>(0);

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    setPosition(position + e.movementX);
  };

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex overflow-x-auto cursor-grab" onDrag={handleDrag} onDragStart={handleDragStart} draggable="true">
      <div style={{ transform: `translateX(${position}px)` }}>
        <Ruler />
      </div>
    </div>
  );
};

export default UpperRuler;
