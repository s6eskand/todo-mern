import React from 'react';
import axios from 'axios';

class CreateTodo extends React.Component {
    constructor(props) {
        super(props);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleResponsibleChange = this.handleResponsibleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            isComplete: false,
        }
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleResponsibleChange = (e) => {
        this.setState({
            responsible: e.target.value
        })
    }

    handlePriorityChange = (e) => {
        this.setState({
            priority: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form Submitted (frontend)');
        console.log(this.state);

        const newTodo = {
            newDescription: this.state.description,
            newResponsible: this.state.responsible,
            newPriority: this.state.priority,
            isComplete: this.state.isComplete
        }

        axios.post('http://localhost:4000/todos/add', {
            description: newTodo.newDescription,
            responsible: newTodo.newResponsible,
            priority: newTodo.newPriority,
        })
            .then(res => console.log(res.data));

        this.setState({
            description: '',
            responsible: '',
            priority: '',
            isComplete: false,
        })

        this.props.history.push('/');
    }


    render() {
        return(
            <div className="todo-component">
                <div className="container">
                    <h3>Create a Todo Here!</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Description: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Responsible: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.responsible}
                                onChange={this.handleResponsibleChange}
                            />
                        </div>
                        <div className="form-group">
                            <div id="priority" className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="priorityOptions"
                                       id="priorityLow"
                                       value="Low"
                                       checked={this.state.priority === 'Low'}
                                       onChange={this.handlePriorityChange}
                                />
                                <label className="form-check-label">Low</label>
                                <input className="form-check-input"
                                       type="radio"
                                       name="priorityOptions"
                                       id="priorityMedium"
                                       value="Medium"
                                       checked={this.state.priority === 'Medium'}
                                       onChange={this.handlePriorityChange}
                                />
                                <label className="form-check-label">Medium</label>
                                <input className="form-check-input"
                                       type="radio"
                                       name="priorityOptions"
                                       id="priorityHigh"
                                       value="High"
                                       checked={this.state.priority === 'High'}
                                       onChange={this.handlePriorityChange}
                                />
                                <label className="form-check-label">High</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Todo" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateTodo;