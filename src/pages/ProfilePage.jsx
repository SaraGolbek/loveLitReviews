// profile.jsx
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import StarReview from "../components/StarHelper.jsx";

const ProfilePage = () => {
    const { username } = useParams(); // Get the username from the URL
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserReviews = async () => {
            const userToFetch = username || localStorage.getItem('username'); // Fallback to signed-in user
            try {
                const response = await fetch(`http://localhost:5000/api/reviews/user/${userToFetch}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user reviews');
                }
                const data = await response.json();
                setReviews(data.reviews || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserReviews();
    }, [username]);




    return (
        <div className="row text-secondary">
            <div className="col-12">
                <div className="row">
                    <div className="user-img img-header w-100"></div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
                        <div className="row">
                            <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                                <h2 className="text-center">
                                    {username || localStorage.getItem('username')}
                                    &#39;s Bookshelf
                                </h2>
                            </div>
                        </div>
                        {reviews.length > 0 ? (
                            [...reviews].reverse().map((review) => (
                                <div className="row mb-4 w-100" key={review.id}>
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
                                                Overall: <StarReview value={review.overall}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Story: <StarReview value={review.story}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Style: <StarReview value={review.style}/>
                                            </li>
                                            <li className="list-inline-item">
                                                Steam: <StarReview value={review.steam}/>
                                            </li>
                                        </ul>
                                        <p className="review" style={{ textIndent: '3em' }}>
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="row mb-4 w-100">
                                <div className="col-12 p-4 bg-white rounded shadow-sm text-center">
                                    <h4>This user has no reviews yet!</h4>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;