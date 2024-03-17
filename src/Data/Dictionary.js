
var dict = {};
const fs = require("fs")

const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');
 
 
// Upload text
let arr = readFileLines('/src/assets/assets/words.txt');

//Create dict with true and falses for easy searching
for ( var i = 0; i < arr.length; i++ ) {
    dict[arr[i]] = true;}

function findWord( letters ) {

    var curLetters = letters.slice( 0 ), word = "";
     
    // Make sure the word is at least 3 letters long
    while ( curLetters.length > 2 ) {
        // Get a word out of the existing letters
        word = curLetters.join("");
     
        // And see if it's in the dictionary
        if ( dict[ word ] ) {
            // If it is, return that word
           // console.log(word);
            return true;
        }
        else{
            return false;
        }
    }
}