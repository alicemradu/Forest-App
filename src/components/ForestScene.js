import React, { useState } from 'react';
import ForestSceneDay from './ForestSceneDay';
import ForestSceneNight from './ForestSceneNight';

const ForestScene = () => {
  const [isDayMode, setIsDayMode] = useState(true);

  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Buton pentru comutarea între moduri */}
      <button
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '24px',
          outline: 'none',
        }}
        onClick={toggleMode}
      >
        {isDayMode ? '🌙' : '☀️'} {/* Folosește emoji-urile pentru soare și lună */}
      </button>
      {/* Încărcarea componentei corespunzătoare */}
      {isDayMode ? <ForestSceneDay /> : <ForestSceneNight />}
    </div>
  );
};

export default ForestScene;
