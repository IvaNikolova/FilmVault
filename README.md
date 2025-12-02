# FilmVault
A modern movie discovery & wishlist platform built with React, Firebase, and the TMDB API.

## Overview
FilmVault is a web application that allows users to discover movies, view details, save favorites to a wishlist, and receive recommendations. 
The app integrates real-time data from the TMDB API and manages authentication and personalization using Firebase.

**Users can:**
- Register and log in
- Browse movies by category and genre
- View detailed movie information
- Add and remove movies from a personal wishlist
- Receive recommendations
- Explore related movies
- Search movie titles instantly

The goal of this project was to simulate a production-ready movie platform with modern UI/UX design and efficient data handling.

## Features
- User authentication (Firebase Auth)
- Add/remove movies from Wishlist
- Browse movies by categories and genre
- Search for movies
- Detailed movie pages with genre, rating & description
- Personalized recommendations
- Related movies section
- Pagination & clean grid layout
- Real-time wishlist updates using Firestore
- Responsive design

## Tech Stack
**Frontend:**
- React
- Tailwind CSS
- Lucide-react icons
- Lovable

**Backend / Services:**
- Firebase Authentication
- Firestore Database
- TMDB API

**Other Tools:**
- React Router
- GitHub
- Vite

## Project Architecture
- `pages/` → main views (Login, Register, Wishlist, Movie Details and etc.)
- `components/` → reusable UI components (Navbar, MovieCard, MovieGrid, Pagination and etc.)
- `context/` → authentication handling
- `api/` → TMDB API logic
- `firebase.js` → Firebase setup and Firestore functions

## Authentication Flow
FilmVault uses Firebase Authentication:
- Users can register & sign in with email and password
- Each user has a Firestore document
- Wishlist is stored per-user
- Username is saved and displayed in the UI
- Real-time updates when wishlist changes

## Run Locally 
**Install:**
  - `git clone https://github.com/IvaNikolova/FilmVault.git`
  - `cd FilmVault`
  - `npm install`

**Environment setup:**
  - Create `.env`
    - `VITE_TMDB_KEY=your_api_key_here`
      
**Start:**
  - `npm run dev`

## Run with Docker
Make sure you have installed:
- Docker Desktop
- Docker Compose (included in Docker Desktop)

**Clone the repository:**
- `git clone https://github.com/IvaNikolova/FilmVault.git`
- `cd FilmVault`

**Environment setup:**
  - Create `.env`
    - `VITE_TMDB_KEY=your_api_key_here`

**Build and start the app:**
- docker-compose up --build

**Open the app in your browser:**
- `http://localhost:5173`

**Stop the app:**
- `docker-compose down`
    
