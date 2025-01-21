import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ maxStars = 5, value, onChange }) => {
    const [hoverIndex, setHoverIndex] = useState(0);

    return (
        <div className="rating">
            {[...Array(maxStars)].map((_, index) => {
                const starIndex = maxStars - index; // Reverse order for row-reverse styling
                return (
                    <label
                        key={starIndex}
                        htmlFor={`star-${starIndex}`}
                        className={starIndex <= (hoverIndex || value) ? 'active' : ''}
                        onMouseEnter={() => setHoverIndex(starIndex)}
                        onMouseLeave={() => setHoverIndex(0)}
                        onClick={() => onChange(starIndex)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </label>
                );
            })}
        </div>
    );
};

StarRating.propTypes = {
    maxStars: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default StarRating;
