FROM node:20.9.0-alpine

WORKDIR /app/services/order-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003 

CMD ["npm", "start"]
