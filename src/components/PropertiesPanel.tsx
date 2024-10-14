import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedComponentState, canvasComponentsState } from '../state/atoms';

const PropertiesPanel: React.FC = () => {
  const [components, setComponents] = useRecoilState(canvasComponentsState);
  const selectedComponentId = useRecoilValue(selectedComponentState);

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedComponent) {
      setComponents(
        components.map((comp) =>
          comp.id === selectedComponentId ? { ...comp, content: e.target.value } : comp
        )
      );
    }
  };

  if (!selectedComponent) {
    return (
      <div className="w-64 bg-gray-50 p-4 border-l border-gray-200">
        <p className="text-gray-500">Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <p className="mt-1 text-sm text-gray-900">{selectedComponent.type}</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={selectedComponent.content}
            onChange={handleContentChange}
          />
        </div>
        {/* Add more properties here based on the component type */}
      </div>
    </div>
  );
};

export default PropertiesPanel;