//TODO: verify the code is working and that the deck can be imported/manipulated in scenes
class Deck {
    constructor() {
        this.head = null; // Added head property
        this.tail = null;
        this.length = 0;
    }

    addLetter(letterObj) {
        const node = {
            letter: letterObj,
            next: null
        };
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    removeLetter() {
        if (this.head === null) {
            return null;
        }
        const letter = this.head.letter;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.length--;
        return letter;
    }

    initDeck(){

        const letters = [
            { letter: 'A', value: 1 },
            { letter: 'B', value: 3 },
            { letter: 'C', value: 3 },
            { letter: 'D', value: 2 },
            { letter: 'E', value: 1 },
            { letter: 'F', value: 4 },
            { letter: 'G', value: 2 },
            { letter: 'H', value: 4 },
            { letter: 'I', value: 1 },
            { letter: 'J', value: 8 },
            { letter: 'K', value: 5 },
            { letter: 'L', value: 1 },
            { letter: 'M', value: 3 },
            { letter: 'N', value: 1 },
            { letter: 'O', value: 1 },
            { letter: 'P', value: 3 },
            { letter: 'Q', value: 10 },
            { letter: 'R', value: 1 },
            { letter: 'S', value: 1 },
            { letter: 'T', value: 1 },
            { letter: 'U', value: 1 },
            { letter: 'V', value: 4 },
            { letter: 'W', value: 4 },
            { letter: 'X', value: 8 },
            { letter: 'Y', value: 4 },
            { letter: 'Z', value: 10 }
        ];
    
        const initiDeckSize = 10;
        for (let i = 0; i < initiDeckSize; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetterObj = letters[randomIndex]; // Generating random letter object
            this.addLetter(randomLetterObj); // Adding letter object to the deck
        }
    }
}

export default Deck;