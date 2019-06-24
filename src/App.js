import React from 'react';
import logo from './logo.svg';
import Admin from './components/Admin';
import Graph from './components/Graph';
import './App.css';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();
axios.defaults.headers = {
  Authorization: "Bearer " + cookies.get("access_token")
};

function App() {
  
  return (
    <div className="App">
      <Admin/>
    </div>
  );
}

export default App;
