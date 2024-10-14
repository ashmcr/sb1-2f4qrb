import React from 'react';
import { useDrop } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { canvasComponentsState } from '../state/atoms';
import CanvasComponent from './CanvasComponent';

const Canvas: React.FC = () => {
  const [components, setComponents] = useRecoilState(canvasComponentsState);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const newComponent = {
        id: Date.now(),
        type: item.type,
        position: { x: offset?.x || 0, y: offset?.y || 0 },
        content: `New ${item.type}`,
      };
      setComponents([...components, newComponent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 overflow-auto ${isOver ? 'bg-indigo-100' : 'bg-white'}`}
    >
      <div className="relative w-full h-full min-h-[600px] border-2 border-dashed border-gray-300 rounded-lg">
        {components.map((component) => (
          <CanvasComponent key={component.id} {...component} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;