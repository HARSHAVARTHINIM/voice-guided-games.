import React from 'react';
import styled from 'styled-components';
import { FaGamepad } from 'react-icons/fa';
import Typewriter from 'react-typewriter-effect';
import { Link } from 'react-router-dom';
import banner_image from '../../assets/images/banner_image.mp4';

const Banner = () => {
  return (
    <BannerWrapper>
      <video className="banner-video" autoPlay loop muted playsInline>
        <source src={banner_image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='banner-content'>
        <h1 className='banner-title'>
          Top Games to Explore
        </h1>
        <div className='lead-text'>
          <Typewriter
            textStyle={{
              color: '#e0e0e0',
              fontWeight: 400,
              fontSize: '1.6rem',
            }}
            startDelay={1500}
            cursorColor="#e0e0e0"
            multiText={[
              'Welcome to the Ultimate Gaming Hub!',
              'Find a variety of games from thrilling action to engaging puzzles.',
              'Experience unmatched fun and excitement with our exclusive games.',
              'Join us and start your adventure today!'
            ]}
            multiTextDelay={1200}
            typeSpeed={70}
            multiTextLoop
          />
        </div>
        <Link to="/creators">
          <button type="button" className='banner-btn'>
            <FaGamepad className='btn-icon' size={30} />
            <span className='btn-text'>Start Playing</span>
          </button>
        </Link>
      </div>
    </BannerWrapper>
  );
};

export default Banner;

const BannerWrapper = styled.div`
  position: relative;
  min-height: 768px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .banner-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .banner-content {
    z-index: 1;
    text-align: center;
    padding: 0 20px;
    color: #fff;

    .banner-title {
      font-size: 6.5rem;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.7),
        0 0 20px rgba(255, 255, 255, 0.7),
        0 0 30px rgba(255, 255, 255, 0.7);
    }

    .lead-text {
      background: rgba(0, 0, 0, 0.5); /* Darker semi-transparent background */
      backdrop-filter: blur(10px); /* Enhanced blur effect */
      border-radius: 12px; /* Slightly more rounded corners */
      border: 1px solid rgba(255, 255, 255, 0.6); /* More pronounced border */
      padding: 25px; /* Increased padding */
      color: #f5f5f5; /* Lighter text color */
      font-size: 1.5rem;
      margin: 0 auto 20px;
      max-width: 750px;
    }

    .banner-btn {
      min-width: 200px;
      height: 50px;
      padding: 15px 30px;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      border: 2px solid #f76c6c; /* Vibrant coral border */
      background-color: #f76c6c; /* Vibrant coral background */
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      transition: background-color 0.3s, border-color 0.3s, transform 0.3s;

      .btn-icon {
        margin-right: 15px;
      }

      .btn-text {
        font-weight: 600;
      }

      &:hover {
        background-color: #c93d3d; /* Darker coral for hover */
        border: 2px solid #c93d3d;
        transform: scale(1.05);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .banner-title {
      font-size: 2.5rem; /* Smaller font size on mobile */
    }

    .lead-text {
      font-size: 1.2rem; /* Smaller font size on mobile */
      padding: 15px;
      max-width: 90%;
    }

    .banner-btn {
      font-size: 16px; /* Adjusted button font size */
      padding: 12px 25px;
      min-width: 150px;
      height: 45px;
    }
  }
`;
