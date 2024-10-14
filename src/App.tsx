import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import { Layers, Settings, Eye, Download } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen bg-gray-100">
          <Header />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar />
            <Canvas />
            <PropertiesPanel />
          </div>
        </div>
      </DndProvider>
    </RecoilRoot>
  );
};

export default App;