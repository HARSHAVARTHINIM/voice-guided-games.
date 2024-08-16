import styled from 'styled-components';

const GenreList = () => {
  return (
    <GenreListWrapper>
      {/* Content goes here */}
    </GenreListWrapper>
  )
}

export default GenreList

const GenreListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f2f2f2, #e0e0e0);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;

  & > div:has(.section-btn) {
    margin-top: 60px;
  }

  /* Style for sections within the list */
  .section {
    width: 100%;
    margin-bottom: 30px;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
    }

    .section-btn {
      display: flex;
      justify-content: flex-end;

      button {
        padding: 10px 20px;
        background: #ff4081;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.3s ease;

        &:hover {
          background: #e03e3e;
          transform: scale(1.05);
        }
      }
    }
  }
`;
