import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRater.jsx';
import StarReview from '../components/StarHelper.jsx';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [bookTitle, setBookTitle] = useState('');
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [ratings, setRatings] = useState({
        overall_rating: 0,
        story_rating: 0,
        style_rating: 0,
        steam_rating: 0,
    });
    const [comment, setComment] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);

    const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    const refreshHome = () => {
        fetch(`${API_BASE_URL}/api/reviews`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => setReviews(data.reviews))
            .catch((error) => console.error('Error fetching reviews:', error));
    };

    useEffect(() => {
        refreshHome();
    }, []);

    const onBookTitleChange = (e) => {
        setBookTitle(e.target.value);

        if (e.target.value.length > 1) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}+intitle:${e.target.value}&printType=books&key=${GOOGLE_BOOKS_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setBookList(data.items.slice(0, 10));
                })
                .catch((error) => console.error('Error fetching books:', error));
        }
    };

    const onBookSelect = (book) => {
        setSelectedBook({
            title: book.volumeInfo?.title || 'Unknown Title',
            id: book.id || 'Unknown ID',
            authors: book.volumeInfo?.authors || ['Unknown Author'],
            cover: book.volumeInfo?.imageLinks?.thumbnail || '',
        });
        setShowReviewForm(true);
        setBookList([]);
    };

    const handleRatingChange = (key, value) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            book_id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.authors.join(', '),
            thumbnail: selectedBook.cover,
            ...ratings,
            comment,
        };

        fetch(`${API_BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Include cookies for authentication
            body: JSON.stringify(reviewData),
        })
            .then((response) => response.json())
            .then(() => {
                refreshHome();
                setShowReviewForm(false);
                setRatings({ overall_rating: 0, story_rating: 0, style_rating: 0, steam_rating: 0 });
                setComment('');
            })
            .catch((error) => console.error('Error submitting review:', error));
    };

    const clearSearch = () => {
        setBookTitle('');
        setBookList([]);
    };

    return (
        <div className="App container-fluid">
            <div className="row text-secondary">
                <div className="col-12">
                    <div className="row">
                        <div className="home-img img-header w-100"></div>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
                            {/* Book Search */}
                            <form
                                className="row p-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowReviewForm(true);
                                }}
                            >
                                <div className="col-12 col-md-8 col-xl-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookTitle}
                                        onChange={onBookTitleChange}
                                        placeholder="What book do you want to review?"
                                    />
                                    {bookList.map((book, index) => (
                                        <div
                                            key={index}
                                            onClick={() => onBookSelect(book)}
                                            className="mt-3 searchItem"
                                        >
                                            <div className="row">
                                                <div className="col-2">
                                                    <div
                                                        className="search-img"
                                                        style={{
                                                            backgroundImage: `url(${book.volumeInfo.imageLinks?.thumbnail || ''})`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-10 lh-sm">
                                                    <p className="mb-0">{book.volumeInfo.title}</p>
                                                    <p className="pt-0">
                                                        <i>By: {book.volumeInfo.authors?.join(', ')}</i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-12 col-lg-4 col-xl-3 mt-3 mt-lg-0">
                                    <button className="btn btn-secondary ms-2" onClick={() => setShowReviewForm(true)}>
                                        Add Review
                                    </button>
                                    <button type="button" className="btn btn-secondary ms-4" onClick={clearSearch}>
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            {/* Review Form */}
                            {showReviewForm && (
                                <div className="row m-2">
                                <div className="col-12 col-md-5 justify-content-center d-flex">
                                        <div className="mb-4">
                                            <img
                                                src={selectedBook.cover}
                                                alt={selectedBook.title}
                                                className="img-fluid rounded"
                                            />
                                            <h2>{selectedBook.title}</h2>
                                            <p>
                                                <i>By: {selectedBook.authors?.join(", ") || "Unknown Author"}</i>
                                            </p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} className="col-12 col-sm-10 col-md-7">
                                        <div className="form-group mb-3 justify-content-between d-flex">
                                            <label className="review-question">How would you rate the book
                                                overall?</label>
                                            <StarRating
                                                value={ratings.overall_rating}
                                                onChange={(value) => handleRatingChange('overall_rating', value)}
                                            />
                                        </div>
                                        <div className="form-group mb-3 justify-content-between d-flex">
                                            <label className="review-question">How would you rate the book&#39;s
                                                story?</label>
                                            <StarRating
                                                value={ratings.story_rating}
                                                onChange={(value) => handleRatingChange('story_rating', value)}
                                            />
                                        </div>
                                        <div className="form-group mb-3 justify-content-between d-flex">
                                            <label className="review-question">How would you rate the book&#39;s
                                                style?</label>
                                            <StarRating
                                                value={ratings.style_rating}
                                                onChange={(value) => handleRatingChange('style_rating', value)}
                                            />
                                        </div>
                                        <div className="form-group mb-3 justify-content-between d-flex">
                                            <label className="review-question">How would you rate the book&#39;s
                                                steam?</label>
                                            <StarRating
                                                value={ratings.steam_rating}
                                                onChange={(value) => handleRatingChange('steam_rating', value)}
                                            />
                                        </div>
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Leave a comment here"
                                                id="floatingTextarea"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                            <label htmlFor="floatingTextarea">Comments</label>
                                        </div>
                                        <button type="submit" className="btn btn-secondary mt-3">Submit Review</button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mt-3 ms-3"
                                            onClick={() => {
                                                setShowReviewForm(false);
                                                setRatings({overall_rating: 0, story_rating: 0, style_rating: 0, steam_rating: 0});
                                                setComment('');
                                            }}
                                        >Cancel
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Review Posts */}
                            {[...reviews].reverse().map((review) => (
                                <div className="row mb-4 w-100" key={review.book_id}>
                                    <div className="col-12 p-4 bg-white rounded shadow-sm">
                                        <Link to={`/books/${review.book_id}`}>
                                            <img
                                                src={review.thumbnail}
                                                className="float-start bookCover rounded me-4"
                                                alt={review.title}
                                            />
                                        </Link>
                                        <h3 className="d-inline me-2">
                                            <Link to={`/profile/${review.username}`} className="text-decoration-none text-secondary">
                                                {review.username}&#39;s
                                                <span> Review of </span>
                                                {review.title}
                                            </Link>
                                        </h3>
                                        <p className="d-inline">
                                            By <i>{review.author}</i>
                                        </p>
                                        <ul className="list-inline mt-1">
                                            <li className="list-inline-item">
                                                Overall: <StarReview value={review.overall_rating}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Story: <StarReview value={review.story_rating}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Style: <StarReview value={review.style_rating}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Steam: <StarReview value={review.steam_rating}/>
                                            </li>
                                        </ul>
                                        <p className="review" style={{textIndent: '3em'}}>
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
