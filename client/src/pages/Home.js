import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

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
      <br />

      <div
        className="jumbotron"
        style={{ textAlign: 'center', marginTop: '30px' }}
      >
        <h4 className="display-4">Categories</h4>
      </div>
      <CategoryList />

      <br />
      <div
        className="jumbotron"
        style={{ textAlign: 'center', marginTop: '30px' }}
      >
        <h4 className="display-4">Sub Categories</h4>
      </div>
      <SubList />
      <br />
      <br />
    </>
  );
};

export default Home;
