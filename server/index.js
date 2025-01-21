import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

let reviews = [];

// Route to fetch reviews
app.get('/api/reviews', (req, res) => {
    res.json({ reviews });
});

// Route to add a review
app.post('/api/reviews', (req, res) => {
    const review = req.body;
    reviews.push(review);
    res.status(201).json({ message: 'Review added successfully!', review });
});

// Route to fetch a specific book and its reviews
app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;

    // Filter reviews for the specific book
    const bookReviews = reviews.filter((review) => review.book_id === bookId);

    if (bookReviews.length === 0) {
        return res.status(404).json({ error: 'No reviews found for this book.' });
    }

    // Extract book information from the first review
    const { title, author, thumbnail } = bookReviews[0];
    const book = { id: bookId, title, author, thumbnail };

    res.json({ book, reviews: bookReviews });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
