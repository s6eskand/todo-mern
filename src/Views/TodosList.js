import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Todo from "../Components/Todo";

class TodosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => console.error(err));
    };

    todoList = () => {
        if (this.state) {
            return (
                this.state.todos.map((cur, i) => {
                    return <Todo todo={cur} key={i}/>
                })
            )
        }
    }

    render() {
        return(
            <div className="todo-component">
                <div className="container">
                    <h3>The Full List of Todos!</h3>
                    <table className="table table-striped todo-component">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.todoList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TodosList;