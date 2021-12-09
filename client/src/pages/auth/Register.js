import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // When a user click on register button, then a confirmation email with
    // validation link will send.
    // this config object is used to email link authentication
    const config = {
      url: 'http://localhost:3000/register/complete',
      handleCodeInApp: true,
    };

    // send an email with sign in link
    await auth.sendSignInLinkToEmail(email, config);

    // After sending the email, show a message in website
    toast.success(
      `Email is send to ${email}. Click the link to complete your registration.`,
    );

    // save email in local storage
    window.localStorage.setItem('emailForRegistration', email);
    // clear the state
    setEmail('');
  };
  return (
    <Row className="m-t-3">
      <Col span={6} offset={6}>
        <h2>Register</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
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
