import React from 'react';

export default function MonthsComp(){
    const month_comps = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ].map((month, i) => {
        return (
            month === "Jan" ? 
            <option defaultValue key={i} value={month}>{month}</option> : 
            <option key={i} value={month}>{month}</option>
        );
    });

    return (
        <>
            {month_comps}
        </>
    );
}


