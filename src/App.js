import './App.css';

// TODO: import functions from api.js

import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";

function App() {
  // TODO: state: user
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
