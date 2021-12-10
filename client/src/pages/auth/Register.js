import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [notFoundEmail, setNotFoundEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    // When a user click on register button, then a confirmation email with
    // validation link will send.
    // this config object is used to email link authentication
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    // send an email with sign in link
    if (email) {
      await auth.sendSignInLinkToEmail(email, config);
      // After sending the email, show a message in website
      toast.success(
        `Email is send to ${email}. Click the link to complete your registration.`,
      );
    } else {
      setNotFoundEmail('Please enter your email!');
    }

    // save email in local storage
    localStorage.setItem('emailForRegistration', email);
    // clear the state
    setEmail('');
  };
  return (
    <Row className="m-t-3">
      <Col span={6} offset={6}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <p style={{ color: 'red' }}>{notFoundEmail}</p>
          <button
            type="submit"
            className="btn btn-raised"
            style={{ marginTop: '12px' }}
          >
            Register
          </button>
        </form>
      </Col>
    </Row>
  );
};

export default Register;
