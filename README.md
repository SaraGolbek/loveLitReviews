# LoveLitReviews: A Social Media Platform for Book Enthusiasts

![collage](https://github.com/SaraGolbek/LoveLitReviews/assets/145944090/0167f3c8-8dac-4085-81a9-7ef7e57d15f1)

##Overview
LoveLitReviews is a social media site designed for book lovers to share, rate, and review the books they read. Users can search for books using the Google Books API, write reviews, and view ratings. The platform features user portfolios, personalized book feeds, and book-specific pages, fostering a community of readers.

## Technologies Used
Front-end: HTML, Sass, React JSX, Bootstrap, Font Awesome
Back-end: Ruby on Rails, Node.js
API Integration: Google Books API for retrieving book information

## General Approach
1. Front-end Development: Created a general layout and designed the user interface with responsive styling using Sass and Bootstrap.
2. Back-end Implementation: Developed models and controllers to handle user authentication, book reviews, and data management.
3. Page-by-Page Development:
    - Sign-in/Sign-up Pages: Implemented authentication functionality with reusable widgets for future scalability.
    - Book Reviews Feed: Designed dynamic widgets for features like star ratings and mapped API data to create an interactive feed.
    - Book-Specific Page: Addressed challenges with displaying multiple versions of the same book by utilizing Google Books API’s ID-based search.
    - User and Profile Pages: Enabled portfolio creation and seamless data retrieval for personalized user experiences.
4. Testing and Debugging: Verified API fetch requests and used console logs to ensure data integrity before rendering information for users.

## Instalation Instructions
No installation is required. The website is fully functional upon access.

## User Stories

One User Said:
> You should have the navigation bar on the top instead of the side to make the website look cleaner and to make it easier to access throughout the app. This user also said to be sure to include the author, book title, and the book id into my own api so that I do not have to fetch from both apis for each book review. She also suggested to have a dropdown list of book titles and pictures attached to the search bar so that users can select which book they read based on that information.

Another User Said:
>The website looks really good so far. Then they listed a few styling changes such as font size, weight and style. They also suggested different spacing for each item as well and some color suggestions for the star ratings. They also helped me with how they though I could fix my issue that I had with the book specific page and what version of the book I should display. 

## Video Demo
https://www.loom.com/share/fca13ef154a24b8e90e252f6c3ec09f7?sid=c64f8fd3-4d88-41f4-b288-d226df09c765

## Wire Frames
![LoveLitReviewsWireFrames](https://github.com/SaraGolbek/LoveLitReviews/assets/145944090/f7f351dd-f1e5-42e9-b90d-2dcd7fc42ca4)

## Unsolved Problems And Hurdles
1. One of the biggest hurdles I had was with the book specific page. My first issue was trying to figure out how to retrieve the reviews for one book. My issue here was that there were more than one version of the book so if a user reviewed one version and I stored that book id, and then did a fetch for the book reviews of that book based on the id, only the reviews for that version of the book would show up. So then I thought about how I could do the fetch based off the book title, which I had to add a column to my reviews table for book title and then search for the reviews that had a matchin book title. But then I got another issue that came up. For some reason I just could not figure out what was going on with my api. I was having an issue where the fetch request for the book specific reviews was working, it was console loging a reivew for the book, but it would not map onto the page. So I added a few more reivews for that book to see if it was grabbing all of the reviews for that book and it turns out it was not. So I did some console logging and found that it was just returning one review for the book and returning it as an object. So I had to ensure that it was returning all of the reviews in an array. Once I fixed that, I then had a problem with fetching information for that book for the information section of the page from the google api. If you search for a book by its title, several books come back and it may not be the correct book. So I went back to the google apis and looked at my option. I saw that I could do a search using the books's id. Looking into it, the book versions had the same author, same description and some varied off of category and picture. So I took some time thinking about how I wanted to go about this and talked to my users. They suggested that it would be cool if the book that you clicked on had the same picture as the book specific page. Some of the book versions had slightly different colors. So I took their suggestion and decided to pass the book id through the url and so that I can retrive it that way and fetch the information for that specific version from google api.

2. One Unsolved problem I still have with the book specific page is that in some of the book descriptions there are html elements and I am unsure of how to get rid of them in the string that is returned. I am sure there is a function I could make or a method that exists that I could do.

3. Another problem that I still have is putting a search bar in the navigation. I am not sure exaclty what I would want my users to be able to search for, a book title that is on my api or from google api, or if I want them to search for a user. I just think that there could be more added there for a better user experience.

4. A small hurdle that I had was making the star rating. The values kept going backwards and the stars changing color were from right to left and not left to right. I had to play around with the styling and reversing some of the content until it looked right. Then once I had that down, I was able to clean up the code with a widget and mapping out the stars instead of hard coding them in. 


