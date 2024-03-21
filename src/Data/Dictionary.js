const fs = require('fs');

// Read the dictionary file
const dictionary = fs.readFileSync('dictionary.txt', 'utf-8');

// Split the contents into an array of words
const wordArray = dictionary.split('\n');

// Create a Set to store the words for fast lookup
const wordSet = new Set(wordArray);

// Function to check if a word is in the dictionary
function isInDictionary(word) {
    return wordSet.has(word.toLowerCase());
}

// Example usage
const wordToCheck = 'apple';
if (isInDictionary(wordToCheck)) {
    console.log(`${wordToCheck} is in the dictionary.`);
} else {
    console.log(`${wordToCheck} is not in the dictionary.`);
}
