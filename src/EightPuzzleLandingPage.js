import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Assuming you have the CSS file in the same directory
import EightPuzzleSolver from './EightPuzzleSolver'; // Import your second component

function EightPuzzleLandingPage() {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [gameStarted, setGameStarted] = useState(false); // State to track whether the game has started

    const handleMethodClick = (method) => {
        setSelectedMethod(method);
    };

    const handleStartGame = () => {
        setGameStarted(true); // Set gameStarted to true when the Start Game button is clicked
    };

    return (
        <div className="landing-page">
            <header>
                <div className='head'>
                    <h1>8 Puzzle Solver</h1>
                </div>
            </header>
            <main>
                {!gameStarted ? ( // Render the initial content if the game has not started
                    <section className="description">
                        <p>Welcome to the 8 Puzzle Game! This classic sliding puzzle game challenges you to rearrange the numbered tiles to form the correct order.</p>
                        <p>The 8 puzzle consists of a 3x3 grid with 8 numbered tiles and one empty space. The goal is to arrange the tiles in numerical order, starting from the top left, with the empty space at the bottom right.</p>
                        <p>There are several methods to solve the 8 puzzle:</p>
                        <ul>
                            <li onMouseEnter={() => handleMethodClick("Brute force search")}>Brute force search</li>
                            <li onClick={() => handleMethodClick("A* algorithm")}>A* algorithm</li>
                            <li onClick={() => handleMethodClick("Breadth-first search")}>Breadth-first search</li>
                            <li onClick={() => handleMethodClick("Depth-first search")}>Depth-first search</li>
                        </ul>
                        <p>Are you ready to test your puzzle-solving skills?</p>
                        <section className="cta">
                            <Link to="/solver"><button className="start-button" onClick={handleStartGame}>Start Puzzle</button></Link>
                        </section>
                    </section>
                ) : (
                    null
                )}
            </main>
            <div className='creator'>
                <p>Created by [Satish, Pushpendra & Shreyas]</p>
            </div>
            <footer>
                
            </footer>
        </div>
    );
}

export default EightPuzzleLandingPage;