import React, { Component } from 'react';

class Item{
    #_est_days;
    #_deadline;
    constructor(task_name, est_days, deadline, deadline_val, difficulty){
        this.task_name = task_name;
        this.#_est_days = est_days;
        this.#_deadline = deadline;
        this.deadline_val = deadline_val;
        this.difficulty = difficulty;
    }
    
    value(){
        return this.#_est_days + this.deadline_val + this.difficulty;
    }

    weight(){
        return this.#_est_days;
    }

    ratio(){
        return this.value() / this.weight()
    }

    deadline(){
        return this.#_deadline;
    }

    toString(){
        return (
            `task name: ${this.task_name}\n
            estimated days to work on task: ${this.#_est_days}\n
            deadline: ${this.#_deadline}\n
            deadline_val: ${this.deadline_val}\n
            difficulty: ${this.difficulty}`
        );
    }
}

const createTasks = (task_raws) => {
    // check if array of task_raws is empty 

    if(task_raws.length !== 0){
        // sort the ff tasks in reverse, first

        // problem: this shows ordered array
        console.log(task_raws);
        
        const temp = [].concat(task_raws);

        // problem: right after merely copying the array is now in reverse
        // that is why negative is being logged in the sorting funciton
        console.log(temp);
        const sorted_tasks = temp.sort((first_elem, sec_elem) => {
            const temp_date_1 = new Date(first_elem['deadline']);
            const temp_date_2 = new Date(sec_elem['deadline']);

            // this operation will make sure array is sorted in reverse
            return temp_date_2 - temp_date_1;
        });
        
        // create corresponding objects for each task
        const items = sorted_tasks.map((task, index) => {
            const deadline = new Date(task['deadline']);            
            const temp_item = new Item(task['task_name'], task['est_days'], deadline, index, task['difficulty']);
            return temp_item;
        });

        console.log(items);
        return items;
    }

    return [];
}

const getMaxVal = (items, capacity) => {
    let CAP = capacity;
    const temp = items.slice();
    console.log(temp);

    // sort array according to ratio of each task 
    // in desecending order
    temp.sort((item_1, item_2) => item_1.ratio() > item_2.ratio() ? -1 : 1);
    console.log(temp);

    let total_value = 0;
    let knapsack = [];
    for(let [index, task] of temp.entries()){
        console.log(index, task);

        let cur_wt = task.weight();
        let cur_vl = task.value();

        // when capacity has still space then subtract the capacity
        // with the item's corresponding weight
        if((CAP - cur_wt) >= 0){
            CAP = CAP - cur_wt;
            total_value = total_value + cur_vl;
            console.log(1);

            const elapsed_time = `${Math.trunc((cur_wt * 86400) / 3600)}:${Math.trunc(((cur_wt * 86400) % 3600) / 60)}:${Math.trunc(((cur_wt * 86400) % 3600) % 60)}`;
            // add the task to the knapsack and its weight, 
            knapsack.push([task, elapsed_time]);

        }else{
            let fraction = CAP / cur_wt;
            total_value = total_value + (cur_vl * fraction);
            console.log(0);

            const temp_wt = cur_wt * fraction;
            const elapsed_time = `${Math.trunc((temp_wt * 86400) / 3600)}:${Math.trunc(((temp_wt * 86400) % 3600) / 60)}:${Math.trunc(((temp_wt * 86400) % 3600) % 60)}`;
            knapsack.push([task, elapsed_time]);
            break;
        }
    }

    console.log(knapsack);
    return knapsack;
}

const util = (items) => {
    // should no items be present return an empty array
    if(items.length !== 0){
        // the problem here is that new Date/time now is wrong when
        // UTC is extracted from each component of time y,m,d,h,m,s
        const present = new Date();
        const year = present.getFullYear();
        const month = present.getMonth() + 1;
        const day = present.getUTCDate();
        const hour = present.getHours();
        const min = present.getUTCMinutes();
        
        const present_utc = new Date(Date.UTC(year, month - 1, day, hour, min + 1, 0))

        const deadline = items[items.length - 1].deadline();

        const diff = deadline - present_utc;
        const capacity_days = diff / 86400000;
        const capacity_ET = `${Math.trunc((diff / 1000) / 3600)}:${Math.trunc(((diff / 1000) % 3600) / 60)}:${Math.trunc(((diff / 1000) % 3600) % 60)}`;
        console.log(present_utc.toUTCString(), deadline.toUTCString(), diff, capacity_days, capacity_ET);

        return getMaxVal(items, capacity_days);
    }

    // return empty array 
    return [];
}

function TimelineRows(props){
    const items = createTasks(props['task_raws']);
    const knapsack = util(items);

    const jsx_tlrows = knapsack.length === 0 ? <h1>No schedule available</h1> : <div className="timeline">
        {knapsack.map((task, index) => {

            const [day, temp_dt] = task[0].deadline().toUTCString().split(',');
            const datetime = temp_dt.split(' ');
            const date = datetime[1];
            const month = datetime[2];
            const year = datetime[3];
            const time = datetime[4];

            return (
                <div key={index} className="timeline-row">
                    <div className="timeline-time">{time}<small>{`${date} ${month} ${year} ${day}`}</small></div>
                    <div className="timeline-dot fb-bg"></div>
                    <div className="timeline-content">
                        <i className="fa fa-map-marker"></i>
                        <h4>{task[0]['task_name']}</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur repudiandae temporibus at doloribus praesentium.</p>
                        <div className="">
                            <p className="badge badge-light">elapsed time to work on task: </p>
                            <p className="badge badge-light"><mark>{task[1]}</mark></p>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>

    return (
        <>
            {jsx_tlrows}
        </>
    );
}

export default class Timeline extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="App">
                <TimelineRows task_raws={this.props['task_raws']}/>
            </div>
        );
    }
}