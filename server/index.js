import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 5000;

const SECRET_KEY = process.env.VITE_SECRET_KEY;

// Middleware
app.use(cors());
app.use(express.json());

let reviews = [];
let users = [];

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

// Signup User
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Authenticate
app.get('/api/authenticated', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        res.json({ authenticated: true, username: user.username });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
