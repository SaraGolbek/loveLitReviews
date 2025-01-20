import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ label, name, value, onChange }) => {
    const stars = [1, 2, 3, 4, 5]; // 5-star rating system

    return (
        <div className="star-rating mb-3">
            <label className="form-label">{label}</label>
            <div className="stars">
                {stars.map((star) => (
                    <React.Fragment key={star}>
                        <input
                            type="radio"
                            id={`${name}-${star}`}
                            name={name}
                            value={star}
                            checked={value === star}
                            onChange={onChange}
                            className="star-input"
                        />
                        <label
                            htmlFor={`${name}-${star}`}
                            className={`star-label ${value >= star ? 'checked' : ''}`}
                        >
                            ★
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

StarRating.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default StarRating;
