# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/order-service.jar order-service.jar

# Expose port 8084
EXPOSE 8084

# Run the jar file
ENTRYPOINT ["java", "-jar", "order-service.jar"]
