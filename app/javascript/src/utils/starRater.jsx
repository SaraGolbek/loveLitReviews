import React from 'react';


const StarRating = ({ label, name, value, onChange }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
          <input
            id={`${name}-${5 - index}`}
            type="radio"
            name={name}
            value={5 - index}
            checked={value === 5 - index}
            onChange={onChange}
          />
          <label htmlFor={`${name}-${5 - index}`}><i className="fa-solid fa-star"></i></label>
        </React.Fragment>
      ))}
      <p className="text-secondary pe-2">{label}</p>
    </div>
  );
};

export default StarRating;