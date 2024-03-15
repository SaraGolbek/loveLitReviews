// home.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';
import StarRating from "@src/utils/starRater";
import StarReview from  "@src/utils/starHelper"

import './stylesheets/app';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [bookTitle, setBookTitle] = useState('');
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [ratings, setRatings] = useState({
    overall: 0,
    story: 0,
    style: 0,
    steam: 0,
  });
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const refreshHome = () => {
    fetch('/api/reviews', safeCredentials({
      method: 'GET',
    }))
      .then(handleErrors)
      .then(data => {
        setReviews(data.reviews);
      })
  };

  useEffect(() => {
    refreshHome();
  }, []);

  useEffect(() => {
    if (showReviewForm) {
      clearSearch();
    }
  }, [showReviewForm]);

  const onBookTitleChange = (e) => {
    setBookTitle(e.target.value);
    if (bookTitle.length > 1) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}+intitle&printType=books&key=#{GOOGLE_BOOKS_API_KEY}`)
        .then(handleErrors)
        .then(data => {
          setBookList(data.items.slice(0, 5));
        });
    }
  };

  const onBookSelect = (e, book) => {
    const reviewingBook = {
      title: book.volumeInfo.title,
      id: book.id,
      authors: book.volumeInfo.authors,
      cover: book.volumeInfo.imageLinks.thumbnail,
    };
    setSelectedBook(reviewingBook);
    setShowReviewForm(true);
  };

  const onBookReviewStart = (e) => {
    setShowReviewForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatings(prevState => ({
      ...prevState,
      [name]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
  const { overall, story, style, steam } = ratings;

  const reviewData = {
    book_id: selectedBook.id,
    title: selectedBook.title,
    author: selectedBook.authors.join(""),
    thumbnail: selectedBook.cover,
    overall: overall,
    story: story,
    style: style,
    steam: steam,
    comment: comment,
  };

    fetch('/api/reviews', safeCredentials ({
      method: 'POST',
      body: JSON.stringify(reviewData)
    }))
    .then(handleErrors)
    .then(data => {
      console.log(data);
      setRatings({
        overall: 0,
        story: 0,
        style: 0,
        steam: 0,
      });
      setComment('');
    })
  };

  const clearSearch = () => {
    setBookTitle('');
    setBookList([]);
  };

  return (
    <Layout>
      <div className="row text-secondary">
        <div className="col-12">
          {/*------Header------ */}
          <div className="row">
            <div className="home-img img-header w-100"></div>
          </div>
          <div className="row">
            <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
              <div className="row">
                <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                  {/*------Book Search------ */}
                  <form className="row p-4">
                    <div className="col-12 col-md-8 col-xl-9">
                      <input type="text" className="form-control" onChange={(e) => onBookTitleChange(e)} placeholder="What book do you want to review?" />
                      {bookList && (bookList.map((book, index) => (
                        <div key={index} onClick={(e) => onBookSelect(e, book)} tabIndex={index} className="mt-3 searchItem">
                          <div className="row">
                            <div className="col-2">
                              <div className="search-img" style={{ backgroundImage: `url(${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''})` }} />
                            </div>
                            <div className="col-10 lh-sm"  >
                              <p className="mb-0">{book.volumeInfo.title}</p>
                              <p className="pt-0"><i>By: {book.volumeInfo.authors}</i></p>
                            </div>
                          </div>
                        </div>)))}
                      <div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-3 mt-3 mt-lg-0">
                      <button className="btn btn-secondary ms-2" onClick={onBookReviewStart}>Add Review</button>
                      <button type="button" className="btn btn-secondary ms-4" onClick={clearSearch}>Cancel</button>
                    </div>
                  </form>
                  {/*------Review Form------ */}
                  {showReviewForm && (
                    <div className='row m-2'>
                      <div className='col-12 col-md-7 justify-content-center'>
                        <div className='mb-4'>
                          <img src={selectedBook.cover} alt={selectedBook.title} className='img-fluid rounded' />
                          <h2>{selectedBook.title}</h2>
                          <p><i>By: {selectedBook.authors}</i></p>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="col-12 col-sm-10 col-md-5">
                        <StarRating label="How would you rate the book overall?" name="overall" value={ratings.overall} onChange={handleChange} />
                        <StarRating label="How would you rate the book's story?" name="story" value={ratings.story} onChange={handleChange} />
                        <StarRating label="How would you rate the book's style?" name="style" value={ratings.style} onChange={handleChange} />
                        <StarRating label="How would you rate the book's steam?" name="steam" value={ratings.steam} onChange={handleChange} />
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                          <label htmlFor="floatingTextarea">Comments</label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              {/*------Review Posts------ */}
              {reviews.map(review => (
              <div className="row mb-4 w-100 " key={review.id}>
              <div className=" col-12 p-4 bg-white rounded shadow-sm">
                <a href={`book/${review.book_id}/${review.title}`} className="link-opacity-25-hover link-secondary text-decoration-none"><img src={review.thumbnail} className="float-start bookCover rounded me-4"></img></a>
                <h3 className="d-inline me-2"><a href={`users/${review.username}/reviews`} className="link-opacity-25-hover link-secondary text-decoration-none">{review.username}'s Review</a> of {review.title}</h3>
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
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  );
});

