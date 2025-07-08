# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/product-service.jar product-service.jar

# Expose port 8082
EXPOSE 8082

# Run the jar file
ENTRYPOINT ["java", "-jar", "product-service.jar"]
