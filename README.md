# Rahla.AI - Morocco Travel Platform

A premium AI-powered Morocco travel planning platform with intelligent trip recommendations, booking system, and chat support.

## Project Structure

```
rahla-ai/
├── index.html           # Static landing page
├── server/              # Node.js/Express backend
│   ├── index.js
│   ├── app.js
│   ├── .env
│   ├── routes/
│   ├── controllers/
│   └── services/
├── package.json
└── README.md
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Edit server/.env with your configuration
```

### 3. Start Server
```bash
npm run dev    # Development with hot-reload
npm start      # Production
```

Server runs on: `http://localhost:5000`
Frontend: `http://localhost:5000` (serves index.html)

## API Endpoints

### Chat
- `POST /api/chat/message` - Send AI chat message
- `GET /api/chat/history/:userId` - Get chat history

### Planner
- `POST /api/planner/create` - Create trip plan
- `GET /api/planner/:planId` - Get trip plan
- `POST /api/planner/recommend` - Get recommendations

### Tours
- `GET /api/tours` - Get all tours
- `POST /api/tours/search` - Search tours

### Cities
- `GET /api/cities` - Get all cities
- `GET /api/cities/:cityId` - Get city details

### Appointments
- `POST /api/appointments/book` - Book tour
- `GET /api/appointments/:appointmentId` - Get booking

## Technologies
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (ready for integration)
- **AI**: OpenAI API (ready for integration)

## Features
✅ AI-Powered Trip Planner
✅ Cities & Tours Database
✅ Booking System
✅ Chat Support
✅ Budget Calculator
✅ Responsive Design