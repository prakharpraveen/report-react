import './App.css'
import Main from './components/Main';
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("userDetails")))
  }, [])

  const updateUser = (user) => {
    if (Object.keys(user).length === 0) {
      localStorage.removeItem("userDetails");
    } else {
      localStorage.setItem("userDetails", JSON.stringify(user))
    }
    setLoginUser(user)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Main updateUser={updateUser} /> : <Login updateUser={updateUser} />
            }
          </Route>
          <Route path="/login">
            <Login updateUser={updateUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;