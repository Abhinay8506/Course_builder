import React, { useState } from 'react';
import Module from './components/Module';
import './App.css';  // Import App.css here

function App() {
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = { id: Date.now(), name: 'New Module', resources: [] };
    setModules([...modules, newModule]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Builder</h1>
        <button onClick={addModule}>Add Module</button>
      </header>
      <div className="modules">
        {modules.map((module) => (
          <Module key={module.id} module={module} setModules={setModules} modules={modules} />
        ))}
      </div>
    </div>
  );
}

export default App;