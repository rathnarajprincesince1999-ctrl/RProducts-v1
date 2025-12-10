# Project Structure Reference - Extended Version

## Backend Structure
- **config** - Configuration files (Security, JWT, CORS, Data Initializer, Exception Handler)
- **controller** - REST API controllers (Auth, Admin, Category, Product, Payment, Contact, Transaction, Profile)
- **model** - Entity/Domain models (User, Admin, Category, Product, Payment, Transaction, Contact, Address)
- **dto** - Data Transfer Objects (Request/Response DTOs for all entities)
- **mapper** - MapStruct mappers for entity-DTO conversion
- **service** - Business logic layer (Auth, Admin, Category, Product, Payment, Contact, Transaction, Profile)
- **repo** - Repository layer (Data access for all entities)

**Technology Stack:** Spring Boot with MapStruct + Spring Validation
**Note:** Follows layered architecture with comprehensive feature coverage.

## Frontend Structure
- **feature** - Feature-based organization
  - **auth** - Authentication feature
    - **component** - React components (Modals, DarkModeToggle, ProfileModal)
    - **hooks** - Custom React hooks (useAuth, useDarkMode)
    - **pages** - Page components (UserHome, AdminHome)
    - **service** - API service calls (authService, profileService)
  - **category** - Category management feature
    - **component** - Category components (AdminCategoriesModal)
    - **pages** - Category pages (CategoryPage, AdminCategoriesPage)
    - **service** - Category API services
  - **product** - Product management feature
    - **component** - Product components (AdminProductsModal)
    - **pages** - Product pages (AdminProductsPage)
    - **service** - Product API services
  - **payment** - Payment processing feature
    - **component** - Payment components (PaymentModal)
    - **service** - Payment API services
  - **contact** - Contact system feature
    - **service** - Contact API services
  - **transaction** - Transaction management feature
    - **service** - Transaction API services

**Technology Stack:** React with hooks + Tailwind CSS + Dark Mode + Responsive Design
**Note:** Feature-based architecture with comprehensive functionality coverage.

## Extended Features Architecture

### Backend Extensions
- **Validation Layer**: Spring Validation for input validation
- **Transaction Management**: @Transactional for data consistency
- **Enhanced Security**: Comprehensive JWT filtering and CORS configuration
- **Multi-entity Support**: Full CRUD operations for all business entities
- **Profile Management**: User and admin profile update capabilities

### Frontend Extensions
- **Dark Mode System**: Theme management with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Enhanced UX**: Loading states, error handling, and user feedback
- **Component Reusability**: Shared components across features
- **Hook-based State**: Custom hooks for authentication and theme management

## Guidelines
- Backend: Strictly follow the layered architecture with comprehensive validation
- Frontend: Feature-based structure with shared components and hooks
- Use MapStruct for all entity-DTO mappings
- Use Tailwind CSS for styling with dark mode support
- Implement responsive design for all components
- Maintain consistent error handling across all features
- Keep implementations focused and maintainable