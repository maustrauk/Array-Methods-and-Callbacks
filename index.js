import { fifaData } from './fifa.js';
//console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

function final_2014 (elementOfArray) {
    if (elementOfArray.Year === 2014 && elementOfArray.Stage === "Final") {
        console.log("Home Team Name: ",elementOfArray["Home Team Name"]);//a
        console.log("Away Team Name: ",elementOfArray["Away Team Name"]);//b
        console.log("Home Team Goals: ",elementOfArray["Home Team Goals"]);//c
        console.log("Away Team Goals: ",elementOfArray["Away Team Goals"]);//d
        //e
        if (elementOfArray["Home Team Goals"] > elementOfArray["Away Team Goals"]) {
            console.log("Winner: ",elementOfArray["Home Team Name"]);
        } else {
            console.log("Winner: ", elementOfArray["Away Team Name"]);
        }
    }
}

fifaData.forEach(final_2014);



/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(elementOfArray => elementOfArray.Stage === "Final");
};

console.log("Finals:",getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {
    const userArray = callback(fifaData);
    const years =[];
    for (let i = 0; i < userArray.length; i++) {
        years.push(userArray[i].Year);
    }
    return years;
};

console.log(getYears(getFinals))

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) {
    const userArray = callback(fifaData);
    const resultArray = [];
    for (let i = 0; i < userArray.length; i++) {
        const final = userArray[i];
        if (final["Home Team Goals"] > final["Away Team Goals"]) {
            resultArray.push(final["Home Team Name"]);
        } else {
            resultArray.push(final["Away Team Name"]);
        }
    }
    return resultArray;
};


console.log(getWinners(getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callbackGetWinners, callbackGetYears) {
    const winners = callbackGetWinners;
    const years = callbackGetYears;
    const userStrings = [];
    for (let i = 0; i < winners.length; i++) {
        userStrings.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
    return userStrings;
};

const myString = getWinnersByYear(getWinners(getFinals),getYears(getFinals));
for (let i = 0; i < myString.length; i++) {
    console.log(myString[i]);
}
/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    function homeTeamGoalsCalculator (total, goals) {
        return total + goals["Home Team Goals"];
    }
    function awayTeamGoalsCalculator (total, goals) {
        return total + goals["Away Team Goals"];
    }
    let homeTeamGoals = data.reduce(homeTeamGoalsCalculator,0);
    let awayTeamGoals = data.reduce(awayTeamGoalsCalculator,0);
    homeTeamGoals = homeTeamGoals / data.length;
    awayTeamGoals = awayTeamGoals / data.length;
    return `Home Team Goals AVG: ${homeTeamGoals} Away Team Goals AVG: ${awayTeamGoals}`;
};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const finalData = getFinals(data);
    const homeTeamFinalData = finalData.filter(final => final["Home Team Initials"] === teamInitials);
    const awayTeamFinalData = finalData.filter(final => final["Away Team Initials"] === teamInitials);
    const homeWin = homeTeamFinalData.filter(final => final["Home Team Goals"] > final["Away Team Goals"]);
    const awayWin = awayTeamFinalData.filter(final => final["Home Team Goals"] < final["Away Team Goals"]);
    return homeWin.length + awayWin.length;
};

console.log("Brazil wins = ",getCountryWins(fifaData, "BRA"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function removeDuplicateInArray (myArray) {
    let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
        if (accumulator.indexOf(currentValue) === -1) {
          accumulator.push(currentValue)
        }
        return accumulator
      }, [])
      return myOrderedArray;
}

function getTeamInitials (data) {
    const transformedDataArray = [];
    for (let i =0; i < data.length; i++) {
        const arrayObject = data[i];
        transformedDataArray.push(arrayObject["Home Team Initials"]);
        transformedDataArray.push(arrayObject["Away Team Initials"]);
    }
    return removeDuplicateInArray(transformedDataArray);
}


function getGoals(data) {
    const teamInitialsArray = getTeamInitials(data);
    const teamAVGGoals = [];
    for (let i = 0; i < teamInitialsArray.length; i++) {
        const teamScore = [];
        for (let j = 0; j < data.length; j++) {
            const dataObject = data[j];
            if (dataObject["Home Team Initials"] === teamInitialsArray[i]) {
                teamScore.push(dataObject["Home Team Goals"]);
            }
            if (dataObject["Away Team Initials"] === teamInitialsArray[i]) {
                teamScore.push(dataObject["Away Team Goals"]);
            }
        }
        let avgGoals = teamScore.reduce((accumulator, currentValue) => accumulator + currentValue);
        avgGoals = avgGoals / teamScore.length;
        const teamObject = {"initials" : teamInitialsArray[i], "avgGoals" : avgGoals};
        teamAVGGoals.push(teamObject);
    }
    const maxAVGGoals = Math.max.apply(Math, teamAVGGoals.map(function (o) { return o.avgGoals}));
    for (let i = 0; i < teamAVGGoals.length; i++) {
        if(teamAVGGoals[i].avgGoals === maxAVGGoals) {
            return `Team Initials: "${teamAVGGoals[i].initials}" with AVG Goals per game: ${teamAVGGoals[i].avgGoals}`;
        }
    }
};

console.log(getGoals(fifaData));


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
