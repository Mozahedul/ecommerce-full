import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO code here
    console.table(email, password);
  };
  return (
    <Row className="m-t-3">
      <Col span={8} offset={8}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <input
            style={{ marginTop: '12px' }}
            type="password"
            className="form-control"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="primary"
            style={{ marginTop: '15px' }}
            shape="round"
            icon={<MailOutlined />}
            block
            size="large"
            disabled={!email || password.length < 6}
          >
            Login with email/password
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Login;
