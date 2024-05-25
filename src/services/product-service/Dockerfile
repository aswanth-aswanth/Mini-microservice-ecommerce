FROM node:20.9.0-alpine

WORKDIR /app/services/product-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm","start"]