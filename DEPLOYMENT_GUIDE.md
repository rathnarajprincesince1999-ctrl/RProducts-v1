# Deployment Guide

## Prerequisites
- Java 21 installed
- Node.js 18+ installed
- MySQL database accessible
- Git installed

## Backend Deployment

### 1. Configure Database
Update `backend/src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://YOUR_HOST:3306/YOUR_DATABASE
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

### 2. Build Backend
```bash
cd backend
./gradlew clean build
```

### 3. Run Backend
```bash
./gradlew bootRun
```
Or run the JAR:
```bash
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

## Frontend Deployment

### 1. Configure Environment
Create `.env` file in `fronend/` directory:
```
VITE_API_URL=http://your-backend-url:8080
```

### 2. Install Dependencies
```bash
cd fronend
npm install
```

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy
Upload the `dist/` folder to your hosting service (Netlify, Vercel, etc.)

## Production Checklist
- [ ] Update database credentials
- [ ] Update API URL in frontend .env
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set strong JWT secret
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Configure error logging
- [ ] Test all features in production

## Environment Variables

### Backend (application.yaml)
- `spring.datasource.url` - Database connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - JWT signing secret (256-bit)
- `jwt.expiration` - Token expiration time (milliseconds)

### Frontend (.env)
- `VITE_API_URL` - Backend API base URL

## Security Notes
- Never commit `.env` files to version control
- Use strong passwords for database
- Rotate JWT secret regularly
- Enable SSL/TLS in production
- Implement rate limiting
- Set up firewall rules
