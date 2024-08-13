FROM node:18

WORKDIR /app

COPY .env ./
COPY .hintrc ./
COPY package-lock.json package.json ./


COPY server/ .
COPY .env .
COPY tsconfig.json .
COPY .hintrc .

RUN npm install
RUN npm run deploy


EXPOSE 9001
CMD ["npm","start"]