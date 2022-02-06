import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../components/nav/AdminNav';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then(res => setCoupons(res.data));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then(res => {
        setLoading(false);
        loadAllCoupons();
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`The coupon "${res.data.name}" has been created`);
      })
      .catch(err => console.log('Create coupon error ==> ', err));
  };

  const handleRemove = couponId => {
    setLoading(true);
    if (window.confirm('Delete?')) {
      removeCoupon(couponId, user.token)
        .then(res => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`The coupon "${res.data.name}" has been deleted`);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container-fluid m-t-2">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? <h4 className="text-danger">Loading</h4> : <h4>Coupon</h4>}
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount (%)</label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={date => setExpiry(date)}
              />
            </div>
            <br />
            <button className="btn bt-outline btn-primary">Save</button>
          </form>
          <br />
          <h4>Coupon List ({coupons.length} Coupons):</h4>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
