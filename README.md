# RATHNA Products v1

Full-stack authentication system with user and admin dashboards.

## Tech Stack

### Backend
- Spring Boot 4.0.0
- Java 21
- MySQL Database
- JWT Authentication
- MapStruct
- Spring Security
- BCrypt Password Encryption

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router DOM

## Features

- User Registration & Login
- Admin Login (separate authentication)
- JWT Token-based Authentication
- User Dashboard
- Admin Dashboard
- Glassmorphism UI Design
- Production-ready configuration

## Setup

### Backend
```bash
cd backend
./gradlew bootRun
```

### Frontend
```bash
cd fronend
npm install
npm run dev
```

## Database Configuration

MySQL Database:
- Host: 203.57.85.97:3306
- Database: RATHNA
- Username: developer
- Password: dev@MSQL25

## Default Admin Credentials

- Username: RATHNA
- Password: MRPrasad@1

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- POST `/api/admin/login` - Admin login

## Project Structure

### Backend
- `config/` - Configuration files
- `controller/` - REST API controllers
- `model/` - Entity models
- `dto/` - Data Transfer Objects
- `mapper/` - MapStruct mappers
- `service/` - Business logic
- `repo/` - Data repositories

### Frontend
- `feature/auth/` - Authentication feature
  - `component/` - React components
  - `pages/` - Page components
  - `service/` - API services

## Security

- All passwords encrypted with BCrypt
- JWT tokens expire after 24 hours
- CORS configured for cross-origin requests
- Production-ready security configuration
