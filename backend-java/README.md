# ContentPulse Backend

Spring Boot 3 backend for ContentPulse application.

## Technology Stack

- **Java 21**
- **Spring Boot 3.2.0**
- **Maven**
- **Spring Web** - RESTful APIs
- **Spring Validation** - Input validation
- **Lombok** - Code generation
- **Spring Boot DevTools** - Development enhancements

## Project Structure

```
backend-java/
├── src/
│   ├── main/
│   │   ├── java/com/contentpulse/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # Domain models
│   │   │   ├── service/         # Business logic services
│   │   │   └── ContentPulseApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── .gitignore
```

## Building the Project

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

## Configuration

### Application Properties

The application runs on port `8080` and is configured in `src/main/resources/application.properties`.

### CORS Configuration

CORS is enabled for `http://localhost:5173` to allow requests from the frontend application.

## API Endpoints

### Report Upload

**POST** `/api/reports/upload`

Accepts a file upload (multipart/form-data).

**Request Parameters:**
- `file` (MultipartFile) - The file to upload

**Response:**
```json
{
  "success": true,
  "message": "File received successfully"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:8080/api/reports/upload \
  -F "file=@/path/to/file.csv"
```

## Development

### Prerequisites

- Java 21 or later
- Maven 3.8.0 or later

### IDE Setup

Import the project as a Maven project in your IDE (IntelliJ IDEA, VS Code, Eclipse, etc.).

### Package Descriptions

- **config/** - Spring configuration classes (CORS, etc.)
- **controller/** - REST API controllers
- **dto/** - Data Transfer Objects for API responses
- **model/** - Domain models (future database entities)
- **service/** - Business logic services (future implementation)

## Notes

- No database is currently implemented
- No AI processing is implemented
- File uploads are received but not processed
- This is a foundation for future expansion

## License

All rights reserved.
