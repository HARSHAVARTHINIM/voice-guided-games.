import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BsController, BsChatSquareText, BsFillPersonBadgeFill, BsSearch, BsJustify,
  BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill,
  BsGraphUp, BsCollectionPlayFill, BsListCheck, BsFileEarmarkText, BsFillGearFill
} from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import Notification from './Notification';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #282c34;
  color: #ffffff;
`;

const MenuIcon = styled.div`
  cursor: pointer;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const SearchPlaceholder = styled.span`
  margin-left: 10px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
`;

const SidebarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarBrand = styled.div`
  font-size: 24px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  margin: 10px 0;
`;

const SidebarListItemLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const SidebarListItemIcon = styled.div`
  margin-right: 10px;
`;

const MainContainer = styled.main`
  margin-left: 270px;
  padding: 20px;
`;

const MainTitle = styled.div`
  margin-bottom: 20px;
`;

const MainCards = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  width: 200px;
  text-align: center;
`;

const CardInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardIcon = styled.div`
  font-size: 24px;
`;

const Charts = styled.div`
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  margin-bottom: 40px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

function Dashboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/scores/leaderboard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
      })
      .catch(error => setError(error.message));
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  
  const processDataForCharts = (data) => {
    const barChartData = data.map(item => ({
      name: item.gameName,
      highestScore: item.score, 
      revenue: item.score * 0.8 
    }));

    const lineChartData = data.map(item => ({
      name: item.date || 'Unknown', 
      revenue: item.score 
    }));

    return { barChartData, lineChartData };
  };

  const { barChartData, lineChartData } = processDataForCharts(leaderboard);

  return (
    <DashboardContainer>
      <Header>
        <MenuIcon>
          <BsJustify style={{ fontSize: '24px' }} />
        </MenuIcon>
        <HeaderLeft>
          <BsSearch style={{ fontSize: '24px' }} />
          <SearchPlaceholder>Search Games...</SearchPlaceholder>
        </HeaderLeft>
        <HeaderRight>
          <HeaderIcon>
            <BsController style={{ fontSize: '24px' }} />
            <span>Games</span>
          </HeaderIcon>
          <HeaderIcon>
            <BsChatSquareText style={{ fontSize: '24px' }} />
            <span>Messages</span>
          </HeaderIcon>
          <HeaderIcon>
            <BsFillPersonBadgeFill style={{ fontSize: '24px' }} />
            <span>Profile</span>
          </HeaderIcon>
          <Notification /> {}
        </HeaderRight>
      </Header>

      <Sidebar>
        <SidebarTitle>
          <SidebarBrand>
            <BsController style={{ fontSize: '24px' }} /> GAME APP
          </SidebarBrand>
          <span className='icon close_icon'>X</span>
        </SidebarTitle>
        <SidebarList>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/dashboard')}><BsGraphUp style={{ fontSize: '24px' }} /> Dashboard</SidebarListItemLink></SidebarListItem>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/games')}><BsCollectionPlayFill style={{ fontSize: '24px' }} /> Games</SidebarListItemLink></SidebarListItem>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/stores')}><BsListCheck style={{ fontSize: '24px' }} /> Game Categories</SidebarListItemLink></SidebarListItem>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/players')}><BsPeopleFill style={{ fontSize: '24px' }} /> Players</SidebarListItemLink></SidebarListItem>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/reports')}><BsFileEarmarkText style={{ fontSize: '24px' }} /> Reports</SidebarListItemLink></SidebarListItem>
          <SidebarListItem><SidebarListItemLink href="#" onClick={() => handleCardClick('/settings')}><BsFillGearFill style={{ fontSize: '24px' }} /> Settings</SidebarListItemLink></SidebarListItem>
        </SidebarList>
      </Sidebar>

      <MainContainer>
        <MainTitle>
          <h3>DASHBOARD</h3>
        </MainTitle>
        <MainCards>
          <Card onClick={() => handleCardClick('/total-games')}>
            <CardInner>
              <h3>TOTAL GAMES</h3>
              <CardIcon>
                <BsFillArchiveFill />
              </CardIcon>
            </CardInner>
            <h1>{leaderboard.length}</h1>
          </Card>
          <Card onClick={() => handleCardClick('/categories')}>
            <CardInner>
              <h3>GAME CATEGORIES</h3>
              <CardIcon>
                <BsFillGrid3X3GapFill />
              </CardIcon>
            </CardInner>
            <h1>12</h1>
          </Card>
          <Card onClick={() => handleCardClick('/leaderboard')}>
            <CardInner>
              <h3>LEADERBOARD</h3>
              <CardIcon>
                <BsPeopleFill />
              </CardIcon>
            </CardInner>
            <h1>{leaderboard.length}</h1>
          </Card>
          <Card onClick={() => handleCardClick('/notifications')}>
            <CardInner>
              <h3>NOTIFICATIONS</h3>
              <CardIcon>
                <BsFillBellFill />
              </CardIcon>
            </CardInner>
            <h1>42</h1>
          </Card>
        </MainCards>

        <Charts>
          <ChartContainer>
            <h4>Highest Score</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="highestScore" fill="#8884d8" />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <h4>Game Revenue</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Charts>
      </MainContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
