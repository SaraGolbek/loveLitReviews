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
console.log('Loaded SECRET_KEY:', SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

let reviews = [];
let users = [];

// Route to fetch reviews
app.get('/api/reviews', (req, res) => {
    res.json({ reviews });
});

// Route for specific user review
app.get('/api/reviews/user/:username', (req, res) => {
    const { username } = req.params;

    // Filter reviews by the username
    const userReviews = reviews.filter((review) => review.username === username);

    if (userReviews.length === 0) {
        return res.status(404).json({ error: 'No reviews found for this user.' });
    }

    res.json({ reviews: userReviews });
});


// Route to add a review
app.post('/api/reviews', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { book_id, title, author, thumbnail, overall, story, style, steam, comment } = req.body;

        const review = {
            username: user.username,
            book_id,
            title,
            author,
            thumbnail,
            overall,
            story,
            style,
            steam,
            comment,
        };

        reviews.push(review);
        res.status(201).json({ message: 'Review added successfully!', review });
    });
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
    console.log('Sign-up request received with body:', req.body);
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
    console.log('User added successfully:', { username });
});

//Sign in
app.post('/api/login', async (req, res) => {
    console.log('Login request received with body:', req.body);
    const { username, password } = req.body;


    // Find the user by username
    const user = users.find((u) => u.username === username);
    if (!user) {
        console.log('Invalid username:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate the password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.log('Invalid password for username:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful for username:', username);
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
