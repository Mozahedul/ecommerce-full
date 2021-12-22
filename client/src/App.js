import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  const dispatch = useDispatch();
  // to check the firebase auth state
  useEffect(() => {
    // with onAuthStateChanged() method, we can subscribe users to
    // current authentication state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // getIdTokenResult() is a method can be be used
        // to access the protected routes from backend
        const idTokenResult = await user.getIdTokenResult();
        console.log('User', user);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route path="/forgot/password" component={ForgotPassword} />
          <Route path="/register/complete" component={RegisterComplete} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </>
  );
};

export default App;
