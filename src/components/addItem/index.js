import React, {Component} from 'react';

import './index.css';

class AddItem extends Component  {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label)
    this.setState({
      label: ''
    });
  };

  render () {

  return (

    <form className="addItem"
          onSubmit={this.onSubmit}>
      <input type="text"
             className="form-control add-item"
             placeholder="add new todo element"
             onChange={this.onLabelChange}
             value={this.state.label}/>
      <button type="button"
              className="btn btn-success"
              onClick={this.onSubmit}>
      Add
      </button>
    </form>
  )
 }
};

export default AddItem;
