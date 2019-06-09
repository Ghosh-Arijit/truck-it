import React from 'react';
import './App.css';
import VendorProfile from './components/vendor/MyProfile'
import Register from './components/user/Register'
import SignIn from './components/user/SignIn'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App= (props)=> {
  return(
    <BrowserRouter> 
      <Switch>
        <Route path="/register" component={Register} exact={true} />
        <Route path="/signIn" component={SignIn} exact={true} />
        <Route path="/vendor" component={VendorProfile} exact={true} /> 
      </Switch>
    </BrowserRouter>
  )
}

export default App
