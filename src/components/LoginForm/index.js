import React, { useState } from 'react';
import styled from 'styled-components';
import { withNoStack } from '@nostack/no-stack';
import ForgotPasswordButton from '../ForgotPasswordButton';
import StyledForm from '../../styles';

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading || currentUser) {
    return null;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username,
        password
      });
    } catch (error) {
      setError(
        error.message ||
          (error.graphQLErrors &&
            error.graphQLErrors.length &&
            error.graphQLErrors[0]) ||
          error
      );
      setIsSubmitting(false);
    }
  };

  return (
    <StyledForm className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <input
          id="nostack-username"
          type="text"
          name="username"
          placeholder="Username"
          disabled={isSubmitting}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          id="nostack-password"
          type="password"
          name="password"
          placeholder="Password"
          disabled={isSubmitting}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting || !username || !password}>
          Log In
        </button>
        <ForgotPasswordButton />
      </div>
      {error && <div>{error}</div>}
    </StyledForm>
  );
};

export default withNoStack(LoginForm);
