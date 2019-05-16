import React from 'react';
import axios from 'axios';



class Login extends React.Component {
  state = {
    //sam is already registered
    username: 'same',
    password: 'pass'
  }
  render() {
    return(
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor='username' />
            <input 
              name='username'
              id='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>

          <div>
            <label htmlFor='password' />
            <input 
                name='password'
                id='password'
                value={this.state.password}
                onChange={this.handleInputChange}
                type='password'
              />
          </div>
          
          <div>
            <button type='submit'>Login</button>
          </div>

        </form>
      </div>
    )
  }

  // class methods
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const endpoint =  'http://localhost:4000/api/auth/login';

    axios.post(endpoint, this.state)
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      this.props.history.push('/users');
    })
    .catch(err => {
      console.log(err)
    })
  }

}



export default Login;