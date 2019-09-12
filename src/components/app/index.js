import React, {Component} from 'react';

import AppHeader from '../appHeader';
import Search from '../searchPanel';
import ItemStatusFilter from '../itemStatusFilter';
import TodoList from '../todoList';
import AddItem from '../addItem';

import './index.css'

class App extends Component {

  maxId = 0;

  state = {
    todoData:  [],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
  return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deletItem = (id) => {
    this.setState(({todoData}) => {

      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx+1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
        const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
          ...arr.slice(0, idx),
          newItem,
          ...arr.slice(idx + 1)
        ];
    };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term })
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label
                 .toUpperCase()
                 .indexOf(term.toUpperCase()) > -1;
    });
  };

  filter(items, filter) {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    };
  };

  render () {

    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
  //const todoCount = this.state.todoData.filter((el) => !el.done);
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
        <Search
          onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter
          filter={filter}
          onFilterChange = {this.onFilterChange}/>
        </div>
        <TodoList
          todos = {visibleItems}
          onDeleted={this.deletItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem
          onAdded={this.addItem}
        />
      </div>
    )}
};

export default App;
