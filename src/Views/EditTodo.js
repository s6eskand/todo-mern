import React from 'react';
import axios from 'axios';

class EditTodo extends React.Component{
    constructor(props) {
        super(props);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleResponsibleChange = this.handleResponsibleChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleCompletionChange = this.handleCompletionChange.bind(this);

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            isComplete: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    description: res.data.description,
                    responsible: res.data.responsible,
                    priority: res.data.priority,
                    isComplete: res.data.isComplete
                })
            })
            .catch(err => console.error(err));
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value,
        })
    }

    handleResponsibleChange = (e) => {
        this.setState({
            responsible: e.target.value,
        })
    }

    handlePriorityChange = (e) => {
        this.setState({
            priority: e.target.value,
        })
    }

    handleCompletionChange = (e) => {
        this.setState({
            isComplete: !this.state.isComplete,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}`, {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            isComplete: this.state.isComplete,
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));

        this.props.history.push('/');
    }

    render() {
        return(
            <div className="todo-component">
                <div className="container">
                    <h3>Edit Your Todo Item!</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group" id="input-value">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />
                            <label>Responsible</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.responsible}
                                onChange={this.handleResponsibleChange}
                            />
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
                                <div className="form-check" id="completion">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="completedCheckbox"
                                        name="completedCheckbox"
                                        onChange={this.handleCompletionChange}
                                        checked={this.state.isComplete}
                                        value={this.state.isComplete}
                                    />
                                    <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="submit" value="Update Todo" className="btn btn-primary"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditTodo;