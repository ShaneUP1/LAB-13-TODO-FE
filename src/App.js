import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import SignUp from './SignUp.js';
import Login from './Login.js';
import './App.css';
import PrivateRoute from './PrivateRoute.js';
import Todos from './Todos.js';
import Home from './Home.js';

import React, { Component } from 'react'

export default class App extends Component {

  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || ''
  }

  changeTokenAndUsername = (email, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', email);

    this.setState({
      username: email,
      token: token
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })
  }


  render() {
    return (
      <div>
        <Router>
          <ul>
            {
              this.state.token
                ? <div className='user-login-info'>
                  <Link to="/"><div>Home</div></Link>
                  <Link to="/todos"><div>Todo List</div></Link>
                  {this.state.username}
                  <button onClick={this.logOut}>Log out</button>
                </div>
                : <>
                  <Link to="/login"><div>log in</div></Link>
                  <Link to="/signup"><div>sign up</div></Link>
                </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) =>
              <Login
                {...routerProps}
                changeTokenAndUsername={this.changeTokenAndUsername}
              />
            }
            />
            <Route exact path='/signup' render={(routerProps) =>
              <SignUp
                {...routerProps}
                changeTokenAndUsername={this.changeTokenAndUsername}
              />
            }
            />
            <PrivateRoute
              token={this.state.token}
              exact
              path='/todos'

              render={(routerProps) => <Todos
                token={this.state.token}
                {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}






