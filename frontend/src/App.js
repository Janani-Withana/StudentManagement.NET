
import React from 'react';
import Students from './components/Students';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl md:text-4xl font-bold text-center my-8 text-gray-900 break-words">
        Students
        <br className="md:hidden" />
        Management
      </h1>
      <Students/>
    </div>
  );
}

export default App;
