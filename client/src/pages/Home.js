import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';

const Home = () => {
  return (
    <>
      <div
        className="jumbotron text-danger h1 font-weight-bold"
        style={{ textAlign: 'center' }}
      >
        <Jumbotron text={['Latest Product', 'New Arrivals', 'Best Sellers']} />
      </div>

      <div className="jumbotron" style={{ textAlign: 'center' }}>
        <h4 className="display-4">New Arrivals</h4>
      </div>

      <NewArrivals />
    </>
  );
};

export default Home;
