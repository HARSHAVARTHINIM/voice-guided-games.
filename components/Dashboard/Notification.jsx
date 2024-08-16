// src/components/Dashboard/Notification.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsFillBellFill } from 'react-icons/bs';

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;
  width: 250px;

  &:hover {
    background: #333;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const NotificationIcon = styled.div`
  font-size: 28px;
  color: #ffcc00;
  margin-right: 10px;
`;

const NotificationText = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff0000;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const NotificationList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  background: #111;
  border-radius: 4px;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #444;
  color: #ddd;
`;

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLeaderboardUpdate = () => {
      setNotifications(prevNotifications => [
        ...prevNotifications,
        { id: Date.now(), message: 'Leaderboard has been updated!' }
      ]);
      setCount(prevCount => prevCount + 1);
    };

    window.addEventListener('leaderboardUpdated', handleLeaderboardUpdate);

    return () => {
      window.removeEventListener('leaderboardUpdated', handleLeaderboardUpdate);
    };
  }, []);

  const handleClick = () => {
    navigate('/notifications'); 
  };

  return (
    <NotificationContainer onClick={handleClick}>
      <NotificationHeader>
        <NotificationIcon>
          <BsFillBellFill />
        </NotificationIcon>
        <NotificationText>Notifications</NotificationText>
        {count > 0 && <NotificationBadge>{count}</NotificationBadge>}
      </NotificationHeader>
      <NotificationList>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem key={notification.id}>
              {notification.message}
            </NotificationItem>
          ))
        ) : (
          <NotificationItem>No notifications</NotificationItem>
        )}
      </NotificationList>
    </NotificationContainer>
  );
};

export default Notification;
