import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './components/homepage/home';
import RenderURL from './renderUrl';
import Userpage from './components/userpage/user';

import RiseLoader
 from "react-spinners/RiseLoader";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="App">
      {loading?
        <RiseLoader color={"#FAFAF9"} loading={loading} size={"3vh"} /> 
      :
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:str" exact component={RenderURL} />
          <Route path="/dashboard/:str" exact component={Userpage} />
        </Switch>
      </Router>}
    </div>
  );
}

export default App;
