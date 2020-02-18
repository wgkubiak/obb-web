import React from 'react';
import Navbar from './containers/Navbar';
import UnitsContainer from './containers/UnitsContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const app = () => {
    return (
      <div className="App">
        <Navbar />
        <UnitsContainer />        
      </div>
    )
}

export default app;
