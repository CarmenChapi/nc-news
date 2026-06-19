# NC News

NC News is a React news application where users can browse articles, filter by topic, sort results, vote on articles and comments, and post or delete comments.

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).

## Deployed Version

https://ncnewscarmenchapi.netlify.app

## Backend API

- API repo: https://github.com/CarmenChapi/NewsCarmen.git
- Hosted API: https://newscarmen.onrender.com/api/

This frontend uses a custom Northcoders News API built for the backend part of the project. The API provides the article, topic, user, vote, and comment data used by the React application.

The backend was built to mimic a real-world news service, allowing the frontend to request data programmatically and update resources such as article votes and comments.

Main API endpoints used by this app:

- `GET /api/topics` - returns all available article topics
- `GET /api/articles` - returns a list of articles
- `GET /api/articles?topic=:topic` - filters articles by topic
- `GET /api/articles?sort_by=:sort_by&order=:order` - sorts articles by date, votes, or comment count
- `GET /api/articles/:article_id` - returns a single article
- `PATCH /api/articles/:article_id` - updates article votes
- `GET /api/articles/:article_id/comments` - returns comments for an article
- `POST /api/articles/:article_id/comments` - posts a new comment
- `DELETE /api/comments/:comment_id` - deletes a comment
- `PATCH /api/comments/:comment_id` - updates comment votes
- `GET /api/users` - returns all users

The backend project was built with Node.js, Express, and PostgreSQL. It also uses Jest and Supertest for testing, plus Husky, and Dotenv. Hosted in Render

Backend version requirements:

- Node.js `v22.4.0`
- PostgreSQL `v16.4`

## Features

- View a list of articles
- Filter articles by topic
- View articles posted by the logged-in user
- Sort articles by date, number of comments, and votes
- Open an article to view its full content and related comments
- Vote on articles
- Post comments on articles
- Delete comments
- Vote on comments
- Select a user from the users list
- View the current username
- Log out and choose another user
- Return to the home page by clicking the NC News logo
- Use pagination

## Tech Stack

- React
- Javascrip
- Vite
- Axios
- CSS
- Netlify

## Node Version Required

This project was built using Node.js `v22.4.0`.

Please use this version or newer.

## How To Run The Project Locally

Clone the repository:

```bash
git clone https://github.com/CarmenChapi/nc-news.git
```

Move into the project folder:

```bash
cd nc-news
```

Open the project in VS Code:

```bash
code .
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.


## Environment Variables

No environment variables are required to run this frontend project locally.
