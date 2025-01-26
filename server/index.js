import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://lovelitreviews.onrender.com',
    credentials: true,
}));

app.use(express.json());



// Helper Functions
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.VITE_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// Routes
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query(
            `INSERT INTO users (username, password) VALUES ($1, $2)`,
            [username, hashedPassword]
        );
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Username already exists' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (!user.rows.length || !await bcrypt.compare(password, user.rows[0].password)) {
        console.error('Invalid login attempt for:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.rows[0].username }, process.env.VITE_SECRET_KEY, { expiresIn: '1h' });

    // Log for debugging
    console.log('Generated token:', token);
    console.log('User found:', user.rows[0]);

    // Set cookies
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('username', user.rows[0].username, { secure: true, sameSite: 'strict' });

    // Log cookies set in response
    console.log('Cookies set in response:');
    console.log(res.getHeaders()['set-cookie']);

    res.json({ message: 'Login successful' });
});



app.get('/api/authenticated', (req, res) => {
    console.log('Cookies received:', req.cookies);

    const token = req.cookies?.token;
    if (!token) {
        console.log('No token found in cookies.');
        return res.status(401).json({ authenticated: false, username: null });
    }

    jwt.verify(token, process.env.VITE_SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.status(403).json({ authenticated: false, username: null });
        }
        console.log('Token verified for user:', user.username);
        res.json({ authenticated: true, username: user.username });
    });
});


app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('username');
    res.json({ message: 'Logged out successfully' });
});

app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const bookResult = await pool.query(`SELECT * FROM books WHERE id = $1`, [id]);
        const reviewsResult = await pool.query(`SELECT * FROM reviews WHERE book_id = $1`, [id]);

        if (!bookResult.rows.length) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ book: bookResult.rows[0], reviews: reviewsResult.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/reviews', authenticateToken, async (req, res) => {
    const {
        book_id,
        title,
        author,
        thumbnail,
        description,
        categories,
        overall_rating,
        story_rating,
        style_rating,
        steam_rating,
        comment,
    } = req.body;

    try {
        // Upsert book information
        await pool.query(
            `INSERT INTO books (id, title, author, thumbnail, description, categories)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id) DO NOTHING`,
            [book_id, title, author, thumbnail, description, categories]
        );

        // Insert review
        await pool.query(
            `INSERT INTO reviews (book_id, username, title, author, thumbnail, overall_rating, story_rating, style_rating, steam_rating, comment)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [book_id, req.user.username, title, author, thumbnail, overall_rating, story_rating, style_rating, steam_rating, comment]
        );

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews');
        res.json({ reviews: result.rows });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});


app.get('/api/profile/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query(`SELECT * FROM reviews WHERE username = $1`, [username]);
        res.json({ reviews: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
