import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsStar } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { StarRating } from '../common';

const GameItem = ({ gameItem }) => {
  return (
    <GameItemWrapper>
      <div className='card-top'>
        <img src={gameItem?.background_image} alt={gameItem?.name} />
        <StarRating rating={gameItem?.rating} />
        <div className='ratings-count'>
          {gameItem?.ratings_count} <BsStar className='ms-1' size={16} />
        </div>
      </div>
      <div className='card-bottom'>
        <h4 className='card-title'>
          {gameItem?.name}
        </h4>
        <div className='details-group'>
          <div className='details-item'>
            <span className='details-item-name'>Release Date:</span>
            <span className='details-item-value'>{gameItem?.released}</span>
          </div>
          <div className='details-item'>
            <span className='details-item-name'>Updated:</span>
            <span className='details-item-value'>{gameItem?.updated}</span>
          </div>
        </div>
        <Link to={`/games/${gameItem?.id}`} className='card-button'>
          See More
        </Link>
      </div>
    </GameItemWrapper>
  );
};

export default GameItem;

GameItem.propTypes = {
  gameItem: PropTypes.object,
};

const GameItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #212121; /* Updated background color */
  color: #e0e0e0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    background-color: #292929;
  }

  .card-top {
    position: relative;
    height: 250px;
    overflow: hidden;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));
    border-bottom: 4px solid #ff5722;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }

    .ratings-count {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background: rgba(0, 0, 0, 0.6);
      padding: 8px 14px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      color: #f1f1f1;

      .ms-1 {
        margin-left: 6px;
      }
    }
  }

  .card-bottom {
    padding: 20px 16px;
    background-color: #2b2b2b;

    .card-title {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 15px;
      color: #f1f1f1;
      text-transform: uppercase;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .details-group {
      margin-bottom: 20px;

      .details-item {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        margin-bottom: 10px;
        color: #b0b0b0;

        .details-item-name {
          font-weight: 600;
        }
      }
    }

    .card-button {
      display: block;
      width: 100%;
      text-align: center;
      background: linear-gradient(135deg, #ff4081, #00c853); /* Updated button color */
      color: #ffffff;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 16px;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #00c853, #ff4081); /* Reversed gradient on hover */
        color: #ffffff;
      }
    }
  }
`;
