import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

class App extends Component {
  // Example of custom static data.
  // state = {
  //   todos: [
  //     {
  //       id: uuid.v4(),
  //       title: 'Todo 1',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Todo 2',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Todo 3',
  //       completed: false
  //     }
  //   ]
  // }

  // To be filled by JSONPlaceholder
  // https://jsonplaceholder.typicode.com/todos
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get(apiUrl + '?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }

        return todo;
      })
    })
  }

  // Delete Todo
  delTodo = (id) => {
    // this.setState({
    //   todos: [...this.state.todos.filter(todo => todo.id !== id)]
    // })

    axios.delete(apiUrl + `/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
  }

  // Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }

    // this.setState({ todos: [...this.state.todos, newTodo] })

    const newTodo = {
      title,
      completed: false
    }

    axios.post(apiUrl, newTodo)
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos 
                  todos={this.state.todos} 
                  markComplete={this.markComplete} 
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
