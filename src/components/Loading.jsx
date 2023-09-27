import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes animation for the spinner
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the loading spinner container
const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Centers the spinner vertically */
`;

// Styled component for the loading spinner
const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #007bff; /* Change the color as needed */
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loading = ()  =>{
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinner />
    </LoadingSpinnerContainer>
  );
}

export default Loading;
