# --- Build stage ---
FROM node:20-alpine AS build

# Set working directory
WORKDIR /joodidar

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (include devDependencies, needed for vite build)
RUN npm install

# Copy the rest of the code
COPY . .

# Run the build
RUN npm run build


# --- Serve stage ---
FROM nginx:alpine

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
