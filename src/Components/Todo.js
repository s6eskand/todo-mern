import React from 'react';
import { Link } from 'react-router-dom';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <tr>
                <td>{this.props.todo.description}</td>
                <td>{this.props.todo.responsible}</td>
                <td>{this.props.todo.priority}</td>
                <td>
                    <Link to={`/edit/${this.props.todo._id}`}>Edit</Link>
                </td>
            </tr>
        )
    }
}

export default Todo;