import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EightPuzzleSolver.css'; // Import CSS file for styling

class PuzzleNode {
    constructor(state, parent, move, depth, heuristic) {
        this.state = state;
        this.parent = parent;
        this.move = move;
        this.depth = depth;
        this.heuristic = heuristic;
    }
}

class PuzzleSolver {
    constructor(initialState, goalState) {
        this.initialState = initialState;
        this.goalState = goalState;
        this.openList = [];
        this.closedList = new Set();
    }

    solve() {
        const initialState = this.initialState;
        const initialStateHeuristic = this.calculateHeuristic(initialState);
        const initialNode = new PuzzleNode(initialState, null, null, 0, initialStateHeuristic);
        this.openList.push(initialNode);

        while (this.openList.length > 0) {
            this.openList.sort((a, b) => (a.heuristic + a.depth) - (b.heuristic + b.depth));
            const currentNode = this.openList.shift();
            if (this.isGoalState(currentNode.state)) {
                return this.constructSolution(currentNode);
            }

            this.closedList.add(JSON.stringify(currentNode.state));

            const nextMoves = this.generateNextMoves(currentNode.state);
            for (const move of nextMoves) {
                const newNode = new PuzzleNode(move.state, currentNode, move.move, currentNode.depth + 1, this.calculateHeuristic(move.state));
                const newStateString = JSON.stringify(newNode.state);
                if (!this.closedList.has(newStateString)) {
                    this.openList.push(newNode);
                }
            }
        }
        return null;
    }

    calculateHeuristic(state) {
        let heuristic = 0;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                const value = state[i][j];
                if (value !== 0) {
                    const goalRow = this.findValueInGoalState(value);
                    heuristic += Math.abs(i - goalRow) + Math.abs(j - this.goalState[0].indexOf(value));
                }
            }
        }
        return heuristic;
    }

    findValueInGoalState(value) {
        for (let i = 0; i < this.goalState.length; i++) {
            if (this.goalState[i].includes(value)) {
                return i;
            }
        }
    }

    isGoalState(state) {
        return JSON.stringify(state) === JSON.stringify(this.goalState);
    }

    generateNextMoves(state) {
        const nextMoves = [];
        const emptyPos = this.findEmptyPosition(state);
        const moves = [
            { row: -1, col: 0, move: 'UP' },
            { row: 1, col: 0, move: 'DOWN' },
            { row: 0, col: -1, move: 'LEFT' },
            { row: 0, col: 1, move: 'RIGHT' }
        ];
        for (const move of moves) {
            const newRow = emptyPos.row + move.row;
            const newCol = emptyPos.col + move.col;
            if (newRow >= 0 && newRow < state.length && newCol >= 0 && newCol < state[0].length) {
                const newState = this.cloneState(state);
                newState[emptyPos.row][emptyPos.col] = state[newRow][newCol];
                newState[newRow][newCol] = 0;
                nextMoves.push({ state: newState, move: move.move });
            }
        }
        return nextMoves;
    }

    findEmptyPosition(state) {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
    }

    cloneState(state) {
        return state.map(row => row.slice());
    }

    constructSolution(node) {
        const solution = [];
        let currentNode = node;
        while (currentNode !== null) {
            solution.unshift({ state: currentNode.state, move: currentNode.move });
            currentNode = currentNode.parent;
        }
        return solution;
    }
}

function EightPuzzleSolver() {
    const [initialState, setInitialState] = useState([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
    const [goalState, setGoalState] = useState([[1, 2, 3], [4, 5, 0], [6, 7, 8]]);
    const [solution, setSolution] = useState([]);

    const solvePuzzle = () => {
        const solver = new PuzzleSolver(initialState, goalState);
        const solution = solver.solve();
        setSolution(solution);
    }

    const handleInitialChange = (rowIndex, colIndex, value) => {
        const newInitialState = [...initialState];
        if (newInitialState.flat().includes(parseInt(value)) && parseInt(value) !== 0) {
            toast.error('Number already exists!');
        } else {
            const oldValue = newInitialState[rowIndex][colIndex];
            newInitialState[rowIndex][colIndex] = parseInt(value);
            setInitialState(newInitialState);
            if (parseInt(value) !== oldValue) {
                toast.success('New number inserted!');
            }
        }
    }

    const handleGoalChange = (rowIndex, colIndex, value) => {
        const newGoalState = [...goalState];
        if (newGoalState.flat().includes(parseInt(value)) && parseInt(value) !== 0) {
            toast.error('Number already exists!');
        } else {
            const oldValue = newGoalState[rowIndex][colIndex];
            newGoalState[rowIndex][colIndex] = parseInt(value);
            setGoalState(newGoalState);
            if (parseInt(value) !== oldValue) {
                toast.success('New number inserted!');
            }
        }
    }

    return (
        <div className='main'>
        <div className="centered-container">
            <br/>
            <h1>8 Puzzle Solver</h1>
            <div className="puzzle-container">
                <div className="puzzle">
                    <h2>Initial State</h2>
                    <table className="square-table">
                        <tbody>
                            {initialState.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>
                                            <input style={{height:"41px", paddingLeft:"15px"}} type="number" min="0" max="8" value={cell} onChange={(e) => handleInitialChange(rowIndex, colIndex, e.target.value)} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="puzzle">
                    <h2>Goal State</h2>
                    <table className="square-table">
                        <tbody>
                            {goalState.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>
                                            <input style={{ height: "41px", paddingLeft: "15px" }} type="number" min="0" max="8" value={cell} onChange={(e) => handleGoalChange(rowIndex, colIndex, e.target.value)} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> <br/> <br/>
            <button onClick={solvePuzzle}>Solve Puzzle</button>
            <div id="solution">
                {solution && solution.map((step, index) => (
                    <div key={index} className="solution-table">
                        <h2>Step {index + 1}</h2>
                        <table className="square-table">
                            <tbody>
                                {step.state.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <td key={colIndex}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
        </div>
    );
}

export default EightPuzzleSolver;
