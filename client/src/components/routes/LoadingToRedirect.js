import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);
    count === 0 && history.push('/');
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <p
      className="text-info"
      style={{
        fontWeight: '500',
        fontSize: '16px',
        marginTop: '30px',
        textAlign: 'center',
      }}
    >
      Redirecting you in {count} seconds
    </p>
  );
};

export default LoadingToRedirect;
