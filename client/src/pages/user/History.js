import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getUserOrders } from '../../functions/user';

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then(res => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User history page</div>
      </div>
    </div>
  );
};

export default History;
