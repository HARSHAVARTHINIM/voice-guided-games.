import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../redux/actions"; // Assume you have this action to fetch user data

const ProfileContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileDetail = styled.div`
  font-size: 18px;
  color: #333;
`;

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Assuming you have a user slice in your Redux store

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch the user profile when the component mounts
  }, [dispatch]);

  return (
    <ProfileContainer>
      <ProfileHeader>User Profile</ProfileHeader>
      <ProfileDetails>
        <ProfileDetail><strong>Name:</strong> {user.name}</ProfileDetail>
        <ProfileDetail><strong>Email:</strong> {user.email}</ProfileDetail>
        <ProfileDetail><strong>Username:</strong> {user.username}</ProfileDetail>
      </ProfileDetails>
    </ProfileContainer>
  );
}

export default Profile;
