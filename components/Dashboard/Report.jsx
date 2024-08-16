import React, { useState } from 'react';
import styled from 'styled-components';


const ReportContainer = styled.div`
  padding: 20px;
  background: url('https://i.pinimg.com/originals/62/39/4d/62394d753859943e6a1a36443ef78795.gif') center center/cover no-repeat;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-attachment: fixed;

  @keyframes gradientBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const ReportHeader = styled.h1`
  font-size: 48px;
  color: #f9f9f9;
  margin-bottom: 50px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7);
  animation: fadeInDown 1s ease-in-out;

  @keyframes fadeInDown {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 22px;
  color: #ddd;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Input = styled.input`
  padding: 20px;
  border: 2px solid #4b4b4b;
  border-radius: 15px;
  font-size: 20px;
  outline: none;
  background: #111;
  color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #fdbb2d;
    box-shadow: 0 0 12px #fdbb2d;
  }
`;

const Textarea = styled.textarea`
  padding: 20px;
  border: 2px solid #4b4b4b;
  border-radius: 15px;
  font-size: 20px;
  outline: none;
  background: #111;
  color: #fff;
  resize: vertical;
  min-height: 200px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #fdbb2d;
    box-shadow: 0 0 12px #fdbb2d;
  }
`;

const Dropdown = styled.select`
  padding: 20px;
  border: 2px solid #4b4b4b;
  border-radius: 15px;
  font-size: 20px;
  background: #111;
  color: #fff;
  appearance: none;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #fdbb2d;
    box-shadow: 0 0 12px #fdbb2d;
  }

  option {
    background: #111;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff512f, #dd2476);
  color: #fff;
  border: none;
  padding: 18px 35px;
  border-radius: 15px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #dd2476, #ff512f);
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 900px; /* Increased the max-width */
  background: rgba(0, 0, 0, 0.85);
  padding: 60px; /* Increased padding */
  border-radius: 25px; /* Increased border radius */
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.7); 
  animation: fadeInUp 1s ease-in-out;

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gameCategory: '',
    gamePurchase: '',
    gameRecommendation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, gameCategory, gamePurchase, gameRecommendation } = formData;

    // Open Google Mail with the composed email
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=maharshavarthini@gmail.com&su=Game Purchase or Recommendation&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AGame Category: ${encodeURIComponent(gameCategory)}%0AGame Purchase: ${encodeURIComponent(gamePurchase)}%0AGame Recommendation: ${encodeURIComponent(gameRecommendation)}`;
  
    window.open(gmailLink, '_blank');
  };

  return (
    <ReportContainer>
      <FormWrapper>
        <ReportHeader>Submit Your Purchase or Recommendation</ReportHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gameCategory">Game Category</Label>
            <Dropdown
              id="gameCategory"
              name="gameCategory"
              value={formData.gameCategory}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
              <option value="Puzzle">Puzzle</option>
              <option value="RPG">RPG</option>
            </Dropdown>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gamePurchase">Game Purchase</Label>
            <Input
              type="text"
              id="gamePurchase"
              name="gamePurchase"
              value={formData.gamePurchase}
              onChange={handleChange}
              placeholder="Which game would you like to purchase?"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gameRecommendation">Game Recommendation</Label>
            <Textarea
              id="gameRecommendation"
              name="gameRecommendation"
              value={formData.gameRecommendation}
              onChange={handleChange}
              placeholder="Any recommendations for new games?"
            />
          </FormGroup>

          <SubmitButton type="submit">Send</SubmitButton>
        </form>
      </FormWrapper>
    </ReportContainer>
  );
};

export default Report;
