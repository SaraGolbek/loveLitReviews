import React, { useState, useEffect } from 'react';
import StarRating from '../components/starrater.jsx';
import StarReview from '../components/starhelper.jsx';

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

    const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    const refreshHome = () => {
        fetch('http://localhost:5000/api/reviews')
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
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&printType=books&key=${GOOGLE_BOOKS_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setBookList(data.items.slice(0, 10));
                })
                .catch((error) => console.error('Error fetching books:', error));
        }
    };

    const onBookSelect = (book) => {
        setSelectedBook({
            title: book.volumeInfo.title,
            id: book.id,
            authors: book.volumeInfo.authors || ['Unknown Author'],
            cover: book.volumeInfo.imageLinks?.thumbnail || '',
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

        fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        })
            .then((response) => response.json())
            .then(() => {
                refreshHome();
                setShowReviewForm(false);
                setRatings({ overall: 0, story: 0, style: 0, steam: 0 });
                setComment('');
            })
            .catch((error) => console.error('Error submitting review:', error));
    };

    const clearSearch = () => {
        setBookTitle('');
        setBookList([]);
    };

    return (
        <div className="row text-secondary">
            <div className="col-12">
                <div className="row">
                    <div className="home-img img-header w-100"></div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
                        {/* Book Search */}
                        <form className="row p-4">
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
                                <div className="col-12 col-md-7 justify-content-center">
                                    <div className="mb-4">
                                        <img
                                            src={selectedBook.cover}
                                            alt={selectedBook.title}
                                            className="img-fluid rounded"
                                        />
                                        <h2>{selectedBook.title}</h2>
                                        <p>
                                            <i>By: {selectedBook.authors.join(', ')}</i>
                                        </p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="col-12 col-sm-10 col-md-5">
                                    <div className="form-group">
                                        <label>Overall Rating</label>
                                        <StarRating
                                            value={ratings.overall}
                                            onChange={(value) => handleRatingChange('overall', value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Story Rating</label>
                                        <StarRating
                                            value={ratings.story}
                                            onChange={(value) => handleRatingChange('story', value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Style Rating</label>
                                        <StarRating
                                            value={ratings.style}
                                            onChange={(value) => handleRatingChange('style', value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Steam Rating</label>
                                        <StarRating
                                            value={ratings.steam}
                                            onChange={(value) => handleRatingChange('steam', value)}
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
                                    <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
                                </form>

                            </div>
                        )}

                        {/* Review Posts */}
                        {reviews.map((review) => (
                            <div className="row mb-4 w-100" key={review.id}>
                                <div className="col-12 p-4 bg-white rounded shadow-sm">
                                    <img
                                        src={review.thumbnail}
                                        className="float-start bookCover rounded me-4"
                                        alt={review.title}
                                    />
                                    <h3 className="d-inline me-2">{review.title}</h3>
                                    <p className="d-inline">
                                    By <i>{review.author}</i>
                                    </p>
                                    <ul className="list-inline mt-1">
                                        <li className="list-inline-item">
                                            Overall: <StarReview value={review.overall}/>
                                        </li>
                                        <li className="list-inline-item">
                                            Story: <StarReview value={review.story} />
                                        </li>
                                        <li className="list-inline-item">
                                            Style: <StarReview value={review.style} />
                                        </li>
                                        <li className="list-inline-item">
                                            Steam: <StarReview value={review.steam} />
                                        </li>
                                    </ul>
                                    <p className="review" style={{ textIndent: '3em' }}>
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
