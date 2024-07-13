// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble!\n\n Enter a word:");
   return word
   //console.log(oldScrabbleScorer(word));
};

let newPointStructure = transform(oldPointStructure);
//console.log(newPointStructure);

function simpleScorer(word) {
   word = word.toUpperCase();
   return word.length;
};

function vowelBonusScorer(word){
   word = word.toLowerCase();

   let letterPoints = 0;

   for (let i =0; i < word.length; i++){
      if ('aeiou'.includes(word[i])){
         letterPoints += 3;
      }else {
         letterPoints +=1;
      }
   }
   return letterPoints;
};

function scrabbleScorer(word){
   word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
      letter = word[i];
      letterPoints += parseInt(newPointStructure[letter]);
 
	  //for (const pointValue in newPointStructure) {
 
		 //if (newPointStructure[pointValue].includes(word[i])) {
			//letterPoints += parseInt(pointValue);
		 //}
	  //}
	}
	return letterPoints;
 };

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log ("Which scoring algorithm would you like to use? \n")
   console.log("Enter 0 to select the simple scorer. \n Enter 1 to select the vowelBonusScorer \n Enter 2 to select the ScrabbleScorer")
   let userAlgorithmChoice = input.question('Make your selection here: ')
   return scoringAlgorithms[userAlgorithmChoice];
   }
   

function transform() {
   let lowCaseLetters = {};
   for (pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      for (let i = 0; i < letters.length; i++){
         letter = letters[i].toLowerCase();
         lowCaseLetters[letter] = parseInt(pointValue);
      }
   }
   return lowCaseLetters
   };

function runProgram() {
   let word = initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   let score = selectedAlgorithm.scorerFunction(word);
   console.log(`Score for '${word}': ${score} `);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
