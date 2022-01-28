import React from 'react';
import StarRatings from 'react-star-ratings';

export const showAverage = p => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    // returns number of ratings array
    let length = ratingsArray.length;
    // console.log('length', length);

    // returns a new array named total like [3, 4, 5, 6]
    ratingsArray.map(r => total.push(r.star));

    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log('totalReduced ==>', totalReduced);

    // this section is not needed, used length only
    let highest = length * 5;
    // console.log('highest', highest);

    let result = (totalReduced * 5) / highest;
    // console.log('result', result);

    return (
      <div
        className="text-center"
        style={{
          marginTop: '15px',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="1px"
            editing={false}
            rating={result}
            starRatedColor="rgb(241,144,30)"
          />
          <span style={{ paddingLeft: '2px' }}> ({p.ratings.length})</span>
        </span>
      </div>
    );
  }
};
