import {useState} from "react";

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]); // each guess is an array
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        const solutionArray = [...solution.toUpperCase()];
        const formattedGuess = [...currentGuess].map(letter => ({key: letter, color: 'grey'}));

        formattedGuess.forEach((letter, index) => {
            letter.color = (solutionArray[index] === letter.key) ? 'green' : solutionArray.includes(letter.key) ? 'yellow' : 'grey';
        });

        return formattedGuess;
    };

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        console.log("# currentGuess: ", currentGuess);
        if (currentGuess === solution)
            setIsCorrect(true);

        console.log("# isCorrect: ", isCorrect);
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses
        });
        console.log("# guesses: ", guesses);
        setHistory(prevHistory => [...prevHistory, currentGuess]);
        console.log("# history: ", history);
        setTurn(prevTurn => prevTurn + 1);
        console.log("# turn: ", turn);
        setCurrentGuess('');
    };

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({key}) => {
        //Submit
        if (key === "Enter") {
            if (turn > 5) {
                //Reset current guess
                setCurrentGuess('');
                console.warn("# You used all your guesses!");
                return;
            }
            if (history.includes(currentGuess)) {
                //Reset current guess
                setCurrentGuess('');
                console.warn("# You already tried that word!");
                return;
            }
            if (currentGuess.length !== 5) {
                console.warn("# Word must be 5 chars long");
                return;
            }

            addNewGuess(formatGuess());
        }
        //Delete a letter
        else if (key === "Backspace") {
            setCurrentGuess(prev => prev.slice(0, -1));
        }
        //if it's a letter
        else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key.toUpperCase());
        }
    };

    return {turn, currentGuess, guesses, isCorrect, handleKeyPressed: handleKeyup};
};

export default useWordle;