import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log('ERROR IN FORGOT MESSAGE', error);
      });
  };

  return (
    <div
      className="container col-md-6 offset-md-3 p-5"
      style={{ marginTop: '30px' }}
    >
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Type your email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="btn btn-raised"
          disabled={!email}
          style={{ marginTop: '15px' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
