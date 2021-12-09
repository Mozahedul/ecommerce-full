import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // code here
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
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
