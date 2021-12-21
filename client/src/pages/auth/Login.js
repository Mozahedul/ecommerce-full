import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('mozahed001@gmail.com');
  const [password, setPassword] = useState('mozahed525');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      // getIdTokenResult() is a method used to get access to
      // the backend after validating the id token
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult);

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message)
      });
  };
  return (
    <Row className="m-t-3">
      <Col span={8} offset={8}>
        {loading ? (
          <h4 className="text-success">Loading...</h4>
        ) : (
          <h4>Login</h4>
        )}
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

          <Button
            onClick={googleLogin}
            type="danger"
            style={{ marginTop: '15px' }}
            shape="round"
            icon={<GoogleOutlined />}
            block
            size="large"
          >
            Login with Google
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Login;
