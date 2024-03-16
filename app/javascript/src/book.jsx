// book.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';
import StarReview from  "@src/utils/starHelper";

import './stylesheets/app';

const Book = () => {
  const url = window.location.pathname;
  const titleParts = url.split('/book/')[1].split('/');
  const title = titleParts[titleParts.length - 1];
  const decodedTitle = decodeURIComponent(title);
  const bookIdParts = url.split('/book/')[1].split('/A%');
  const bookId = decodeURIComponent(bookIdParts[0]);
  const [bookInformation, setBookInformation] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRatings, setAverageRatings] = useState({
    overall: 0,
    story: 0,
    style: 0,
    steam: 0
  });

  const calculateAverageRatings = (reviewsData) => {
    const totalRatings = reviewsData.length;
    const sumRatings = reviewsData.reduce((accumulator, currentValue) => {
      return {
        overall: accumulator.overall + currentValue.overall,
        story: accumulator.story + currentValue.story,
        style: accumulator.style + currentValue.style,
        steam: accumulator.steam + currentValue.steam
      };
    }, { overall: 0, story: 0, style: 0, steam: 0 });

    const averageRatings = {
      overall: totalRatings ? Math.round(sumRatings.overall / totalRatings) : 0,
      story: totalRatings ? Math.round(sumRatings.story / totalRatings) : 0,
      style: totalRatings ? Math.round(sumRatings.style / totalRatings) : 0,
      steam: totalRatings ? Math.round(sumRatings.steam / totalRatings) : 0
    };
    setAverageRatings(averageRatings);
  };

  const fetchBookById = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?#{GOOGLE_BOOKS_API_KEY}`)
    .then(handleErrors)
        .then(data => {
          console.log(data)
          setBookInformation(data.volumeInfo);
        });
  }

  const loadBookReviews = () => {
    fetch(`/api/book/${title}`, safeCredentials({
      method: 'GET',
    }))
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const reviewsData = data.reviews || [];
        setReviews(reviewsData);
        calculateAverageRatings(reviewsData);
      })
      .catch(error => {
        console.error('Error loading book:', error);
      });
  };

  useEffect(() => {
    fetchBookById();
    loadBookReviews();
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
                <h2 className="text-center">{decodedTitle} Information</h2>
              </div>
              <div className="row mb-3 w-100">
                <div className="col-12 p-4 pb-0 bg-white rounded shadow-sm">
                {bookInformation.imageLinks && <img src={bookInformation.imageLinks.thumbnail} alt="Book Cover" className="float-start me-4 rounded" />}
                  <h3 className="d-inline me-2">{decodedTitle} By <i>{bookInformation.authors && bookInformation.authors.join(', ')}</i></h3>
                  {bookInformation.categories && bookInformation.categories.length > 0 && (
                    <p className="fw-light fst-italic">Categories: {bookInformation.categories.join(', ')}</p>
                  )}
                  <p className='mt-2 lead' style={{textIndent: "3em"}}>{bookInformation.description}</p>
                </div>
              </div>
              <div className="row bg-white rounded shadow-sm ms-1 mb-4 p-2">
                <ul className="list-inline book-specific-ratings mt-2">
                    <li className="list-inline-item fw-bolder">LoveLitReviews</li>
                    <li className="list-inline-item pe-1">Overall: <StarReview value={averageRatings.overall} /></li>
                    <li className="list-inline-item pe-1">Story: <StarReview value={averageRatings.story} /></li>
                    <li className="list-inline-item pe-1">Style: <StarReview value={averageRatings.style} /></li>
                    <li className="list-inline-item">Steam: <StarReview value={averageRatings.steam} /></li>
                </ul>
              </div>
            </div>
            {/*----------book reviews-------------*/}
            <div className="row">
              <div className="col-12 mb-4 p-3 bg-white rounded shadow-sm">
                <h2 className="text-center"> {decodedTitle} Reviews</h2>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              reviews.map(review => (
                <div className="row mb-4 w-100 " key={review.id}>
                  <div className="col-12 col-lg-8 p-4 bg-white rounded shadow-sm">
                  <h3><a href={`/userPage/${review.username}`} className="link-opacity-25-hover link-secondary text-decoration-none">{review.username}'s Review</a></h3>
                  <p className='mt-2 lead' style={{textIndent: "3em"}}>{review.comment}</p>
                  </div>
                  <div className="col-12 col-lg-4 p-0">
                    <div className="mt-2 mt-lg-0 ms-lg-2 p-4 w-100 h-100 bg-white rounded shadow-sm fst-italic">
                        <div className="mb-1 d-inline d-lg-block lead">Overall: <StarReview value={review.overall} /></div>
                        <div className="mb-1 d-inline d-lg-block lead">Story: <StarReview value={review.story} /></div>
                        <div className="mb-1 d-inline d-lg-block lead">Style: <StarReview value={review.style} /></div>
                        <div className='d-inline d-lg-block lead'>Steam: <StarReview value={review.steam} /></div>
                    </div>
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
