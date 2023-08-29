import React from 'react';
import { Component } from 'react';

// attachments
import DaysComp from './DaysComp';
import MonthsComp from './MonthsComp';
import RadioComps from './RadiosComp';



export default class ModalBox extends Component{
    constructor(props){
        super(props);
        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(event){
        const in_att = event.target.getAttribute('name');
        const in_val = event.target.value;
        this.props.handleInputChange(in_att, in_val)
    }

    render(){
        return (
            <>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                >
                    Enter Task
                </button>
    
                {/* dialog box to show */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter Task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
    
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Task name</span>
                                    <input
                                        name="task-name"
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        onChange={this.changeInput}
                                        value={this.props['input-data']['task_name']}
                                    />
                                </div>
    
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Est. days to work on task</span>
                                    <input
                                        name="est-days"
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        onChange={this.changeInput}
                                        value={this.props['input-data']['est_days']}
                                    />
                                </div>
    
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Deadline</span>
                                    <select
                                        name="month"
                                        className="form-select" 
                                        aria-label="Default select example" 
                                        onChange={this.changeInput} 
                                        value={this.props['input-data']['deadline']['month']}
                                    >
                                        <MonthsComp/>
                                    </select>
                                    <select
                                        name="day"
                                        className="form-select" 
                                        aria-label="Default select example"
                                        onChange={this.changeInput}
                                        value={this.props['input-data']['deadline']['day']}
                                    >
                                        <DaysComp/>
                                    </select>
                                    <input
                                        name="year"
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        onChange={this.changeInput}
                                        value={this.props['input-data']['deadline']['year']}
                                    />
                                </div>
    
                                <div className="input-group mb-3">
                                    <RadioComps handleInputChange={this.changeInput} difficulty={this.props['input-data']['difficulty']}/>
                                </div>
                            </div>
    
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal" 
                                    onClick={this.props.handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } 
}

            