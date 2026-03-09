# FilmVault – Movie Discovery & Wishlist Platform

<img width="1221" height="668" alt="Screenshot 2026-01-14 163153" src="https://github.com/user-attachments/assets/7aff7621-004a-4712-a851-aefe116f013b" />

## Project Overview
FilmVault is a **modern, interactive movie discovery platform** built with **React, Firebase, and the TMDB API**. Users can explore movies, view details, save favorites to a personal wishlist, and receive recommendations in real-time. The project simulates a **production-ready web application** with a focus on **UI/UX design, responsive frontend, and efficient data handling**.

---

## Key Features
- **User Authentication** via Firebase Auth (email/password)
- **Personalized Wishlist** stored per-user in Firestore
- **Browse movies** by category, genre, and popularity
- **Detailed movie pages** with rating, description, and genre
- **Search functionality** for instant movie lookups
- **Related movie recommendations**
- **Real-time updates** when wishlist changes
- **Responsive design** for desktop and mobile
- **Pagination & clean grid layout** for smooth browsing

---

## Technologies & Tools
**Frontend:**  
- React  
- Tailwind CSS  
- Lucide-react icons  
- Vite  

**Backend / Services:**  
- Firebase Authentication  
- Firestore Database  
- TMDB API  

**Other Tools:**  
- React Router  
- GitHub  
- Docker (optional)  

---

## Project Architecture
- `pages/` → main views (Login, Register, Wishlist, Movie Details)  
- `components/` → reusable UI elements (Navbar, MovieCard, MovieGrid, Pagination)  
- `context/` → authentication & global state management  
- `api/` → TMDB API integration logic  
- `firebase.js` → Firebase setup and Firestore functions  

---

## Authentication Flow
- Users register & sign in with email/password  
- Each user has a dedicated Firestore document  
- Wishlist is saved per user and updates **in real-time**  
- Username is displayed throughout the app for a personalized experience  

---

## Running the Project Locally 
### Install
- `git clone https://github.com/IvaNikolova/FilmVault.git`
- `cd FilmVault`
- `npm install`

### Environment setup
Create `.env`
- `VITE_TMDB_KEY=your_api_key_here`
      
### Start APP
`npm run dev`

 Open the app in your browser: `http://localhost:5173`

## Running with Docker
1. Make sure Docker Desktop is installed
2. Clone repo & set environment variables (as above)
3. Build and run the app:
  `docker-compose up --build`
4. Stop the app
  `docker-compose down`

---

## Screenshots
<img width="1264" height="653" alt="Screenshot 2026-01-14 163243" src="https://github.com/user-attachments/assets/49f824d2-1774-4cf5-bda8-16b013881df8" />
<img width="1270" height="667" alt="Screenshot 2026-01-14 163339" src="https://github.com/user-attachments/assets/6e37dcf7-8191-481c-a5eb-ae2ffc03dc05" />
<img width="1255" height="664" alt="Screenshot 2026-01-14 163522" src="https://github.com/user-attachments/assets/087a849b-356e-4e82-abaa-cd14d4054dfe" />
<img width="1256" height="662" alt="Screenshot 2026-01-14 163557" src="https://github.com/user-attachments/assets/faf3d294-a523-4371-a06f-b50bf04dc908" />

--- 

## Author
**Iva Nikolova**

Master’s in Computer Engineering with a focus on **Frontend Development and Data Science.**

FilmVault demonstrates my ability to **design and implement modern web apps**, integrating APIs, authentication, and real-time updates with React and Firebase.
