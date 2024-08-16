import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const glowAnimation = keyframes`
  from {
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  }
  to {
    text-shadow: 0 0 20px rgba(0, 255, 255, 1);
  }
`;

const LeaderboardContainer = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: url('https://i.pinimg.com/originals/ae/7c/d0/ae7cd05d9438e3a42f955718affa1c9b.gif') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const LeaderboardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
`;

const LeaderboardTitle = styled.h1`
  font-size: 36px;
  color: #00FFFF; /* Bright cyan color */
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4);
  animation: ${slideUp} 0.5s ease-out, ${glowAnimation} 1.5s infinite alternate;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.2); /* Slightly transparent white */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`;

const LeaderboardHeader = styled.th`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-bottom: 2px solid #1abc9c;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
`;

const LeaderboardRow = styled.tr`
  &:nth-child(even) {
    background-color: #34495e;
  }
  &:nth-child(odd) {
    background-color: #2c3e50;
  }
  transition: background-color 0.3s, transform 0.3s;
  animation: ${slideUp} 0.5s ease-out;

  &:hover {
    background-color: #16a085;
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
  }
`;

const LeaderboardData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #1abc9c;
  text-align: center;
  font-size: 18px;
  color: white;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);

  &:nth-child(1) {
    font-weight: bold;
    color: #00FFFF;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  }
  &:nth-child(4) {
    color: #00FFFF;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/scores/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        setLeaderboard(data);

        // Dispatch a custom event
        const event = new Event('leaderboardUpdated');
        window.dispatchEvent(event);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <LeaderboardContainer>
      <LeaderboardContent>
        <LeaderboardTitle>Leaderboard</LeaderboardTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LeaderboardTable>
          <thead>
            <tr>
              <LeaderboardHeader>Rank</LeaderboardHeader>
              <LeaderboardHeader>User ID</LeaderboardHeader>
              <LeaderboardHeader>Game Name</LeaderboardHeader>
              <LeaderboardHeader>Score</LeaderboardHeader>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((score, index) => (
              <LeaderboardRow key={score.id}>
                <LeaderboardData>{index + 1}</LeaderboardData>
                <LeaderboardData>{score.userId}</LeaderboardData>
                <LeaderboardData>{score.gameName}</LeaderboardData>
                <LeaderboardData>{score.score}</LeaderboardData>
              </LeaderboardRow>
            ))}
          </tbody>
        </LeaderboardTable>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
