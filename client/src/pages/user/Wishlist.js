import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector(state => ({ ...state }));

  console.log('FROM WISHLIST ==> ', wishlist);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then(res => {
      // console.log(res.data.wishlist);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = productId =>
    removeWishlist(productId, user.token).then(res => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row m-t-2">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h4>Wishlist</h4>
          {wishlist.map(p => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`} className="text-decoration-none">
                {p.title}
              </Link>
              <Button
                type="text"
                onClick={() => handleRemove(p._id)}
                className="float-md-end"
                title="Delete the product from wishlist"
              >
                <DeleteOutlined className="text-danger" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
