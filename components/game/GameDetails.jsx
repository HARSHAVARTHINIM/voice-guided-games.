import styled from "styled-components";
import {
  AiFillClockCircle,
  AiOutlineDesktop,
  AiFillSetting,
  AiFillTags,
} from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { StoreItem } from "../store";

const GameDetails = ({ gameData }) => {
  let platforms = gameData?.platforms?.map(
    (platform) => platform.platform.name
  );
  let developers = gameData?.developers?.map((developer) => developer.name);
  let genres = gameData?.genres?.map((genre) => genre.name);
  let publishers = gameData?.publishers?.map((publisher) => publisher.name);

  return (
    <GameDetailsWrapper>
      <div className="details-title">
        <h3 className="details-title-text">
          {gameData?.name}
        </h3>
      </div>
      <div className="details-grid">
        <div className="details-left">
          <img src={`${gameData?.background_image}`} alt={gameData?.name} />
        </div>

        <div className="details-right">
          <h4 className="details-right-title">
            Game <span className="highlight">Details</span>
          </h4>
          <div
            className="para-text"
            dangerouslySetInnerHTML={{
              __html:
                gameData?.description?.split(".").splice(0, 3).join(".") + ".",
            }}
          ></div>

          <ul className="details-list-group">
            <li className="list-group-item">
              <div className="item-left">
                <span className="item-icon">
                  <AiFillClockCircle size={22} />
                </span>
                <span className="item-title">
                  Release Date:
                </span>
              </div>
              <span className="item-right">
                {gameData?.released}
              </span>
            </li>

            <li className="list-group-item">
              <div className="item-left">
                <span className="item-icon">
                  <AiOutlineDesktop size={22} />
                </span>
                <span className="item-title">
                  Platforms:
                </span>
              </div>
              <span className="item-right">
                {platforms?.join(", ")}
              </span>
            </li>

            <li className="list-group-item">
              <div className="item-left">
                <span className="item-icon">
                  <AiFillSetting size={22} />
                </span>
                <span className="item-title">
                  Developers:
                </span>
              </div>
              <span className="item-right">
                {developers?.join(", ")}
              </span>
            </li>

            <li className="list-group-item">
              <div className="item-left">
                <span className="item-icon">
                  <AiFillTags size={22} />
                </span>
                <span className="item-title">Genres:</span>
              </div>
              <span className="item-right">
                {genres?.join(", ")}
              </span>
            </li>

            <li className="list-group-item">
              <div className="item-left">
                <span className="item-icon">
                  <FaGlobe size={22} />
                </span>
                <span className="item-title">
                  Publishers:
                </span>
              </div>
              <span className="item-right">
                {publishers?.join(", ")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Tabs */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Platforms</Tab>
          <Tab>Stores</Tab>
        </TabList>

        <TabPanel>
          <h3 className="tab-title">Game Description</h3>
          <div
            className="para-text"
            dangerouslySetInnerHTML={{ __html: gameData?.description }}
          ></div>
        </TabPanel>
        <TabPanel>
          <h3 className="tab-title">Game Platforms</h3>
          <div className="platforms-list">
            {gameData?.platforms?.map((item) => {
              return (
                <div
                  className="platform-item"
                  key={item?.platform?.id}
                >
                  <p className="platform-name">{item?.platform?.name}</p>
                  <div className="platform-img-wrapper">
                    <img
                      src={item?.platform?.image_background}
                      className="platform-img"
                      alt={item?.platform?.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <h3 className="tab-title">Available Stores</h3>
          <div className="stores-list">
            {gameData?.stores?.map((item) => (
              <StoreItem key={item?.store?.id} storeItem={item?.store} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </GameDetailsWrapper>
  );
};

export default GameDetails;

GameDetails.propTypes = {
  gameData: PropTypes.object,
};

const GameDetailsWrapper = styled.div`
  background: #282c34;
  border-radius: 10px;
  padding: 30px;
  margin-top: 40px;
  color: #f5f5f5;
  font-family: 'Roboto', sans-serif;

  .details-title {
    margin-bottom: 30px;
    text-align: center;

    .details-title-text {
      font-size: 36px;
      font-weight: 800;
      color: #61dafb;
    }
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    .details-left {
      img {
        border-radius: 12px;
        width: 100%;
        height: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
    }

    .details-right {
      background: #1c2025;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      .details-right-title {
        font-size: 30px;
        color: #61dafb;
        margin-bottom: 20px;
        font-weight: 800;

        .highlight {
          color: #f5f5f5;
        }
      }

      .para-text {
        font-size: 18px;
        line-height: 1.7;
        color: #c0c0c0;
        margin-bottom: 25px;
      }

      .details-list-group {
        list-style: none;
        padding: 0;

        .list-group-item {
          margin: 15px 0;
          padding: 15px;
          background: #2b2d30;
          border-radius: 10px;
          display: flex;
          align-items: center;
          color: #f5f5f5;

          .item-icon {
            margin-right: 20px;
            color: #61dafb;
          }

          .item-title {
            font-weight: 700;
            margin-right: 15px;
          }

          .item-right {
            font-weight: 400;
          }
        }
      }
    }
  }

  .platforms-list, .stores-list {
    display: grid;
    gap: 20px;

    .platform-item, .store-item {
      background: #2b2d30;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      .platform-name, .store-name {
        font-size: 20px;
        color: #f5f5f5;
        margin-bottom: 15px;
        font-weight: 700;
      }

      .platform-img-wrapper {
        img {
          border-radius: 10px;
          width: 100%;
          height: auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .react-tabs {
    margin-top: 40px;

    &__tab {
      color: #f5f5f5;
      font-weight: 700;
      font-size: 18px;
      padding: 15px 25px;
      text-transform: uppercase;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;

      &:hover {
        background: #1c2025;
        color: #ffffff;
      }

      &--selected {
        color: #61dafb;
        border-bottom: 3px solid #61dafb;
      }
    }

    &__tab-panel {
      padding: 25px 0;
      background: #1c2025;
      border-radius: 10px;
    }
  }

  @media screen and (min-width: 1080px) {
    .details-grid {
      grid-template-columns: 1fr 1fr;
    }

    .details-title .details-title-text {
      font-size: 42px;
    }
  }

  @media screen and (min-width: 992px) {
    .platforms-list {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }
`;
