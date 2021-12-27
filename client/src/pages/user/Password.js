import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Password updated');
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          autoFocus
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
          style={{ marginTop: '15px' }}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ marginTop: '30px' }}>
          <UserNav />
        </div>
        <div className="col" style={{ marginTop: '30px' }}>
          <h4 style={{ marginBottom: '15px' }}>Password Update</h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
