FROM node:12

WORKDIR /CAPAAPI

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
