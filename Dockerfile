# Dockerfile

# Node 20.15.0
FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npx", "ts-node-dev", "src/index.ts"]