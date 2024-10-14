import React from 'react';
import { useDrag } from 'react-dnd';
import { Type, Image, Box, Columns, List } from 'lucide-react';

const componentList = [
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'image', icon: Image, label: 'Image' },
  { type: 'container', icon: Box, label: 'Container' },
  { type: 'columns', icon: Columns, label: 'Columns' },
  { type: 'list', icon: List, label: 'List' },
];

const DraggableComponent: React.FC<{ type: string; icon: React.ElementType; label: string }> = ({ type, icon: Icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 mb-2 bg-white rounded-md shadow-sm cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100 hover:shadow-md'
      }`}
    >
      <Icon className="h-5 w-5 mr-2 text-indigo-600" />
      <span>{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      {componentList.map((component) => (
        <DraggableComponent key={component.type} {...component} />
      ))}
    </div>
  );
};

export default Sidebar;