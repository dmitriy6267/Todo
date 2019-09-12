import React, { Component } from 'react';

import './index.css';

class ItemStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  render () {

    const {filter, onFilterChange} = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      const classes = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button"
                className={`btn ${classes}`}
                key={name}
                onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

export default ItemStatusFilter;
