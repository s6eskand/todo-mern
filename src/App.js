import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TodosList from "./Views/TodosList";
import EditTodo from "./Views/EditTodo";
import CreateTodo from "./Views/CreateTodo";
import Navbar from "./Components/Navbar";

class App extends React.Component{
  render() {
    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={TodosList} />
                    <Route exact path="/edit/:id" component={EditTodo}/>
                    <Route exact path="/create" component={CreateTodo}/>
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
