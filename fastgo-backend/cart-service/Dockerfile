# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file
COPY target/cart-service.jar cart-service.jar

# Expose port 8083
EXPOSE 8083

# Run the jar file
ENTRYPOINT ["java", "-jar", "cart-service.jar"]
