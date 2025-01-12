# LoveLitReviews: A Social Media Platform for Book Enthusiasts

![collage](https://github.com/SaraGolbek/LoveLitReviews/assets/145944090/0167f3c8-8dac-4085-81a9-7ef7e57d15f1)

## Overview
LoveLitReviews is a social media site designed for book lovers to share, rate, and review the books they read. Users can search for books using the Google Books API, write reviews, and view ratings. The platform features user portfolios, personalized book feeds, and book-specific pages, fostering a community of readers.

## Technologies Used
- Front-end: HTML, Sass, React JS, Bootstrap, Font Awesome
- Back-end: Ruby on Rails, Node.js
- API Integration: Google Books API for retrieving book information

## General Approach
1. Front-end Development: Created a general layout and designed the user interface with responsive styling using Sass and Bootstrap.
2. Back-end Implementation: Developed models and controllers to handle user authentication, book reviews, and data management.
3. Page-by-Page Development:
    - Sign-in/Sign-up Pages: Implemented authentication functionality with reusable widgets for future scalability.
    - Book Reviews Feed: Designed dynamic widgets for features like star ratings and mapped API data to create an interactive feed.
    - Book-Specific Page: Addressed challenges with displaying multiple versions of the same book by utilizing Google Books API’s ID-based search.
    - User and Profile Pages: Enabled portfolio creation and seamless data retrieval for personalized user experiences.
4. Testing and Debugging: Verified API fetch requests and used console logs to ensure data integrity before rendering information for users.

## User Stories
- Navigation Improvement: Updated navigation bar placement to enhance accessibility and user experience.
- Search Enhancements: Added dropdown lists for book titles and images in the search bar, allowing users to select books based on visual cues.
- Styling Adjustments: Refined font sizes, weights, and star-rating colors based on user suggestions for improved readability and aesthetics.

## Video Demo
https://www.loom.com/share/fca13ef154a24b8e90e252f6c3ec09f7?sid=c64f8fd3-4d88-41f4-b288-d226df09c765

## Wire Frames
![LoveLitReviewsWireFrames](https://github.com/SaraGolbek/LoveLitReviews/assets/145944090/f7f351dd-f1e5-42e9-b90d-2dcd7fc42ca4)

## Unsolved Problems And Hurdles
1. HTML Elements in Book Descriptions: Some book descriptions returned by the Google Books API contain HTML elements. A solution to clean these strings is under exploration.
2. Navigation Search Bar: Future enhancements may include a search bar for book titles (from Google API or custom API) and user profiles to improve user experience.
3. Star Rating Styling: Initial challenges with reversing star rating direction were resolved by creating reusable widgets and refining the code for cleaner implementation.
4. Book-Specific Page Challenges:
    - Handling multiple versions of the same book by leveraging unique book IDs in API fetch requests.
    - Aggregating reviews across book versions by adding a "book title" column in the reviews table for better consistency.


