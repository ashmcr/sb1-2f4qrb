import React from 'react';
import { useDrag } from 'react-dnd';
import { Rnd } from 'react-rnd';
import { useRecoilState } from 'recoil';
import { canvasComponentsState, selectedComponentState } from '../state/atoms';

interface CanvasComponentProps {
  id: number;
  type: string;
  position: { x: number; y: number };
  content: string;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ id, type, position, content }) => {
  const [components, setComponents] = useRecoilState(canvasComponentsState);
  const [selectedComponent, setSelectedComponent] = useRecoilState(selectedComponentState);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvasComponent',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSelect = () => {
    setSelectedComponent(id);
  };

  const handleResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, position: { x: position.x, y: position.y } } : comp
      )
    );
  };

  const renderComponent = () => {
    switch (type) {
      case 'text':
        return <p className="text-gray-800">{content}</p>;
      case 'image':
        return <img src={content} alt="Component" className="max-w-full h-auto" />;
      case 'container':
        return <div className="border border-gray-300 p-4 rounded">{content}</div>;
      case 'columns':
        return (
          <div className="flex space-x-4">
            <div className="flex-1 border border-gray-300 p-2 rounded">Column 1</div>
            <div className="flex-1 border border-gray-300 p-2 rounded">Column 2</div>
          </div>
        );
      case 'list':
        return (
          <ul className="list-disc list-inside">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <Rnd
      position={position}
      onDragStop={(e, d) => {
        setComponents(
          components.map((comp) =>
            comp.id === id ? { ...comp, position: { x: d.x, y: d.y } } : comp
          )
        );
      }}
      onResize={handleResize}
      className={`${
        selectedComponent === id ? 'ring-2 ring-indigo-500' : ''
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={handleSelect}
    >
      <div ref={drag} className="w-full h-full cursor-move">
        {renderComponent()}
      </div>
    </Rnd>
  );
};

export default CanvasComponent;