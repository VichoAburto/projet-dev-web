"use client";

import React, { useState } from "react";
import "../styles/HomePage.css";
import Game from "./game/page";

const HomePage = () => {
  const [player1, setPlayer1] = useState({ name: "", avatar: null });
  const [player2, setPlayer2] = useState({ name: "", avatar: null });
  const [showGame, setShowGame] = useState(false);

  const avatars = ["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png", "/avatar5.png", "/avatar6.png"];

  const handleAvatarClick = (player, index) => {
    if (player === 1) {
      setPlayer1((prev) => ({ ...prev, avatar: avatars[index] }));
    } else if (player === 2) {
      setPlayer2((prev) => ({ ...prev, avatar: avatars[index] }));
    }
  };

  const handleButtonClick = () => {
    if (player1.name && player1.avatar && player2.name && player2.avatar) {
      setShowGame(true);
    } else {
      alert("Both players must enter their names and select an avatar.");
    }
  };

  if (showGame) {
    return <Game player1={player1} player2={player2} />;
  }

  return (
    <div className="home-page">
      <h1 className="title">Welcome to the Avatar Selection</h1>
      <p className="intro-text">Please choose an avatar and enter your name below for each player.</p>

      <div className="columns">
        {/* Player 1 */}
        <div className="column">
          <h2>Player 1</h2>
          <input
            type="text"
            placeholder="Enter Player 1 Name"
            value={player1.name}
            onChange={(e) => setPlayer1((prev) => ({ ...prev, name: e.target.value }))}
            className="name-input"
          />
          <div className="avatar-grid">
            {avatars.map((avatar, index) => (
              <img
                key={`player1-avatar-${index}`}
                src={avatar}
                alt={`Player 1 Avatar ${index + 1}`}
                className={`avatar ${player1.avatar === avatar ? "selected" : ""}`}
                onClick={() => handleAvatarClick(1, index)}
              />
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="column">
          <h2>Player 2</h2>
          <input
            type="text"
            placeholder="Enter Player 2 Name"
            value={player2.name}
            onChange={(e) => setPlayer2((prev) => ({ ...prev, name: e.target.value }))}
            className="name-input"
          />
          <div className="avatar-grid">
            {avatars.map((avatar, index) => (
              <img
                key={`player2-avatar-${index}`}
                src={avatar}
                alt={`Player 2 Avatar ${index + 1}`}
                className={`avatar ${player2.avatar === avatar ? "selected" : ""}`}
                onClick={() => handleAvatarClick(2, index)}
              />
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleButtonClick} className="button">
        Lets Go
      </button>
    </div>
  );
};

export default HomePage;
