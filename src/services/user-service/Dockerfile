FROM node:20.9.0-alpine

WORKDIR /app/services/user-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","start"]