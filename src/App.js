import {
  BrowserRouther as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Login from './Login.js';
import SignUp from './AuthPage.js'
import './App.css';
import PrivateRoute from './PrivateRoute.js';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            {this.state.token && <div>welcome, user!!!</div>}
            {this.state.token && <Link to="/todos"><div>todos</div></Link>}
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            <button onClick={() => this.handleTokenChange('')}>logout</button>
          </ul>
          <Switch>
            <Route exact path='/login' render={(routerProps) => <Login
              handleTokenChange={this.handleTokenChange}
              {...routerProps} />}
            />
            <Route
              exact path='/signup'
              render={(routerProps) => <SignUp
                handleTokenChange={this.handleTokenChange}
                {...routerProps} />}
            />
            <PrivateRoute
              exact
              path='/todos'
              token={this.state.token}
              render={(routerProps) => <Todos
                {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}






