import React, { Component } from 'react';
import TodoList from './TodoList'; 


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      priority: '',
      todos: []
    }
    this.count = 0;
    this.handleChange = this.handleChange.bind(this);
    this.prioritySelect = this.prioritySelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.saveHandler=this.saveHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }
  prioritySelect(event) {
    this.setState({ priority: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    if(this.state.text == ''){
      return false
      
    }

    const newTodo = {
      id: this.count++,
      text: this.state.text,
      priority: this.state.priority,
      isEditing: false
    }

    let allTodos = this.state.todos;

    allTodos.push(newTodo);
    
    this.setState({ todos: allTodos });
    
  }

  editClick(id) {

    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const allTodos = this.state.todos;

    allTodos[index].isEditing = true;

    this.setState({todos: allTodos});
  }

  deleteHandler(id) {
    const index =this.state.todos.findIndex((todo) => todo.id===id);
    const allTodos= this.state.todos;
    allTodos.splice(index, 1);
    this.setState({todos:allTodos});
  }

  saveHandler(text, priority, id){
    const index =this.state.todos.findIndex((todo) => todo.id===id);
    const todoLi=this.state.todos;

    todoLi[index].isEditing=false;
    todoLi[index].text= text;
    todoLi[index].priority =priority;
    this.setState({todos: todoLi});

}

  render() {
   
    return (
      <div className="container">
        <header>
          <h1>Very Simple Todo App</h1>
          <h2>TRACK ALL OF THE THINGS</h2>
        </header>


        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="panel ppd bgblack">
              <div className="panel-heading"><strong>ADD NEW TO DO</strong></div>
              <div className="panel-body">
                <h4>I want to...</h4>
                  <textarea onChange={this.handleChange} className="form-control create-todo-text" id="exampleFormControlTextarea1" rows="3"></textarea>
                <h4>How much of a priority is this?</h4>
                <select className="form-control mb-5 create-todo-priority" onChange={this.prioritySelect}>
                  <option value={''}>Select a Priority</option>
                  <option value={1} >Low</option>
                  <option value={2} >Mid</option>
                  <option value={3} >High</option>
                </select>
              <div className="panel-footer">
                <button className="btn btn-success btn-block create-todo" value='submit' onClick={this.handleClick}>
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>

          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="panel ppd bgblack">
              <div className="panel-heading">VIEW TO DO</div>
               <div className="panel-body intro">
               <h4><strong>Welcome to Very Simple Todo App!</strong></h4>
               <h4><strong>Get started now by adding a new todo on the left.</strong></h4>
              </div>
              <ul className="tdl">
                {
                this.state.todos.map(todo => (
                  <TodoList 
                   key={todo.id}
                   onEdit={this.editClick} 
                   submitThis={this.saveHandler} 
                   deleteThis={this.deleteHandler} 
                   todo={todo} />
                  ))
                }
              </ul>

            </div>
          </div>

        </div>
      </div>

    );
  }
}




export default App;
