-- migrations.sql

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    book_id VARCHAR(255) NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    title VARCHAR(255),
    author VARCHAR(255),
    thumbnail VARCHAR(255),
    overall_rating INT CHECK (overall_rating >= 0 AND overall_rating <= 5),
    story_rating INT CHECK (story_rating >= 0 AND story_rating <= 5),
    style_rating INT CHECK (style_rating >= 0 AND style_rating <= 5),
    steam_rating INT CHECK (steam_rating >= 0 AND steam_rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Create books table
CREATE TABLE books (
   id VARCHAR(255) PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   author VARCHAR(255),
   thumbnail TEXT,
   description TEXT,
   categories TEXT
);

