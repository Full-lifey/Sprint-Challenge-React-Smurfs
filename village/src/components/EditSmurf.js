import React, { Component } from 'react';

class EditSmurf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  componentDidMount() {
    this.setState({ smurf: this.props.activeSmurf });
  }

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
        [e.target.name]: e.target.value
      }
    }));
  };

  submitEditSmurf = (e, smurf) => {
    e.preventDefault();
    this.props.submitEditSmurf(e, this.state.smurf);
  };

  render() {
    return (
      <div className='SmurfForm'>
        <form onSubmit={this.submitEditSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder='name'
            value={this.state.smurf.name}
            name='name'
          />
          <input
            onChange={this.handleInputChange}
            placeholder='age'
            value={this.state.smurf.age}
            name='age'
          />
          <input
            onChange={this.handleInputChange}
            placeholder='height'
            value={this.state.smurf.height}
            name='height'
          />
          <button type='submit'>Edit Smurf</button>
        </form>
      </div>
    );
  }
}

export default EditSmurf;
