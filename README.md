# RATHNA Products Extended v1

Full-stack authentication system with user and admin dashboards plus extended features.

## Tech Stack

### Backend
- Spring Boot 4.0.0
- Java 21
- MySQL Database
- JWT Authentication
- MapStruct
- Spring Security
- BCrypt Password Encryption
- Spring Validation

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Dark Mode Support
- Responsive Design

## Features

### Core Features (from main version)
- User Registration & Login
- Admin Login (separate authentication)
- JWT Token-based Authentication
- User Dashboard
- Admin Dashboard
- Glassmorphism UI Design
- Production-ready configuration

### Extended Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first responsive UI
- **Category Management**: Full CRUD operations for product categories
- **Product Management**: Complete product catalog management
- **Payment Processing**: Payment handling and tracking
- **Transaction Management**: Transaction history and management
- **Contact System**: Contact form and message handling
- **Profile Management**: User and admin profile updates
- **Address Management**: User address management
- **Enhanced Security**: Improved authentication and authorization
- **Better Error Handling**: Comprehensive error management
- **Loading States**: Enhanced user experience with loading indicators

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

### Extended Endpoints
- GET/POST/PUT/DELETE `/api/categories/**` - Category management
- GET/POST/PUT/DELETE `/api/products/**` - Product management
- POST/GET/DELETE `/api/payments/**` - Payment processing
- GET `/api/transactions/**` - Transaction management
- POST `/api/contact` - Contact form submission
- PUT `/api/profile/**` - Profile management
- PUT `/api/admin/profile/**` - Admin profile management

## Project Structure

### Backend
- `config/` - Configuration files (Security, JWT, CORS, etc.)
- `controller/` - REST API controllers
- `model/` - Entity models (User, Admin, Product, Category, etc.)
- `dto/` - Data Transfer Objects
- `mapper/` - MapStruct mappers
- `service/` - Business logic
- `repo/` - Data repositories

### Frontend
- `feature/` - Feature-based organization
  - `auth/` - Authentication (components, pages, services, hooks)
  - `category/` - Category management
  - `product/` - Product management
  - `payment/` - Payment processing
  - `contact/` - Contact system
  - `transaction/` - Transaction management

## Security

- All passwords encrypted with BCrypt
- JWT tokens expire after 24 hours
- CORS configured for cross-origin requests
- Production-ready security configuration
- Comprehensive input validation
- Protected routes and endpoints

## UI/UX Features

- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Glassmorphism**: Modern glass-like UI effects
- **Smooth Animations**: Enhanced user interactions
- **Loading States**: Better user feedback
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## Production Configuration

- API URLs configured for production (rathnaproducts.store)
- Environment-specific configurations
- Optimized build settings
- Security headers and CORS policies
- Database connection pooling
- Error logging and monitoring ready