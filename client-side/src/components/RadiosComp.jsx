import React from 'react';

export default function RadioComps(props){
    const rad_comps = [1, 2, 3, 4, 5].map((num, i) => {
        return (
            num === 1 ? 
            <div key={i} className="form-check form-check-inline">
                <input
                    name="difficulty"
                    className="form-check-input" 
                    type="radio"
                    id="inlineRadio1" 
                    value={num}
                    onChange={props.handleInputChange}
                    checked={props['difficulty'] == num}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">{num}</label>
            </div> :
            <div key={i} className="form-check form-check-inline">
                <input
                    name="difficulty"
                    className="form-check-input" 
                    type="radio"
                    id="inlineRadio1" 
                    value={num}
                    onChange={props.handleInputChange}
                    checked={props['difficulty'] == num}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">{num}</label>
            </div>
        );
    });

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Difficulty</span>
            <div className="form-check">
                {rad_comps}
            </div>
        </div>
    );
}