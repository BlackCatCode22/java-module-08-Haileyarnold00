# User Management API

A RESTful API built with Spring Boot for managing user information, featuring secure authentication, external API integration, and a responsive frontend interface.

## API Endpoints

### User Management
- `GET /api/users` - Get all users (with pagination)
  - Query parameters: 
    - `page` (default: 0)
    - `size` (default: 10)
    - `sort` (e.g., name,asc)

- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/{id}/weather` - Get weather for user's city

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## External APIs Used
- Weather API (weatherapi.com) for fetching weather data based on user's city

## How to Run the Application

1. Prerequisites:
   - Java JDK 17
   - Maven
   - Weather API key from weatherapi.com

2. Configuration:
   - Update `src/main/resources/application.properties`:
     ```properties
     weather.api.key=your-api-key
     ```

3. Build and Run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. Access the application:
   - Frontend: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html
   - H2 Console: http://localhost:8080/h2-console

## Features
- CRUD operations for user management
- Secure authentication using JWT
- Input validation and error handling
- Pagination and sorting support
- External API integration (weather data)
- Responsive frontend interface
- Comprehensive test coverage

## Testing
Run tests using:
```bash
mvn test
```

## Technologies Used
- Spring Boot 3.1.0
- Spring Security with JWT
- Spring Data JPA
- H2 Database
- HTML/CSS/JavaScript frontend
- JUnit 5 for testing
