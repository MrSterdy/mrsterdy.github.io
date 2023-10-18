FROM nginx:1.25.2-alpine3.18

WORKDIR /app

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
