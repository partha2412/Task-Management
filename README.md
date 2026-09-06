# Task Management App

A full-stack task management application where users can securely authenticate and manage their personal tasks.

## Features

- User signup and login
- Secure JWT authentication using HttpOnly cookies
- User logout
- Persistent authentication
- Password reset
- Create tasks
- View all personal tasks
- View individual tasks
- Update tasks
- Delete tasks
- Protected routes
- User-specific task authorization
- Responsive frontend
- RESTful backend API

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- Morgan

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
TOKEN_EXP_TIME=7d

CLIENT_URL=http://localhost:5173

EMAIL_USER=User_Gamil
EMAIL_PASSWORD=App_Password
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Make sure MongoDB is running locally or use a MongoDB Atlas connection string.

## Environment Variables

### Backend

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `TOKEN_EXP_TIME` | JWT expiration time |
| `EMAIL_USER` | User Gmail |
| `EMAIL_PASSWORD` | App Password |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## Production

For production, update the environment variables with your deployed frontend and backend URLs.

Backend:

```env
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

Frontend:

```env
VITE_API_URL=https://your-backend-url/api
```

Never commit `.env` files or secrets to GitHub.

## License

This project is licensed under the MIT License.
