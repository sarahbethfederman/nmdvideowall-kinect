import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoHeader from './TodoHeader.js';
import TodoList from './TodoList.js';
import TodoFooter from './TodoFooter.js';

import * as entriesActionCreators from '../actions/EntriesAction.js';

@connect((state) => {
  return {
    entries: state.entries,
    filter: state.filter
  };
}, entriesActionCreators)
export default class TodoApp extends Component {
  render() {
    const { entries, filter, setFilter } = this.props;
    return (
      <section className="todoapp">
        <TodoHeader addTodo={addTodo}/>
        <TodoList todos={todos} filter={filter} toggleChecked={toggleChecked} deleteTodo={deleteTodo}/>
        <TodoFooter todos={todos} filter={filter} setFilter={setFilter} clearTodo={clearTodo}/>
      </section>
    );
  }
}
