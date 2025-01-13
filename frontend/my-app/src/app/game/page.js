"use client";

import React, { useState, useEffect } from "react";
import Winner from "@/components/winner";
import "../../styles/Game.css";
import ShotPutScene from "../animation/page";


const Game = ({ player1, player2 }) => {
const [showShotPutScene, setShowShotPutScene] = useState(false);
const [animationDistance, setAnimationDistance] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceValues, setDiceValues] = useState(Array(8).fill(null));
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState({
    player1: [0, 0, 0],
    player2: [0, 0, 0],
  });
  const [rollIndex, setRollIndex] = useState(0);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState(null);

  const rollDiceEffect = () => {
    setRolling(true);
    setTimeout(() => setRolling(false), 500);
  };

  useEffect(() => {
    if (player1 && player2) {
      // Set cookies for player1 and player2 using the props
      document.cookie = `player1=${player1.name}; max-age=86400; path=/`;
      document.cookie = `avatar1=${player1.avatar}; max-age=86400; path=/`;
      document.cookie = `player2=${player2.name}; max-age=86400; path=/`;
      document.cookie = `avatar2=${player2.avatar}; max-age=86400; path=/`;

      console.log("Cookies set successfully!");
    }
  }, [player1, player2]); // Re-run this effect when player1 or player2 change

  const handleRollDice = () => {
    if (rollIndex >= 8 || rolling) return;

    rollDiceEffect();
    const randomValue = Math.floor(Math.random() * 6) + 1; // random number 1 - 6

    const updatedDiceValues = [...diceValues];
    updatedDiceValues[rollIndex] = randomValue;

    setTimeout(() => {
      setDiceValues(updatedDiceValues);
      if (randomValue === 1) {
        setTimeout(() => handleStop(0), 2000);
      } else if (rollIndex === 7) {
        setTimeout(() => handleStop(updatedDiceValues.reduce((sum, val) => sum + val, 0)), 2000);
      } else {
        setRollIndex(rollIndex + 1);
      }
    }, 500);
  };

  //this is new
  const saveToHallOfFame = async (newEntry) => {
  try {
    const response = await fetch("http://localhost:4000/hall-of-fame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Successfully saved:", result);
    } else {
      console.error("Error saving:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  const handleStop = (finalScore = null) => {
  const updatedScores = { ...scores };
  const currentScores = currentPlayer === 1 ? updatedScores.player1 : updatedScores.player2;

  const score =
    finalScore !== null ? finalScore : diceValues.slice(0, rollIndex).reduce((sum, val) => sum + val, 0);

  currentScores[round - 1] = score;

  setScores(updatedScores);

  setAnimationDistance(score);
  setShowShotPutScene(true);

  setDiceValues(Array(8).fill(null));
  setRollIndex(0);

  if (currentPlayer === 2 && round === 3) {
  setAnimationDistance(finalScore);
  setShowShotPutScene(true);


  setTimeout(() => {
    setShowShotPutScene(false);

    setTimeout(() => {
      const player1Total = scores.player1.reduce((sum, val) => sum + val, 0);
      const player2Total = scores.player2.reduce((sum, val) => sum + val, 0);

      const winnerData =
        player1Total > player2Total
          ? { name: player1.name, avatar: player1.avatar, score: player1Total }
          : { name: player2.name, avatar: player2.avatar, score: player2Total };

      //This is new
      const winnerData2 =
        player1Total > player2Total
          ? { username: player1.name, points: player1Total, dateEntry: new Date().toISOString(), avatar: player1.avatar }
          : { username: player2.name, points: player2Total, dateEntry: new Date().toISOString(), avatar: player2.avatar };

      saveToHallOfFame(winnerData2);


      setWinner(winnerData);
      setShowWinner(true);
    }, 1000);
  }, 2000);
  return;
}

  if (round < 3 && currentPlayer === 2) {
    setRound(round + 1);
  }

  setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
};

  if (showWinner && winner) {
    return <Winner winner={winner} />;
  }

  return (
    <div className="game-page">
      <h1 className="title">Players Overview</h1>
      <div className="columns">
        <div className="column">
          <h2>{player1.name}</h2>
          <img src={player1.avatar} alt="Player 1 Avatar" className="avatar" />
          <div className="score-boxes">
            {scores.player1.map((score, index) => (
              <div key={index} className="score-box">{score}</div>
            ))}
          </div>
        </div>

        <div className="column middle-column">
          <h2>Play round {round} of 3</h2>
          <div className="player-names">
            <span className={`player-name ${currentPlayer === 1 ? "active" : ""}`}>{player1.name}</span>
            <span className="vs">vs</span>
            <span className={`player-name ${currentPlayer === 2 ? "active" : ""}`}>{player2.name}</span>
          </div>

          {showShotPutScene && (
             <ShotPutScene
                distance={animationDistance}
                onAnimationEnd={() => setShowShotPutScene(false)}  // close scene and go back to game
             />
          )}

          <div className="dice-grid">
            {diceValues.map((value, index) => (
              <div key={index} className={`dice ${rolling && rollIndex === index ? "rolling" : ""}`}>
                {value || ""}
              </div>
            ))}
          </div>

          <div className="buttons">
            <button onClick={handleRollDice} disabled={rollIndex >= 8 || rolling}>Lets Go</button>
            <button onClick={() => handleStop()}>Stop</button>
          </div>
        </div>

        {/* Spieler 2 Spalte */}
        <div className="column">
          <h2>{player2.name}</h2>
          <img src={player2.avatar} alt="Player 2 Avatar" className="avatar" />
          <div className="score-boxes">
            {scores.player2.map((score, index) => (
              <div key={index} className="score-box">{score}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
