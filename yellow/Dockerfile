FROM node:17.0-alpine3.14

RUN mkdir -p app

RUN mkdir -p ./views

WORKDIR /app

COPY package*.json .

RUN apk add npm=7.17.0-r0 && npm install

COPY app.js .

COPY index.pug ./views/

COPY favicon.ico ./views/

EXPOSE 80

ENTRYPOINT ["node", "app.js"]
