import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

const Register = () => {
  const [email, setEmail] = useState('');

  return (
    <Row className="m-t-3">
      <Col span={6} offset={6}>
        <h2>Register</h2>
        <Form onSubmit="handleSubmit">
          <Form.Item
            htmlFor="email"
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <input
              id="email"
              placeholder="Enter email address"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="btn btn-raised">
              Register
            </button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
