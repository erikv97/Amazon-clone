import "./App.css";
import React,{useEffect} from "react";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from './Login'
import { auth } from "./firebase";
import {useStateValue} from './StateProvider'


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        //the use just logged in / the user was logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })

      }else {
        //the user is logged Out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
   
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/login">
            <Login />
          </Route>
        <Header />

          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
