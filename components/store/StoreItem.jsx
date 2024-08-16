import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StoreItem = ({ storeItem }) => {
  return (
    <StoreItemWrapper>
      <div className="card-img">
        <img src={storeItem?.image_background} alt={storeItem?.id} />
      </div>
      <div className="card-text">
        <h5 className="card-title">
          <Link to={`stores/${storeItem.id}`} className="title-link">
            {storeItem?.name}
          </Link>
        </h5>
        <ul className="card-info">
          <li>
            <span className="info-label">Domain: </span>
            <a href={"https://www." + storeItem?.domain} className="info-link">
              {storeItem?.domain}
            </a>
          </li>
          <li>
            <span className="info-label">Games Count: </span>
            <span className="info-value">{storeItem?.games_count}</span>
          </li>
        </ul>
        {storeItem?.games && <p className="games-header">Games:</p>}
        <ul className="card-games">
          {storeItem?.games?.map((item) => (
            <li className="card-game" key={item.id}>
              <Link to={`games/${item.id}`} className="game-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </StoreItemWrapper>
  );
};

export default StoreItem;

StoreItem.propTypes = {
  storeItem: PropTypes.object,
};

const StoreItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .card-img {
    width: 100%;
    height: 180px;
    overflow: hidden;
    border-bottom: 4px solid #ff4081;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  .card-text {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .card-title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin-bottom: 10px;
      transition: color 0.3s ease;

      .title-link {
        color: #ff4081;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #c51162;
        }
      }
    }

    .card-info {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 16px;
      color: #555;

      li {
        margin-bottom: 8px;

        .info-label {
          font-weight: 600;
          color: #00c853;
        }

        .info-link {
          color: #ff4081;
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            color: #c51162;
          }
        }

        .info-value {
          color: #333;
        }
      }
    }

    .games-header {
      font-weight: 700;
      color: #00c853;
      margin-top: 10px;
    }

    .card-games {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .card-game {
        background-color: #ff4081;
        border-radius: 12px;
        padding: 5px 10px;
        color: #fff;
        font-size: 14px;

        .game-link {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;

          &:hover {
            color: #c51162;
          }
        }
      }
    }
  }
`;
