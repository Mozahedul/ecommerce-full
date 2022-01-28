import React from 'react';
import StarRatings from 'react-star-ratings';

const Star = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRatings
        changeRating={() => starClick(numberOfStars)}
        rating={numberOfStars}
        starHoverColor="rgb(179, 116, 0)"
        starDimension="20px"
        starSpacing="2px"
        starRatedColor="rgb(241,144,30)"
      />
    </>
  );
};

export default Star;
