import React, { Component } from 'react'


class TodoList extends Component {
    constructor(props) {
        super(props);

        this.prioritySelect = this.prioritySelect.bind(this);
        this.editHandler=this.editHandler.bind(this);
        this.deleteThis = this.deleteThis.bind(this);
        this.submitThis = this.submitThis.bind(this);
        this.handleChange = this.handleChange.bind(this);


        this.state = {
            text: '',
            priority: ''
        }
    }
	prioritySelect(event) {
        this.setState({ priority: event.target.value });
    }
    editHandler(event){
        this.setState ({text: this.props.todo.text});
        this.props.onEdit(this.props.todo.id);
    }
    deleteThis(event) {
        this.props.deleteThis(this.props.todo.id);
    }
    submitThis(event) {
        this.props.submitThis(this.state.text, this.state.priority, this.props.todo.id); 
    }

    handleChange(event) {
       this.setState({ text: event.target.value});
    }

    render() {
        if (this.props.todo.priority == 1) {
            var priority = 'alert-success';
        } else if (this.props.todo.priority == 2) {
            var priority = 'alert-info';
        } else {
            var priority = 'alert-danger'; 
        }
        if (this.props.todo.isEditing === true) {
        return (
        <div className="alert alert-success" >
	        <h6><strong>Description</strong></h6>
	        <textarea className="form-control update-todo-text" defaultValue={this.props.todo.text} id="exampleFormControlTextarea1" rows="1" onChange={this.handleChange}></textarea>
	        <h6 className="font-weight-bold update-todo-priority">Priority</h6>
	        <select className="form-control" defaultValue={this.props.todo.priority} onChange={this.prioritySelect}>
		        <option value={''}>Select a Priority</option>
		        <option value="1">Low Priority</option>
		        <option value="2">Mid Priority</option>
		        <option value="3">High Priority</option>
	        </select>
	        <button type="button" className="btn btn-success pull-right update-todo " onClick={this.submitThis}>Save</button>
        </div>)
        }else{
        return (
        <li className={`alert ${priority}`}>
	        <input className="form-check-input" type="checkbox" id="inlineCheckbox2"/>
	        {this.props.todo.text}
	        <button className="fa fa-trash pull-right delete-todo" aria-hidden="true" onClick={this.deleteThis}></button>
	        <button className="fa fa-pencil-square-o pull-right edit-todo" aria-hidden="true" onClick={this.editHandler}></button>                  
        </li>);
        }
    }
}
export default TodoList;