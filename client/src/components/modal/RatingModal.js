import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const RatingModal = ({ children }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  const { slug } = useParams();

  console.log('slug==> ', slug);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? 'Leave a rating' : 'Login to leave a rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will appear soon');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
