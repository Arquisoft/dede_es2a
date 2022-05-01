FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es2a
COPY . /app
WORKDIR /app
#Install the dependencies

RUN docker build
RUN npm install
CMD [ "npm", "start" ]