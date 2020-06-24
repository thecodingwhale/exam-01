import React, { useState } from 'react';

const SendCodeForm = ({ onSubmit, onCancel, error, disabled }) => {
  const [email, setEmail] = useState('');

  const handleChange = e => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(email);
  };

  const handleCancel = e => {
    e.preventDefault();

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mt-6">Reset Password</h1>
      <p>
        <input
          placeholder="Email"
          type="text"
          onChange={handleChange}
          disabled={disabled}
        />
      </p>
      <div>
        <button type="submit" disabled={disabled || !email}>
          Send Code
        </button>
        <button type="button" onClick={handleCancel} disabled={disabled}>
          Cancel
        </button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default SendCodeForm;
