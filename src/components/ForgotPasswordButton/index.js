import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import compose from '@shopify/react-compose';
import styled from 'styled-components';
import { withNoStack, FORGOT_PASSWORD, RESET_PASSWORD } from '@nostack/no-stack';

import SendCodeForm from './SendCodeForm';
import ResetPasswordForm from './ResetPasswordForm';

const Button = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const ForgotPasswordButton = ({ getPasswordResetCode, resetPassword, platformId }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [userNameOrEmail, setUsernameOrEmail] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const showForm = () => setFormVisible(true);

  const hideForm = () => {
    setError('');
    setSubmitting(false);
    setPasswordReset(false);
    setFormVisible(false);
    setUsernameOrEmail('');
  };

  const handleEmailSubmit = async userNameOrEmail => {
    setError('');
    setSubmitting(true);
    
    try {
      await getPasswordResetCode({
        variables: {
          userNameOrEmail,
          stackId: platformId,
        },
      });

      setUsernameOrEmail(userNameOrEmail);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  const handlePasswordSubmit = async (password, code) => {
    setError('');
    setSubmitting(true);

    try {
      await resetPassword({
        variables: {
          userNameOrEmail, 
          password,
          code,
          stackId: platformId,
        },
      });

      setPasswordReset(true);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  if (!formVisible) {
    return (
      <Button type="button" onClick={showForm}>
        Forgot Password?
      </Button>
    );
  }

  if (!userNameOrEmail) {
    return (
      <SendCodeForm 
        onSubmit={handleEmailSubmit}
        onCancel={hideForm} 
        disabled={submitting}
        error={error}
      /> 
    );
  }

  if (userNameOrEmail && !passwordReset) {
    return (
      <ResetPasswordForm
        onSubmit={handlePasswordSubmit}
        onCancel={hideForm} 
        disabled={submitting}
        error={error}
      />
    );
  }

  return (
    <p>
      Your password has been reset. You may now login.
      <Button type="button" onClick={hideForm}>Ok.</Button>
    </p>
  );
};

export default compose(
  graphql(FORGOT_PASSWORD, { name: 'getPasswordResetCode' }),
  graphql(RESET_PASSWORD, { name: 'resetPassword' }),
  withNoStack,
)(ForgotPasswordButton);
