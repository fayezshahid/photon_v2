# Photo Management System
Photon, a robust photo management platform built with Spring Boot 3 and Angular. Features dynamic client-side interactions for favoriting, archiving, and sharing photos with real-time updates through RESTful APIs.

## 🛠️ Technologies Used
- **Spring Boot 3** - Backend framework
- **Spring Security 6** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Database management
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Angular 18** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming

## 🚀 Getting Started

### Prerequisites
1. **Install Java 17 or higher**
   - Download from [https://adoptium.net/](https://adoptium.net/)
   - Verify installation: `java -version`

2. **Install Node.js and npm**
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Verify installation: `node -v` and `npm -v`

3. **Install Angular CLI**
   ```bash
   npm install -g @angular/cli
   ```

4. **Install PostgreSQL**
   - Download from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Or use pgAdmin for database management

### Installation

#### Backend Setup (Spring Boot)
1. **Clone the repository**
   ```bash
   git clone https://github.com/fayezshahid/photon_v2.git
   cd photon_v2
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Database Setup**
   - Create a new PostgreSQL database for your project
   - Update `src/main/resources/application.properties`:
   
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.datasource.driver-class-name=org.postgresql.Driver
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   
   # JWT Configuration
   photon.app.jwtSecret=photonSecretKey
   photon.app.jwtExpirationMs=86400000
   
   # Server Configuration
   server.port=8080
   ```

4. **Install Dependencies and Run**
   ```bash
   # Using Maven
   ./mvnw clean install
   ./mvnw spring-boot:run
   
   # Or using Gradle
   ./gradlew build
   ./gradlew bootRun
   ```

#### Frontend Setup (Angular)
1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Update `src/environments/environment.ts`:
   
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api',
     uploadUrl: 'http://localhost:8080/images'
   };
   ```

4. **Start Development Server**
   ```bash
   ng serve
   ```

5. **Access the application**
   - Backend API: `http://localhost:8080`
   - Frontend Application: `http://localhost:4200`

## 🎯 Features
- **JWT Authentication**: Secure token-based authentication
- **RESTful APIs**: Clean REST endpoints for all operations
- **Real-time Photo Management**: Upload, organize, and manage photos
- **Dynamic Interactions**: Favorite, archive, and share without page reloads
- **Type Safety**: TypeScript for robust frontend development
- **Security**: Spring Security 6 with JWT protection

## 📁 Project Structure
```
photon_v2/
│
├── backend/            # Spring Boot application
│   ├── src/main/java/
│   │   └── com/photon/
│   │       ├── controllers/    # REST controllers
│   │       ├── services/       # Business logic
│   │       ├── repositories/    # Data access layer
│   │       ├── entities/         # Entity classes
│   │       ├── dtos/          # Data transfer objects
│   │       └── config/       # Configuration classes
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── static/           # Static files
│   └── pom.xml              # Maven dependencies
│
├── frontend/          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   ├── services/     # HTTP services
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── guards/       # Route guards
│   │   │   ├── utils/        # Utility functions
│   │   │   └── interceptors/ # HTTP interceptors
│   │   ├── assets/          # Static assets
│   │   └── environments/    # Environment configs
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## 🔐 Security Features
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **CORS Configuration**: Cross-origin resource sharing setup
- **Input Validation**: Request validation using Spring Boot Validation
- **SQL Injection Prevention**: JPA/Hibernate protection