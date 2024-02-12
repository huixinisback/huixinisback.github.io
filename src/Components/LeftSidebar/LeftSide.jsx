import React from "react";

const LeftSide = () => {
  return (
    <div className="flex flex-col h-screen bg-grey pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col bg-grey items-center relative">
        <div className="header mt-8">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 mb-4">
            Latest Fashion Trends
          </h2>
        </div>
        <div className="webview-container" style={{ height: 'calc(100% - 64px)' }}>
          {/* Adjust the src attribute with your desired URL */}
          <iframe
            src="https://vogue.com"
            title="External Web Page"
            style={{ width: '100%', height: '500%', border: 'none' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
