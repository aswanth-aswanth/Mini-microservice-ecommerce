FROM node:20.9.0-alpine

WORKDIR /app/gateway/api-gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]