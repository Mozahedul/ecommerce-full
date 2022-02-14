import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map(order => (
        <div key={order._id} className="row p-3 m-b-3 m-r-2 shadow bg-light">
          <ShowPaymentInfo order={order} showStatus={false} />
          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <select
                name="status"
                onChange={e => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
