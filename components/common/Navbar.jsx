import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { BsRssFill, BsSteam, BsTwitch, BsYoutube } from "react-icons/bs";
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarStatus, setSidebarOff, setSidebarOn } from '../../redux/store/sidebarSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(selectSidebarStatus);

  return (
    <NavbarWrapper>
      <div className='navbar-content'>
        <Link to="/" className="navbar-brand">
          <span className="brand-primary">NEBULA</span>
          <span className="brand-secondary">games</span>
        </Link>
        <button type='button' className='navbar-show-btn' onClick={() => dispatch(setSidebarOn())}>
          <HiOutlineMenuAlt3 size={28} />
        </button>

        <div className={`navbar-collapse ${sidebarStatus ? "show" : ""}`}>
          <button type="button" className='navbar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
            <MdClose size={28} />
          </button>

          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to="/home" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/creators" className='nav-link'>Our Games</Link>
            </li>
            <li className='nav-item'>
              <Link to="/stores" className='nav-link'>Stores</Link>
            </li>
            <li className='nav-item'>
              <Link to="/games" className='nav-link'>Games</Link>
            </li>
            <li className='nav-item'>
              <Link to="/dashboard" className='nav-link'>Dashboard</Link>
            </li>
          </ul>

          <ul className='connect-list'>
            <li className='connect-text'>Connect</li>
            <li className='connect-item'>
              <Link to="/" className='connect-link'>
                <BsRssFill size={22} />
              </Link>
            </li>
            <li className='connect-item'>
              <Link to="/" className='connect-link'>
                <BsSteam size={22} />
              </Link>
            </li>
            <li className='connect-item'>
              <Link to="/" className='connect-link'>
                <BsTwitch size={22} />
              </Link>
            </li>
            <li className='connect-item'>
              <Link to="/" className='connect-link'>
                <BsYoutube size={22} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  min-height: 70px;
  background: #222; /* Dark gray background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);

  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 100%;
  }

  .navbar-brand {
    font-size: 28px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #f0f0f0;
    position: relative;

    .brand-primary {
      color: #66fcf1; /* Bright cyan */
      margin-right: 5px;
      text-shadow: 0 0 10px #66fcf1, 0 0 20px #66fcf1, 0 0 30px #66fcf1;
    }

    .brand-secondary {
      color: #ff4081; /* Pink */
      text-shadow: 0 0 10px #ff4081, 0 0 20px #ff4081, 0 0 30px #ff4081;
    }
  }

  .navbar-show-btn {
    background: transparent;
    border: none;
    color: #f0f0f0;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
    
    &:hover {
      color: #ff4081; /* Pink */
      transform: scale(1.1);
    }
  }

  .navbar-collapse {
    position: fixed;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    background-color: #333; /* Slightly lighter gray */
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px 0px;
    padding: 50px 20px;
    text-align: center;
    transform: translateX(100%);
    transition: transform 0.5s ease, opacity 0.5s ease;
    z-index: 999;
    opacity: 0;
    visibility: hidden;

    &.show {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
      animation: slideIn 0.5s ease-out;
    }
  }

  .navbar-hide-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: #f0f0f0;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #ff4081; /* Pink */
      transform: rotate(180deg);
    }
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;

    .nav-item {
      padding: 10px 0;
      animation: fadeIn 0.5s ease-in-out;
    }

    .nav-link {
      text-transform: uppercase;
      font-weight: 500;
      color: #f0f0f0;
      transition: color 0.3s ease, transform 0.3s ease;

      &:hover {
        color: #66fcf1; /* Bright cyan */
        transform: scale(1.1);
      }
    }
  }

  .connect-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .connect-text {
      color: #f0f0f0;
      text-transform: uppercase;
      font-weight: 700;
      margin-right: 20px;
      animation: fadeIn 0.5s ease-in-out;
    }

    .connect-item {
      margin: 0 10px;
      animation: fadeIn 0.5s ease-in-out;
    }

    .connect-link {
      color: #f0f0f0;
      transition: color 0.3s ease, transform 0.3s ease;

      &:hover {
        color: #ff4081; /* Pink */
        transform: scale(1.3);
      }
    }
  }

  @media screen and (min-width: 992px) {
    .navbar-show-btn {
      display: none;
    }

    .navbar-collapse {
      transform: translateX(0);
      position: relative;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: auto;
      background-color: transparent;
      box-shadow: none;
      opacity: 1;
      visibility: visible;
    }

    .navbar-nav {
      display: flex;
      align-items: center;
    }

    .nav-item {
      margin-left: 20px;
    }

    .navbar-hide-btn {
      display: none;
    }

    .connect-list {
      margin-top: 0;
      margin-left: 20px;
    }
  }

  @media screen and (min-width: 1200px) {
    .navbar-brand {
      font-size: 32px;
    }

    .connect-list {
      margin-left: 40px;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
