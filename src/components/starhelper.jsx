import React from 'react';
import PropTypes from 'prop-types';

const StarReview = ({ value }) => {
  return (
    <div className="star-rating d-inline">
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`fa-solid fa-star reviewStars ${index < value ? ' active' : ''}`}
        ></i>
      ))}
    </div>
  );
};

StarReview.propTypes = {
  value: PropTypes.number.isRequired,
};

export default StarReview;