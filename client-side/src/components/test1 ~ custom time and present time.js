

// export const getDate = (utc, year, month, day, hour, minute, second) => {
//     return (
//         utc === true ? 
//         new Date(Date.UTC(year, month - 1, day, hour, minute, second)) : 
//         new Date(year, month - 1, day, hour, minute, second)
//     );
// }

// export const parseStringDate = (utc, date) => {
//     const year;
//     const month;
//     const day;
//     const hour;
//     const minute;
//     const second;
// }

// use localString to extract true time in present times 

let test_1 = new Date("2022-12-24T23:40:01Z");
let test_2 = new Date();



// or maybe we can use the following to parse both the dates
// 
const temp_date_1 = {
    month: test_1.getMonth() + 1,
    date: test_1.getUTCDate(),
    year: test_1.getFullYear(),
    hour: test_1.getUTCHours(),
    minute: test_1.getUTCMinutes(),
    second: test_1.getUTCSeconds(),
}

const temp_date_2 = {
    month: test_2.getMonth() + 1,
    date: test_2.getUTCDate(),
    year: test_2.getFullYear(),
    hour: test_2.getHours(),
    minute: test_2.getUTCMinutes(),
    second: test_2.getUTCSeconds(),
}


const new_date_1 = `${test_1.getMonth() + 1} ${test_1.getUTCDate()} ${test_1.getFullYear()} ${test_1.getUTCHours()}:${test_1.getUTCMinutes()}:${test_1.getUTCSeconds()}`;
const new_date_2 = `${test_2.getMonth() + 1} ${test_2.getUTCDate()} ${test_2.getFullYear()} ${test_2.getHours()}:${test_2.getUTCMinutes()}:${test_2.getUTCSeconds()}`;

console.log(test_1);
console.log(test_2, '\n');
console.log(new_date_1);
console.log(new_date_2, '\n');


const utc_1 = new Date(Date.UTC(
    temp_date_1.year,
    temp_date_1.month - 1,
    temp_date_1.date,
    temp_date_1.hour,
    temp_date_1.minute,
    temp_date_1.second
));

const utc_2 = new Date(Date.UTC(
    temp_date_2.year,
    temp_date_2.month - 1,
    temp_date_2.date,
    temp_date_2.hour,
    temp_date_2.minute,
    temp_date_2.second
));


console.log(utc_1);
console.log(utc_2);

// results were the following
// 2021-07-24T23:59:59.000Z
// 2021-07-21T05:31:51.875Z
// the current time was 1:31:51 PM but it sent out
// 5:31:51