import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('mozahed001@gmail.com');
  const [password, setPassword] = useState('mozahed525');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  const location = useLocation();
  let intended = location.state;

  useEffect(() => {
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push('/');
    }
  }, [user, history, intended]);

  const roleBasedDirect = res => {
    // Check if intended

    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }

    // }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      // getIdTokenResult() is a method used to get access to
      // the backend after validating the id token
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then(res => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedDirect(res);
        })
        .catch(error => {
          console.log(error);
        });
      history.push('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async e => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async result => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then(res => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });

            roleBasedDirect(res);
          })
          .catch(error => {
            console.log(error);
          });
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <Row className="m-t-3">
      <Col span={8} offset={8}>
        {loading ? (
          <h4 className="text-success">Loading...</h4>
        ) : (
          <>
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <input
                style={{ marginTop: '12px' }}
                type="password"
                className="form-control"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Link
                to="/forgot/password"
                style={{ float: 'right', marginTop: '10px' }}
              >
                Forgot password?
              </Link>
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
          </>
        )}
      </Col>
    </Row>
  );
};

export default Login;
