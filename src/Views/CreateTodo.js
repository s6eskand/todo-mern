import React from 'react';

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

        console.log('Form Submitted')
        console.log(this.state)

        this.setState({
            description: '',
            responsible: '',
            priority: '',
            isComplete: false,
        })
    }


    render() {
        return(
            <div style={{paddingTop: '100'}}>
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
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateTodo;