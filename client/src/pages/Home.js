import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
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

      <div
        className="jumbotron"
        style={{ textAlign: 'center', marginTop: '30px' }}
      >
        <h4 className="display-4">New Arrivals</h4>
      </div>

      <NewArrivals />

      <div
        className="jumbotron"
        style={{ textAlign: 'center', marginTop: '30px' }}
      >
        <h4 className="display-4">Best Sellers</h4>
      </div>
      <BestSellers />
    </>
  );
};

export default Home;
