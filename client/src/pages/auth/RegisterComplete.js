import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // code here
    setEmail(localStorage.getItem('emailForRegistration'));
    // console.log(window.location.href);
    // console.log(location.search);
    // console.log(localStorage.getItem('emailForRegistration'));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error('Email and password are required ');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href,
      );

      // console.log('RESULT: ==> ', result);
      if (result.user.emailVerified) {
        // remove user from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        console.log('user: ==>', user, 'token:==>', idTokenResult);
        // redirect
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Row className="m-t-3">
      <Col span={6} offset={6}>
        <h2>Register complete</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} className="form-control" disabled />
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{ marginTop: '12px' }}
          />
          <button
            type="submit"
            className="btn btn-raised"
            style={{ marginTop: '15px' }}
          >
            Complete registration
          </button>
        </form>
      </Col>
    </Row>
  );
};

export default RegisterComplete;
