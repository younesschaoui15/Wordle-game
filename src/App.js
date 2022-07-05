import logo from './logo.svg';
import './App.css';
import db from './data/db.json';
import {getRandomSolution} from "./utils/game-manager";
import Wordle from './components/wordle'

function App() {
    const {solutions} = db;
    const {word: solution} = getRandomSolution(solutions);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p className={'bg-white rounded-xl text-slate-400 px-8 text-xl'}>
                    Solution: {solution}
                </p>
                <Wordle solution={solution}/>
            </header>
        </div>
    );
}

export default App;
