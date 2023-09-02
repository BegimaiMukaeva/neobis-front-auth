import React from "react";
import  {Routes, Route} from 'react-router-dom'
import * as yup from 'yup';
import axios from "axios";
import './style/style.css'
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
