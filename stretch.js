import { fifaData } from './fifa.js';
import { removeDuplicateInArray } from './index.js';


function getYears (data) {
    const transformedDataArray = [];
    for (let i =0; i < data.length; i++) {
        const arrayObject = data[i];
        transformedDataArray.push(arrayObject["Year"]);
    }
    return removeDuplicateInArray(transformedDataArray);
}


function countryCounter (data, teamInitial) {
    const yearsArray = getYears(data);
    let counter = 0;
    for (let i = 0; i < yearsArray.length; i++) {
        const oneYear = data.filter(year => year.Year === yearsArray[i]);
        if (oneYear.filter(game => game["Home Team Initials"] === teamInitial || game["Away Team Initials"] === teamInitial).length != 0) {
            counter++;
        }
    }
    return counter;
}

console.log(countryCounter(fifaData, "URS"));

