// profile.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';
import StarReview from  "@src/utils/starHelper"

import './stylesheets/app.scss';


const Profile = () => {
  const [reviews, setReviews] = useState([]);
  const username = window.location.pathname.replace('/userPage/', '');
  console.log(username);

  const refreshProfile = () => {
    fetch(`/api/reviews/${username}`, safeCredentials({
      method: 'GET',
    }))
      .then(handleErrors)
      .then(data => {
        setReviews(data.reviews);
        console.log(data.reviews);
      })
  }

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <Layout>
      <div className="row text-secondary">
        <div className="col-12">
          <div className="row">
            <div className="user-img img-header w-100"></div>
          </div>
          <div className="row">
            <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
              <div className="row">
                <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                  <h2 className="text-center">{username}'s Bookshelf</h2>
                </div>
              </div>
                {reviews.map(review => (
                  <div className="row mb-4 w-100 " key={review.id}>
                    <div className=" col-12 p-4 bg-white rounded shadow-sm">
                      <a href={`/book/${review.book_id}/${review.title}`} className="link-opacity-25-hover link-secondary text-decoration-none"><img src={review.thumbnail} className="float-start bookCover rounded me-4"></img></a>
                      <h3 className="d-inline me-2">{review.title}</h3>
                      <p className="d-inline">By <i>{review.author}</i></p>
                      <ul className="list-inline mt-1">
                        <li className="list-inline-item">Overall: <StarReview value={review.overall} /></li>
                        <li className="list-inline-item">Story: <StarReview value={review.story} /></li>
                        <li className="list-inline-item">Style: <StarReview value={review.style} /></li>
                        <li className="list-inline-item">Steam: <StarReview value={review.steam} /></li>
                      </ul>
                      <p className='review' style={{textIndent: "3em"}}>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile />,
    document.body.appendChild(document.createElement('div')),
  )
})