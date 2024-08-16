import styled from 'styled-components';
import GameItem from './GameItem';
import PropTypes from "prop-types";

const GameList = ({ games, sliceValue = games.length }) => {
  return (
    <GameListWrapper>
      <div className='card-list'>
        {
          games?.slice(0, sliceValue).map(item => (
            <GameItem key={item.id} gameItem={item} />
          ))
        }
      </div>
    </GameListWrapper>
  )
}

export default GameList;

GameList.propTypes = {
  games: PropTypes.array,
  sliceValue: PropTypes.number
}

const GameListWrapper = styled.div`
  padding: 20px;
  background: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e0e0e0;

  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;
