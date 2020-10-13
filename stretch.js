import { fifaData } from './fifa.js';
import { removeDuplicateInArray } from './index.js';
import { getFinals } from './index.js';

//1 Task
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

console.log("Total number of Soviet Union World Cup appearances = ",countryCounter(fifaData, "URS"));

//2 Task
function accountTies (data) {
    const finalsData = getFinals(data);
    const tiesData = finalsData.filter(final => final["Win conditions"].search("penalties") != -1);
    return tiesData.length;
}

console.log("Number of Ties on finals = ",accountTies(fifaData));
