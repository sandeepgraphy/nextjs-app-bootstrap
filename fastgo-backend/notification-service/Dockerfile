# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/notification-service.jar notification-service.jar

# Expose port 8085
EXPOSE 8085

# Run the jar file
ENTRYPOINT ["java", "-jar", "notification-service.jar"]
