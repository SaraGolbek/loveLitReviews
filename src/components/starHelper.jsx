import React from 'react';
import PropTypes from 'prop-types';

const StarReview = ({ value }) => {
    const stars = [1, 2, 3, 4, 5]; // 5-star rating system

    return (
        <div className="star-review">
            {stars.map((star) => (
                <span key={star} className={`star ${value >= star ? 'filled' : ''}`}>
                    ★
                </span>
            ))}
        </div>
    );
};

StarReview.propTypes = {
    value: PropTypes.number.isRequired,
};

export default StarReview;
