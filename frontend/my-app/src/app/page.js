"use client";

import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import Game from "./game/page";

const HomePage = () => {
  const [player1, setPlayer1] = useState({ name: "", avatar: null });
  const [player2, setPlayer2] = useState({ name: "", avatar: null });
  const [showGame, setShowGame] = useState(false);

  const avatars = ["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png", "/avatar5.png", "/avatar6.png"];

  useEffect(() => {
    // Function to get cookie value by name
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Set player state from cookies if they exist
    const cookiePlayer1 = getCookieValue("player1");
    const cookieAvatar1 = getCookieValue("avatar1");
    const cookiePlayer2 = getCookieValue("player2");
    const cookieAvatar2 = getCookieValue("avatar2");

    if (cookiePlayer1 && cookieAvatar1) {
      setPlayer1({ name: cookiePlayer1, avatar: cookieAvatar1 });
    }
    if (cookiePlayer2 && cookieAvatar2) {
      setPlayer2({ name: cookiePlayer2, avatar: cookieAvatar2 });
    }
  }, []);

  const handleAvatarClick = (player, index) => {
    const avatar = avatars[index];
    if (player === 1) {
      setPlayer1((prev) => ({ ...prev, avatar }));
    } else if (player === 2) {
      setPlayer2((prev) => ({ ...prev, avatar }));
    }
  };

  const handleButtonClick = () => {
    if (player1.name && player1.avatar && player2.name && player2.avatar) {
      // Prepare data to set cookies
      document.cookie = `player1=${player1.name}; max-age=86400; path=/`;
      document.cookie = `avatar1=${player1.avatar}; max-age=86400; path=/`;
      document.cookie = `player2=${player2.name}; max-age=86400; path=/`;
      document.cookie = `avatar2=${player2.avatar}; max-age=86400; path=/`;

      // Proceed to show the game
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
      <h1 className="title">Bienvenue à Avatar Selection</h1>
      <p className="intro-text">Veuillez choisir un avatar et entrer votre nom ci-dessous pour chaque joueur.</p>

      <div className="columns">
        {/* Player 1 */}
        <div className="column">
          <h2>Joueur 1</h2>
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
          <h2>Joueur 2</h2>
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
        On y va
      </button>
    </div>
  );
};

export default HomePage;
