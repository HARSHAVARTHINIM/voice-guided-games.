import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsFillGearFill, BsSave, BsMoon, BsSun } from 'react-icons/bs';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition: background 0.3s, color 0.3s;
  font-family: 'Arial', sans-serif;
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  border-bottom: 4px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.headerBackground};
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const HeaderIcon = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.icon};
  margin-right: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.color};
  font-family: 'Press Start 2P', cursive; 
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background: ${({ theme }) => theme.formBackground};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  font-family: 'Press Start 2P', cursive; 
`;

const Input = styled.input`
  padding: 14px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  font-size: 18px;
  outline: none;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.color};
  transition: border-color 0.3s, background-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    background-color: ${({ theme }) => theme.inputFocusBackground};
  }
`;

const SaveButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  padding: 14px 25px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: scale(1.05);
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ToggleLabel = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Press Start 2P', cursive; 
`;

const ToggleSwitch = styled.input`
  cursor: pointer;
  accent-color: ${({ theme }) => theme.accent};
  transform: scale(1.2);
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SliderLabel = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.color};
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.sliderBackground};
  border-radius: 12px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 26px;
    height: 26px;
    background: ${({ theme }) => theme.sliderThumb};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 26px;
    height: 26px;
    background: ${({ theme }) => theme.sliderThumb};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const AvatarPreview = styled.img`
  max-width: 120px;
  max-height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const lightTheme = {
  background: '#f4f4f9',
  color: '#333',
  border: '#e0e0e0',
  icon: '#333',
  headerBackground: '#ffffff',
  formBackground: '#ffffff',
  inputBackground: '#ffffff',
  inputFocusBackground: '#f0f0f0',
  sliderBackground: '#e0e0e0',
  sliderThumb: '#007bff',
  accent: '#007bff',
  accentHover: '#0056b3',
};

const darkTheme = {
  background: '#1e1e1e',
  color: '#ffffff',
  border: '#444',
  icon: '#ffffff',
  headerBackground: '#333',
  formBackground: '#333',
  inputBackground: '#444',
  inputFocusBackground: '#555',
  sliderBackground: '#444',
  sliderThumb: '#007bff',
  accent: '#007bff',
  accentHover: '#0056b3',
};

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    password: '',
    theme: 'light',
    musicVolume: 50,
    sfxVolume: 50,
    difficulty: 'medium',
    showNotifications: true,
    emailNotifications: true,
    avatar: null,
  });

  const [theme, setTheme] = useState(lightTheme);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  const handleSliderChange = (name) => (e) => {
    setSettings(prevSettings => ({ ...prevSettings, [name]: e.target.value }));
  };

  const handleThemeChange = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setSettings(prev => ({ ...prev, theme: 'dark' }));
    } else {
      setTheme(lightTheme);
      setSettings(prev => ({ ...prev, theme: 'light' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
      setSettings(prevSettings => ({ ...prevSettings, avatar: file }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(settings)) {
      formData.append(key, value);
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/users/update', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to save settings');
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  return (
    <SettingsContainer theme={theme}>
      <SettingsHeader theme={theme}>
        <HeaderIcon theme={theme}>
          <BsFillGearFill />
        </HeaderIcon>
        <HeaderTitle theme={theme}>Settings</HeaderTitle>
      </SettingsHeader>

      <SettingsForm onSubmit={handleSave}>
        {previewAvatar && <AvatarPreview src={previewAvatar} alt="Avatar Preview" />}
        <FormGroup>
          <Label htmlFor="avatar" theme={theme}>Avatar</Label>
          <Input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username" theme={theme}>Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={settings.username}
            onChange={handleChange}
            placeholder="Enter your username"
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email" theme={theme}>Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Enter your email"
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" theme={theme}>Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            placeholder="Enter your password"
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <ToggleContainer>
            <ToggleLabel theme={theme}>
              {settings.theme === 'light' ? <BsMoon /> : <BsSun />}
              Dark Mode
              <ToggleSwitch
                type="checkbox"
                checked={settings.theme === 'dark'}
                onChange={handleThemeChange}
              />
            </ToggleLabel>
          </ToggleContainer>
        </FormGroup>

        <FormGroup>
          <SliderContainer>
            <SliderLabel theme={theme}>Music Volume: {settings.musicVolume}</SliderLabel>
            <RangeInput
              type="range"
              min="0"
              max="100"
              value={settings.musicVolume}
              onChange={handleSliderChange('musicVolume')}
              theme={theme}
            />
          </SliderContainer>

          <SliderContainer>
            <SliderLabel theme={theme}>SFX Volume: {settings.sfxVolume}</SliderLabel>
            <RangeInput
              type="range"
              min="0"
              max="100"
              value={settings.sfxVolume}
              onChange={handleSliderChange('sfxVolume')}
              theme={theme}
            />
          </SliderContainer>
        </FormGroup>

        <FormGroup>
          <ToggleContainer>
            <ToggleLabel theme={theme}>
              <IoVolumeHigh /> Show Notifications
              <ToggleSwitch
                type="checkbox"
                checked={settings.showNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, showNotifications: e.target.checked }))}
                theme={theme}
              />
            </ToggleLabel>

            <ToggleLabel theme={theme}>
              <IoVolumeMute /> Email Notifications
              <ToggleSwitch
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                theme={theme}
              />
            </ToggleLabel>
          </ToggleContainer>
        </FormGroup>

        <SaveButton type="submit" theme={theme}>
          <BsSave /> Save Settings
        </SaveButton>
      </SettingsForm>
    </SettingsContainer>
  );
};

export default Settings;
