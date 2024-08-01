FROM node:alpine

COPY . /Crypto/

WORKDIR /Crypto/dist

EXPOSE 3000

RUN npm install

CMD ["node", "/Crypto/dist/src/app.js"]
