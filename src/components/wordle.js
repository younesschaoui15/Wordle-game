import React, {useEffect} from "react";
import useWordle from "../hooks/useWordle";

const Wordle = ({solution}) => {
    const _EVENT = 'keyup';
    const {currentGuess, handleKeyPressed} = useWordle(solution);

    useEffect(() => {
        window.addEventListener(_EVENT, handleKeyPressed);
        return () => window.removeEventListener(_EVENT, handleKeyPressed);
    }, [handleKeyPressed]);

    return (
        <div></div>
    );
};

export default Wordle;