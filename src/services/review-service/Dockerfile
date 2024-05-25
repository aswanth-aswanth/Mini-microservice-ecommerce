FROM node:20.9.0-alpine

WORKDIR /app/services/review-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5006

CMD ["npm","start"]