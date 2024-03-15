// book.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';
import StarReview from  "@src/utils/starHelper";

import './stylesheets/app';

const Book = () => {

  const url = window.location.pathname;
  const parts = url.split('/book/')[1].split('/');
  const title = parts[parts.length - 1];
  const [reviews, setReviews] = useState([]);

  const loadBook = () => {
    fetch(`/api/book/${title}`, safeCredentials({
      method: 'GET',
    }))
      .then(handleErrors)
      .then(data => {
        setReviews(data.reviews || []);
        console.log(data);
      })
      .catch(error => {
        console.error('Error loading book:', error);
      });
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
  <Layout>
    <div className="row text-secondary">
      <div className="col-12">
        <div className="row">
          <div className="book-img img-header w-100"></div>
        </div>
        <div className="row">
          <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
            {/*----------book info-------------*/}
            <div className="row">
              <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                <h2 className="text-center">Book Information</h2>
              </div>
              <div className="row mb-4 w-100">
                <div className="col-4 col-md-3">

                </div>
                <div className="col-8 col-md-9 d-flex flex-column p-4 pb-0 bg-white rounded shadow-sm">
                  <h3 className="d-inline me-2">Book TitleBy <i>Author</i></h3>
                  <p className="fw-light fst-italic">Categories: Romance, Historical, etc</p>
                  <p className='mt-2 lead' style={{textIndent: "3em"}}>Book Description example: This book is about example example example example example example example example example example example example example example example example</p>
                  <p className="list-unstyled mt-auto mb-0 book-specific-ratings">
                   Google's Rating <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i><i className="fa-solid fa-star" style={{color: '#6c757d'}}></i><i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                  </p>
                  <ul className="list-inline book-specific-ratings">
                    <li className="list-inline-item pe-1">User Ratings:</li>
                    <li className="list-inline-item pe-1">Overall
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item pe-1">Story
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item pe-1">Style
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item">Steam
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                </ul>
                </div>
              </div>
            </div>
            {/*----------book reviews-------------*/}
            <div className="row">
              <div className="col-12 mb-4 p-3 bg-white rounded shadow-sm">
                <h2 className="text-center"> Book Title Reviews</h2>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              reviews.map(review => (
                <div className="row mb-4 w-100 " key={review.id}>
                  <div className="col-12 p-4 bg-white rounded shadow-sm">
                    {/* Review details */}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Book />,
    document.body.appendChild(document.createElement('div')),
  )
})
