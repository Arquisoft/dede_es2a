FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es2a
COPY . /app
WORKDIR /app

ARG MONGO_URI="mongodb://mongoserver:27017/api"
ENV MONGO_URI=$MONGO_URI

ARG CLOUDINARY_NAME="name"
ENV CLOUDINARY_NAME=$CLOUDINARY_NAME

ARG CLOUDINARY_API_KEY="apikey"
ENV CLOUDINARY_API_KEY=$CLOUDINARY_NAME

ARG CLOUDINARY_API_SECRET="secret"
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET


#Install the dependencies
RUN npm install

CMD [ "npm", "start" ]