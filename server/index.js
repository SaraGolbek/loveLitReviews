import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data for Reviews
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
