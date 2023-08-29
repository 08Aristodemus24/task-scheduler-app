import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import './App.css';
import './css/bootstrap-5.0.0-beta3-dist/css/bootstrap.min.css';
import './css/bootstrap/css/overwrite.css'
import './css/bootstrap/css/timeline.css'



import Home from './components/HomePage';
import Timeline from './components/TimelineComp';



export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            task_raws: []
        };
        this.pressStateUpward = this.pressStateUpward.bind(this);
    }

    componentDidMount(){
        console.log('mounting successful');
    }

    componentDidUpdate(){
        console.log(this.state['task_raws']);
        console.log('update successful');
    }

    pressStateUpward(task_raws){
        
        this.setState({task_raws: task_raws.slice()});
    }

    render(){
        return (
            <Router>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="Navbar">Navbar</a>

                        <button
                            className="navbar-toggler"
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">About</Link>                                    
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/timeline" className="nav-link">Timeline</Link>
                                </li>
                            </ul>
                        </div>

                        
                    </div>
                </nav>

                <Switch>
                    <Route path="/timeline">
                        <Timeline task_raws={this.state['task_raws']}/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/">
                        <Home pressStateUpward={this.pressStateUpward}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}



function About(){
    return (
        <div className="App">
            <h1>About</h1>
        </div>
    );
}

function Login(props){
    return (
        <div className="App">
            <h1>Login</h1>
        </div>
    );
}





