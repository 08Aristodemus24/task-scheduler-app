import React from 'react';

export default function DaysComp(){
    const days_comps = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ].map((index) => {
        return (
            index === 1 ? 
            <option defaultValue key={index} value={index}>{index}</option> : 
            <option key={index} value={index}>{index}</option>
        );
    });

    return (
        <>
            {days_comps}
        </>
    );
}