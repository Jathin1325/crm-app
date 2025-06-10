import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleDarkMode = () => {
    setDarkMode((d) => !d);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-item">
        <label>Dark Mode:</label>
        <input type="checkbox" checked={darkMode} onChange={handleDarkMode} />
      </div>
      <div className="settings-item">
        <label>Language:</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
};

export default Settings; 