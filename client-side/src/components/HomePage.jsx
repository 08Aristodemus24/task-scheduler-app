import React from 'react';

// test components
import TestComponent1 from './TaskElementsComp';
import ModalBox from './ModalBoxComp';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            task_name: "",
            est_days: 0.0,
            deadline: {
                month: "Jan",
                day: 1,
                year: 2021
            },
            difficulty: 1,
            data: [],
            is_loading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }

    fetchData(){
        // set new state of data and then clear state of 
        // input values
        fetch('http://127.0.0.1:8000/index/getposttaskraw')
        .then((response) => {
            // check if response returns true to flag a successful response
            if(!response.ok){
                throw Error(response.statusText);
            }
            
            // if no error is thrown convert the response to json format
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log('fetching complete will set state');
            const temp = data.slice();
            this.setState({
                task_name: "",
                est_days: 0.0,
                deadline: {
                    month: "Jan",
                    day: 1,
                    year: 2021
                },
                difficulty: 1,
                data: temp,
            });
        })
        .catch((error) => console.log(error));
    }

    componentDidUpdate(){
        console.log(this.state['data']);
        console.log('update successful');
    }

    componentDidMount(){
        this.setState({is_loading: true})
        fetch('http://127.0.0.1:8000/index/getposttaskraw')
        .then((response) => {
            // check if response returns true to flag a successful response
            if(!response.ok){
                throw Error(response.statusText);
            }
            
            // if no error is thrown convert the response to json format
            return response.json();
        })
        .then(data => {
            // console.log(data);
            console.log('fetching complete will set state');
            const temp = data.slice();
            this.setState({
                data: temp,
                is_loading: false
            });
        })
        .catch((error) => console.log(error));
        console.log('mounting successful');
    }
    
    handleInputChange(in_att, in_val){
        
        // this expression will check if entered string contains
        // any character besides numbers the match() method will return null
        const est_days_exp = /^[0-9]+$/;
        const year_exp = /^[0-9]+$/;

        // if user enters a 
        if(in_att === 'task-name'){
            this.setState({
                task_name: in_val
            });

        }else if(in_att === 'est-days'){
            // empty string is not allowed
            // input with number and string is not allowed
            this.setState({
                est_days: in_val.match(est_days_exp) === null ? 0.0 : parseFloat(in_val)
            });

        }else if(in_att === 'month'){
            this.setState({
                deadline: {
                    month: in_val,
                    day: this.state['deadline']['day'],
                    year: this.state['deadline']['year']
                }
            });

        }else if(in_att === 'day'){
            this.setState({
                deadline: {
                    month: this.state['deadline']['month'],
                    day: in_val,
                    year: this.state['deadline']['year']
                }
            });

        }else if(in_att === 'year'){
            this.setState({
                deadline: {
                    month: this.state['deadline']['month'],
                    day: this.state['deadline']['day'],
                    year: in_val.match(year_exp) === null ? 2021 : parseInt(in_val)
                }
            });

        }else{
            this.setState({
                difficulty: in_val
            });

        }
    }

    getCookie(name){
        let cookieValue = null;
        if (document.cookie && document.cookie !== ''){
            const cookies = document.cookie.split(';');
            for(let i = 0; i < cookies.length; i++){
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if(cookie.substring(0, name.length + 1) === (name + '=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleGenerate(event){
        event.preventDefault();
        this.props.pressStateUpward(this.state['data']);
    }

    handleSubmit(event){
        event.preventDefault();

        const csrf_token = this.getCookie('csrftoken');

        // this will add elements to the list
        // use the state to create the task elemeent
        const data_to_push = {
            task_name: this.state['task_name'],
            est_days: this.state['est_days'],
            deadline: {
                month: this.state['deadline']['month'],
                day: this.state['deadline']['day'],
                year: this.state['deadline']['year']
            },
            difficulty: this.state['difficulty']
        };

        // simultaneously post the submitted data to the backend
        // so that model may be created for it and then put in the DB
        fetch('http://127.0.0.1:8000/index/getposttaskraw', {
            method: 'POST',
            body: JSON.stringify(data_to_push),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrf_token
            }
        })
        .then((response) => {
            // check if response returns true to flag a successful response
            if(!response.ok){
                throw Error(response.statusText);
            }
            
            // if no error is thrown convert the response to json format
            return response.json();
        })
        .then((response) => console.log(response))
        .then(() => this.fetchData())
        .catch((error) => console.log(error));
    }

    handleDelete(task_raw_id){
        const csrf_token = this.getCookie('csrftoken');
        fetch(`http://127.0.0.1:8000/index/deletetaskraw/${task_raw_id}`, {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrf_token
            }
        })
        .then((response) => console.log(response.json))
        .then(() => this.fetchData());
    }

    render(){
        return (
            <div className="App">
                <div className="card" style={{width: "36rem"}}>
                    <div>
                        <div className="col">
                            <div className="card-header">
                                Priority Task Scheduler
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Username</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Number of current tasks: {this.state['data'].length}</h6>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit modi mollitia, dolores distinctio numquam eaque fugiat quas voluptatem? Similique, nostrum aut? Quidem quos ipsa labore! Earum sunt sit tempora impedit?</p>
                                
                                {/* this will contain the modal box */}
                                <ModalBox
                                    handleInputChange={this.handleInputChange} 
                                    handleSubmit={this.handleSubmit} 
                                    input-data={this.state}
                                />
                            </div>
                        </div>

                        {/* div that will contain the submitted elements */}
                        <div className="col">
                            {this.state['is_loading'] === true ? <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : <TestComponent1 data={this.state['data']} handleDelete={this.handleDelete}/>}
                        </div>

                        <div className="col">
                            <div className="card-body">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    disabled={this.state['data'].length === 0} 
                                    onClick={this.handleGenerate} 
                                >
                                    Generate Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}