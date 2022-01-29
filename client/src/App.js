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
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import SideDrawer from './components/drawer/SideDrawer';
import Checkout from './pages/Checkout';

const App = () => {
  const dispatch = useDispatch();
  // to check the firebase auth state
  useEffect(() => {
    // with onAuthStateChanged() method, we can subscribe users to
    // current authentication state
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // getIdTokenResult() is a method can be be used
        // to access the protected routes from backend
        const idTokenResult = await user.getIdTokenResult();
        // console.log('User', user);
        currentUser(idTokenResult.token)
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
          })
          .catch(error => {
            console.log(error);
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
        <SideDrawer />
        <ToastContainer />
        <Switch>
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={ProductUpdate}
          />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryUpdate}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <UserRoute exact path="/user/history" component={History} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/comp" />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/sub/:slug" component={SubHome} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
