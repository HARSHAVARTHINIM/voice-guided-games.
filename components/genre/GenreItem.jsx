import styled from 'styled-components';
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { StarRating } from "../common";

const GenreItem = ({ gameItem }) => {
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${apiURL.gamesURL}/${gameItem.id}?${API_KEY}`);
      setGameData(data);
    }

    fetchData();
  }, [gameItem.id]);

  return (
    <GenreItemWrapper>
      <div className='card-top'>
        <img src={gameData?.background_image} alt={gameData?.name} />
        <StarRating rating={gameData?.rating} />
        <div className='ratings-count'>
          {gameData?.ratings_count} <BsStar className='ms-1' size={14} />
        </div>
      </div>
      <div className='card-bottom'>
        <h4 className='card-title'>
          {gameData?.name}
        </h4>
        <div className='details-group'>
          <div className='details-item'>
            <span className='details-item-name'>Release Date:</span>
            <span className='details-item-value'>{gameData?.released}</span>
          </div>
          <div className='details-item'>
            <span className='details-item-name'>Updated:</span>
            <span className='details-item-value'>{gameData?.updated}</span>
          </div>
        </div>
        <Link to={`/games/${gameData?.id}`} className='card-button'>
          See More
        </Link>
      </div>
    </GenreItemWrapper>
  )
}

export default GenreItem;

GenreItem.propTypes = {
  gameItem: PropTypes.object
}

const GenreItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(145deg, #1e1e2f, #2b2d42);
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
  }

  .card-top {
    position: relative;
    height: 250px;
    overflow: hidden;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
    border-bottom: 4px solid #f84c4c;

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
      background: rgba(0, 0, 0, 0.8);
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #ffd700;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

      .ms-1 {
        margin-left: 5px;
      }
    }
  }

  .card-bottom {
    padding: 20px;
    background: linear-gradient(145deg, #2c2f3c, #3a3f5c);

    .card-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .details-group {
      margin-bottom: 20px;
      font-size: 15px;

      .details-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .details-item-name {
          font-weight: 600;
          color: #d0d0d0;
        }

        .details-item-value {
          color: #ffffff;
        }
      }
    }

    .card-button {
      display: inline-block;
      padding: 14px 22px;
      background: linear-gradient(145deg, #ff4081, #00c853);
      color: #ffffff;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
      font-size: 18px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      &:hover {
        background: linear-gradient(145deg, #00c853, #ff4081);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;
