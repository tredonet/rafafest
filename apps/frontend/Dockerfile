FROM node:16-alpine
WORKDIR /frontend
ADD . .
RUN npm install
RUN npm run build



FROM nginx:stable-alpine
COPY --from=0 /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
