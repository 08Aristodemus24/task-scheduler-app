import React, { Component } from 'react';

export default class TestComponent1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0
        };
        this.deleteTask = this.deleteTask.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleIdChange(event){
        this.setState({id: event.target.value})
    }

    deleteTask(event){
        event.preventDefault();
        this.props.handleDelete(this.state['id']);
    }

    render(){
        const data = this.props['data'];
        
        const jsx_tasks = data.map((data, index) => {
            const id = data['id'];

            const task_name = data['task_name'];
            const est_days = data['est_days'];
            
            // creates date but not in right timezone
            const date = new Date(data['deadline']);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getUTCDate();
            const hour = date.getUTCHours();
            const minute = date.getUTCMinutes();
            const second = date.getUTCSeconds();
            
            const difficulty = data['difficulty'];
            
            return (
                <li key={index} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{task_name}</h5>
                        <small>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close" 
                                data-bs-toggle="modal" 
                                data-bs-target="#deleteTaskModal"
                                onClick={this.handleIdChange} 
                                value={id}
                            />
                            <div className="modal fade" id="deleteTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete selected task?</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-success" 
                                                onClick={this.deleteTask} 
                                                data-bs-dismiss="modal" 
                                                aria-label="Close"
                                            >
                                                Yes
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger" 
                                                data-bs-dismiss="modal" 
                                                aria-label="Close"
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </small>
                    </div>
                    <p className="mb-1">{`estimated days to work on: ${est_days}`}</p>
                    <p className="mb-1">{`deadline: ${month}/${day}/${year} ${hour}:${minute}:${second}`}</p>
                    <p className="mb-1">{`difficulty: ${difficulty}`}</p>
                </li>
            );
        });

        return (
            <ul className="list-group list-group-flush">
                {jsx_tasks}
            </ul>
        );
    }
}

