import React from 'react';
import { Layers, Settings, Eye, Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Layers className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">PageCraft</h1>
          </div>
          <div className="flex space-x-4">
            <button className="btn-primary">
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </button>
            <button className="btn-secondary">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
            <button className="btn-icon">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;