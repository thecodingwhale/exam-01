import React, { useState } from 'react';

const ResetPasswordForm = ({ onSubmit, onCancel, disabled, error }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [formError, setFormError] = useState('');

  const handlePasswordChange = e => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = e => {
    e.preventDefault();

    setPasswordConfirm(e.target.value);
  };

  const handleCodeChange = e => {
    e.preventDefault();

    setCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setFormError('');

    if (password !== passwordConfirm) {
      setFormError('New password and confirmation must match.');
      return;
    }

    onSubmit(password, code);
  };

  const handleCancel = e => {
    e.preventDefault();

    onCancel();
  };

  const formIncomplete = !password || !passwordConfirm || !code;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <p>
        A password reset code has been sent to your email. Enter the code below.
      </p>
      <div>
        New Password:
        <input
          type="password"
          onChange={handlePasswordChange}
          disabled={disabled}
        />
      </div>
      <div>
        Confirm Password:
        <input
          type="password"
          onChange={handlePasswordConfirmChange}
          disabled={disabled}
        />
      </div>
      <div>
        Password Reset Code:
        <input
          type="password"
          onChange={handleCodeChange}
          disabled={disabled}
        />
      </div>
      <div>
        <button type="submit" disabled={disabled || formIncomplete}>
          Change Password
        </button>
        <button type="button" onClick={handleCancel} disabled={disabled}>
          Cancel
        </button>
      </div>
      {error && <div>{error}</div>}
      {formError && <div>{formError}</div>}
    </form>
  );
};

export default ResetPasswordForm;
