# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/auth-service.jar auth-service.jar

# Expose port 8081
EXPOSE 8081

# Run the jar file
ENTRYPOINT ["java", "-jar", "auth-service.jar"]
