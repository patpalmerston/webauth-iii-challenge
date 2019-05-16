import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Login from './login/Login';
import Users from './users/Users';
import Register from './register/Register'

class App extends React.Component { //turned to class for logout functionality but no state needed
  
  render() {
    return(
      <>
      
      <header>
        <nav>
          <NavLink to="/register">Register</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/users">Users</NavLink>
          &nbsp; | &nbsp;
          <button onClick={this.logout}>Logout</button>
        </nav>
      </header>

      <main>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </main>
    
      </>
    )
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  }
}

export default withRouter(App);