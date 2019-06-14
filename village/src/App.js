import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, NavLink } from 'react-router-dom';

import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  }
  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  };
  deleteSmurf = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className='App'>
        <div className='navbar-wrapper'>
          <nav className='navbar'>
            <NavLink exact to='/'>
              Smurf List
            </NavLink>
            <NavLink to='/smurf-form'>Add Smurf</NavLink>
          </nav>
        </div>
        <Route
          exact
          path='/'
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
        <Route
          path='/smurf-form'
          render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />}
        />
        <Route
          path='/smurfs/:id'
          render={props => <Smurf {...props} smurfs={this.state.smurfs} />}
        />
        <Link to='/'>Smurf List</Link>
        <Link to='/smurf-form'>Add Smurf</Link>
        {/* <SmurfForm addSmurf={this.addSmurf} /> */}
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
      </div>
    );
  }
}

export default App;
