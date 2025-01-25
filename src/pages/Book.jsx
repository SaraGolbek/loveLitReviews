import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarReview from "../components/StarHelper.jsx";
import { API_BASE_URL } from '../utils/api';

const Book = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRatings, setAverageRatings] = useState({
        overall_rating: 0,
        story_rating: 0,
        style_rating: 0,
        steam_rating: 0,
    });

    const calculateAverageRatings = (reviewsData) => {
        const totalRatings = reviewsData.length;
        const sumRatings = reviewsData.reduce(
            (acc, review) => ({
                overall_rating: acc.overall_rating + review.overall_rating,
                story_rating: acc.story_rating + review.story_rating,
                style_rating: acc.style_rating + review.style_rating,
                steam_rating: acc.steam_rating + review.steam_rating,
            }),
            { overall_rating: 0, story_rating: 0, style_rating: 0, steam_rating: 0 }
        );

        setAverageRatings({
            overall_rating: totalRatings ? Math.round(sumRatings.overall_rating / totalRatings) : 0,
            story_rating: totalRatings ? Math.round(sumRatings.story_rating / totalRatings) : 0,
            style_rating: totalRatings ? Math.round(sumRatings.style_rating / totalRatings) : 0,
            steam_rating: totalRatings ? Math.round(sumRatings.steam_rating / totalRatings) : 0,
        });
    };

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.volumeInfo) {
                    setBook(data.volumeInfo);
                }
            })
            .catch((err) => console.error("Error fetching book details:", err));

        fetch(`${API_BASE_URL}/api/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.error(data.error);
                    setReviews([]);
                    setBook(null);
                } else {
                    setBook(data.book);
                    setReviews(data.reviews || []);
                    calculateAverageRatings(data.reviews || []);
                }
            })
            .catch((err) => console.error("Error fetching book details and reviews:", err));
    }, [id]);

    if (!book) {
        return <div>Loading book details...</div>;
    }

    return (
        <div className="App container-fluid">
            <div className="row">
                <div className="book-img img-header w-100"></div>
            </div>

            <div className="row text-secondary">
                <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">

                    {/* book info */}
                    <div className="row">
                        <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                            <h2 className="text-center">{book.title} Information</h2>
                        </div>
                    <div className="row mb-3 w-100">
                        <div className="col-12 p-4 pb-0 bg-white rounded shadow-sm">
                            {book.imageLinks?.thumbnail && (
                                <img
                                    src={book.imageLinks.thumbnail}
                                    alt={book.title}
                                    className="float-start me-4 rounded"
                                />
                            )}
                            <h3 className="d-inline me-2">
                                {book.title}
                            </h3>
                            <p className="d-inline"><i> By {book.authors?.join(", ") || "Unknown Author"}</i></p>
                            {book.categories && book.categories.length > 0 && (
                                <p className="fw-light">
                                    Categories: {book.categories.join(', ')}
                                </p>
                            )}
                            <div
                                dangerouslySetInnerHTML={{__html: book.description}}
                                className="book-description mt-2 lead"
                            ></div>
                        </div>
                    </div>
                        {/* average rating */}
                    <div className="row bg-white rounded shadow-sm ms-1 mb-4 p-2">
                        <ul className="list-inline book-specific-ratings mt-2">
                            <li className="list-inline-item fw-bolder">
                                Average LoveLitReviews:
                            </li>
                            <li className="list-inline-item pe-1">
                                Overall: <StarReview value={averageRatings.overall_rating}/>
                            </li>
                            <li className="list-inline-item pe-1">
                                Story: <StarReview value={averageRatings.story_rating}/>
                            </li>
                            <li className="list-inline-item pe-1">
                                Style: <StarReview value={averageRatings.style_rating}/>
                            </li>
                            <li className="list-inline-item">
                                Steam: <StarReview value={averageRatings.steam_rating}/>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* book reviews */}
                <div className="row">
                    <div className="col-12 mb-4 p-3 bg-white rounded shadow-sm">
                        <h2 className="mt-4 text-center">{book.title} User Reviews</h2>
                    </div>
                </div>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="row mb-4 w-100">
                            <div className="col-12 col-lg-8 p-4 bg-white rounded shadow-sm">
                                <h3>
                                    {/*insert user link here after user setup
                                    <a href={`/userPage/${review.username}`}
                                    className="link-opacity-25-hover link-secondary text-decoration-none">
                                    {review.username}'s Review</a></h3>*/}
                                    <strong>{review.username || "Anonymous"} says:</strong>
                                </h3>
                                <p className='mt-2 lead' style={{textIndent: "3em"}}>{review.comment}</p>
                            </div>
                            <div className="col-12 col-lg-4 p-0">
                                <div
                                    className="mt-2 mt-lg-0 ms-lg-2 p-4 w-100 h-100 bg-white rounded shadow-sm">
                                    <div className="mb-1 d-inline d-lg-block lead">
                                        Overall: <StarReview
                                        value={review.overall_rating}/>
                                    </div>
                                    <div className="mb-1 d-inline d-lg-block lead">
                                        Story: <StarReview
                                        value={review.story_rating}/>
                                    </div>
                                    <div className="mb-1 d-inline d-lg-block lead">
                                        Style: <StarReview value={review.style_rating}/>
                                    </div>
                                    <div className='d-inline d-lg-block lead'>
                                        Steam: <StarReview value={review.steam_rating}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet for this book.</p>
                )}
            </div>
        </div>
    </div>
)
    ;
};
export default Book;
