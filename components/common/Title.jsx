import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = ({ titleName }) => {
  return (
    <TitleWrapper>
      <h3>{titleName.firstText} <span>{titleName.secondText}</span></h3>
      <div className='line'></div>
    </TitleWrapper>
  )
}

export default Title;

Title.propTypes = {
  titleName: PropTypes.shape({
    firstText: PropTypes.string.isRequired,
    secondText: PropTypes.string.isRequired
  }).isRequired,
}

const TitleWrapper = styled.div`
  padding: 30px 0;
  text-align: center;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.1em;
  color: #fff;
  margin-bottom: 60px;
  font-family: 'Poppins', sans-serif;

  h3 {
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    background: linear-gradient(45deg, #ff4081, #00c853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;

    span {
      font-weight: 900;
      background: linear-gradient(45deg, #ff4081, #00c853);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3.2rem; /* Slightly larger for emphasis */
    }
  }

  .line {
    margin-top: 20px;
    height: 6px;
    width: 220px;
    margin-right: auto;
    margin-left: auto;
    background-color: #00c853; /* Updated line color */
    border-radius: 50px; /* Rounded edges for a sleek look */
    position: relative;

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 0;
      width: 0;
      border-style: solid;
      border-color: transparent transparent transparent #00c853; /* Updated border color */
    }

    &::after {
      left: -18px;
      border-width: 6px 18px 6px 0;
    }

    &::before {
      right: -18px;
      border-width: 6px 0 6px 18px;
    }
  }
`;
