import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import MainApp from './MainApp';
import Admin from './components/Admin';
import Header from './components/Header';

function App (props) {
  return (
    <BrowserRouter>
      <div id="main-container">
        <Header />
        <Route exact path="/" component={Admin} />
        <Route path="/app" component={MainApp} />
      </div>
    </BrowserRouter>
  );
}

export default App;
