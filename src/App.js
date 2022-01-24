import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setalert] = useState(null)
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    console.log(alert)
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showalert={showalert} />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showalert={showalert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showalert={showalert} />
              </Route>
              <Route exact path="/signup">
                <Signup showalert={showalert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>


  );
}

export default App;
