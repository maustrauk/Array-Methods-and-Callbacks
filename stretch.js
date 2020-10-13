import { fifaData } from './fifa.js';
import { removeDuplicateInArray } from './index.js';
import { getFinals } from './index.js';

//Task 1
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

//Task 2
function accountTies (data) {
    const finalsData = getFinals(data);
    const tiesData = finalsData.filter(final => final["Win conditions"].search("penalties") != -1);
    return tiesData.length;
}

console.log("Number of Ties on finals = ",accountTies(fifaData));

//Task 3
function goalCounter (data, teamInitial) {
    const teamGamesHome = data.filter(game => game["Home Team Initials"] === teamInitial);
    const teamGamesAway = data.filter(game => game["Away Team Initials"] === teamInitial);
    const goalsHome = teamGamesHome.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue["Home Team Goals"]
        }, 0)
    const goalsAway = teamGamesAway.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue["Away Team Goals"]
        }, 0)
    return goalsHome + goalsAway;
}

console.log("Total number of Soviet Union goals = ", goalCounter(fifaData, "URS"));

//Task 4
function creatingH1 (h1Text) {

    // create a couple of elements in an otherwise empty HTML page
    const heading = document.createElement("h1");
    const heading_text = document.createTextNode(h1Text);
    heading.appendChild(heading_text);
    document.body.appendChild(heading);
 }

 function teamNames (data) {
     const homeTeamNames = data.map(match => match = match["Home Team Name"]);
     const awayTeamNames = data.map(match => match = match["Away Team Name"]);
     const rawTeamNames = homeTeamNames.concat(awayTeamNames);
     const teamNamesArray = removeDuplicateInArray(rawTeamNames);
     return teamNamesArray;
 }


function h1Creation (data) {
    const userArray = teamNames(data);
    for (let i = 0; i < userArray.length; i++) {
        creatingH1(userArray[i]);
    }
}

h1Creation (fifaData);

