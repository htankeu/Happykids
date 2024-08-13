FROM node:18 AS builder

WORKDIR /usr/src/app

COPY .env ./
COPY package-lock.json package.json ./

#Copy the rest of the application
COPY . .

RUN npm install

# Build the application
RUN npm run build

# Use thr official Nginx image as the base image for serving the app
FROM nginx:alpine

#Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to the ngnix HTML directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# COPY ngnix.conf /etc/nginx/nginx.conf


#Expose port 9002
EXPOSE 80

#start Nginx Server
CMD ["nginx","-g","daemon off;"]