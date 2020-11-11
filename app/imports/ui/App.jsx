import React from 'react';

import Button from './Button.jsx';


export const App = () => (

  <div className="grid-container">
    <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
      <div className="cell shrink"></div>
      <div className="cell auto grid justify-center NPR-container">
        <h1>NPR Locator</h1>
        <Button />
      </div>
      <div className="cell shrink"></div>
    </div>
  </div>

);
