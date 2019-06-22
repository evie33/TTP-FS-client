import React from 'react';
import './App.css';
// import Profile from './component/Profile';
// import LogIn from './component/LogIn';
// import Register from './component/Register';
// import { withRouter, Route, Switch } from 'react-router-dom';
import Routes from './Routes';
import Navigation from './Navbar';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
